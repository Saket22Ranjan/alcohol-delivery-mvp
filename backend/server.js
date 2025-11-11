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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
