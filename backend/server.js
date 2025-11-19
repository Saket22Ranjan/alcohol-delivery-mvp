import 'dotenv/config';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';
import express from "express";
import cors from "cors";
import { JSONFilePreset } from "lowdb/node";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ lowdb v7 syntax — this creates db.json automatically
const file = path.join(__dirname, "db.json");
const defaultData = {
  stores: [
    { id: "store1", name: "City Liquor - Downtown", address: "123 Main St" },
    { id: "store2", name: "Brew House", address: "45 River Rd" }
  ],
  products: [
    { id: "p1", storeId: "store1", name: "Lager Beer 500ml", price: 120, unit: "bottle" },
    { id: "p2", storeId: "store1", name: "Red Wine 750ml", price: 750, unit: "bottle" },
    { id: "p3", storeId: "store2", name: "IPA 330ml", price: 140, unit: "bottle" }
  ],
  orders: []
};

const db = await JSONFilePreset(file, defaultData);

// ✅ Routes
app.get("/api/stores", (req, res) => res.json(db.data.stores));

app.get("/api/products", (req, res) => {
  const { storeId } = req.query;
  let products = db.data.products;
  if (storeId) products = products.filter((p) => p.storeId === storeId);
  res.json(products);
});

app.post("/api/orders", async (req, res) => {
  const { items, customer } = req.body;
  if (!items?.length) return res.status(400).json({ error: "No items" });

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const order = {
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    items,
    customer: customer || { name: "Guest" },
    total,
    status: "pending"
  };

  db.data.orders.push(order);
  await db.write(); // persist

  res.json({ orderId: order.id, total });
});
// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));


// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // keep original extension, but generate unique filename
    const ext = path.extname(file.originalname);
    cb(null, `${nanoid(10)}${ext}`);
  }
});

const upload = multer({ storage });

// Ensure verifications array exists in db
await db.read();
db.data.verifications = db.data.verifications || [];
await db.write();

// POST /api/verify-id  (file upload)
app.post('/api/verify-id', upload.single('idImage'), async (req, res) => {
  try {
    await db.read();
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { name = 'Guest', dob = '' } = req.body || {};
    const record = {
      id: nanoid(10),
      createdAt: new Date().toISOString(),
      name,
      dob,
      filename: req.file.filename,
      originalname: req.file.originalname,
      status: 'pending' // pending by default, admin will approve/reject
    };

    db.data.verifications.push(record);
    await db.write();
    return res.json({ verificationId: record.id, status: record.status });
  } catch (err) {
    console.error('verify-id error', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// GET /api/verify-status?vid=...
app.get('/api/verify-status', async (req, res) => {
  const { vid } = req.query;
  if (!vid) return res.status(400).json({ error: 'Missing vid' });
  await db.read();
  const rec = db.data.verifications.find(v => v.id === vid);
  if (!rec) return res.status(404).json({ error: 'Not found' });
  return res.json({ verificationId: rec.id, status: rec.status });
});

// Admin: list all verifications (for demo admin UI)
app.get('/api/verifications', async (req, res) => {
  await db.read();
  res.json(db.data.verifications || []);
});

// Admin: change verification status (for demo only)
// Example usage (curl or admin UI):
// POST /api/verifications/<vid>/status  with JSON { "status": "approved" }
app.post('/api/verifications/:vid/status', async (req, res) => {
  const { vid } = req.params;
  const { status } = req.body;
  if (!['pending','approved','rejected'].includes(status)) return res.status(400).json({ error: 'Bad status' });
  await db.read();
  const rec = db.data.verifications.find(v => v.id === vid);
  if (!rec) return res.status(404).json({ error: 'Not found' });
  rec.status = status;
  await db.write();
  res.json({ verificationId: rec.id, status: rec.status });
});
// ---------------------- EMAIL OTP (simple demo) ----------------------

// configure nodemailer transport (use real SMTP in production)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',         // example: Gmail SMTP (for tests you may need app password)
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'youremail@gmail.com',
    pass: process.env.SMTP_PASS || 'your-email-password-or-app-password'
  }
});

// helper to generate 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ensure emailOtps array
await db.read();
db.data.emailOtps = db.data.emailOtps || [];
await db.write();

// POST /api/send-email-otp  { email: "user@example.com" }
app.post('/api/send-email-otp', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Missing email' });

  // rate-limit simple check (example): allow only one OTP per minute for same email
  await db.read();
  const now = Date.now();
  const last = db.data.emailOtps.find(o => o.email === email && o.expiresAt > now - 60*1000);
  if (last) return res.status(429).json({ error: 'Too many requests. Try again later.' });

  const code = generateOtp();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  const otpRecord = { id: nanoid(10), email, code, expiresAt, createdAt: new Date().toISOString() };
  db.data.emailOtps.push(otpRecord);
  await db.write();

  // send email (simple body)
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"LiquorExpress" <youremail@gmail.com>',
      to: email,
      subject: 'Your LiquorExpress login OTP',
      text: `Your verification code is: ${code}. It is valid for 10 minutes.`,
      html: `<p>Your verification code is: <strong>${code}</strong></p><p>Valid for 10 minutes.</p>`
    });
    return res.json({ ok: true, message: 'OTP sent' });
  } catch (err) {
    console.error('send-email-otp error', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// POST /api/verify-email-otp { email: "x", code: "123456" }
app.post('/api/verify-email-otp', async (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ error: 'Missing fields' });

  await db.read();
  const now = Date.now();
  const index = db.data.emailOtps.findIndex(o => o.email === email && o.code === code && o.expiresAt > now);
  if (index === -1) return res.status(400).json({ error: 'Invalid or expired OTP' });

  // success: remove OTP (one-time use)
  const otp = db.data.emailOtps.splice(index, 1)[0];
  // Optionally create or mark user as verified in db.data.users (demo)
  db.data.users = db.data.users || [];
  let user = db.data.users.find(u => u.email === email);
  if (!user) {
    user = { id: nanoid(8), email, createdAt: new Date().toISOString(), verified: true };
    db.data.users.push(user);
  } else {
    user.verified = true;
  }
  await db.write();

  // return a minimal "session" object — for demo, send back user id
  return res.json({ ok: true, user: { id: user.id, email: user.email } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
