// ===== CONFIG =====
const API_BASE_URL = "http://localhost:4000/api"; // matches your server.js
const MIN_AGE = 21; // or 25 depending on your rules

// Simple in-memory cart
let currentUser = null; // you can plug in real auth later
let selectedStore = null;
let cart = [];

// ===== DOM ELEMENTS =====
const ageGateEl = document.getElementById("age-gate");
const ageDobInput = document.getElementById("dob");
const ageMsgEl = document.getElementById("age-gate-message");
const btnAgeConfirm = document.getElementById("btn-age-confirm");
const btnAgeExit = document.getElementById("btn-age-exit");

const userNameEl = document.getElementById("user-name");
const verifyStatusEl = document.getElementById("verify-status");

const storeListEl = document.getElementById("store-list");
const storeTitleEl = document.getElementById("store-title");
const storeSubtitleEl = document.getElementById("store-subtitle");

const productListEl = document.getElementById("product-list");

const cartEmptyEl = document.getElementById("cart-empty");
const cartItemsEl = document.getElementById("cart-items");
const cartListEl = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const btnPlaceOrder = document.getElementById("btn-place-order");
const orderMsgEl = document.getElementById("order-message");

// ===== AGE GATE LOGIC =====
function calculateAge(dobStr) {
    const today = new Date();
    const dob = new Date(dobStr);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

function openExitPage() {
    // Simple behaviour: redirect to Google
    window.location.href = "https://www.google.com";
}

function handleAgeConfirm() {
    const dob = ageDobInput.value;
    if (!dob) {
        ageMsgEl.textContent = "Please enter your date of birth.";
        return;
    }
    const age = calculateAge(dob);
    if (age < MIN_AGE) {
        ageMsgEl.textContent = "You are not allowed to use this service.";
        return;
    }

    // Save locally just for UX; real verification happens via backend later
    localStorage.setItem("liquorLaneAgeGate", "passed");
    ageGateEl.style.display = "none";
}

function initAgeGate() {
    const passed = localStorage.getItem("liquorLaneAgeGate");
    if (passed === "passed") {
        ageGateEl.style.display = "none";
    } else {
        ageGateEl.style.display = "flex";
    }

    btnAgeConfirm.addEventListener("click", handleAgeConfirm);
    btnAgeExit.addEventListener("click", openExitPage);
}

// ===== API HELPERS =====
async function apiGet(path) {
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed`);
    return res.json();
}

async function apiPost(path, body) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg = data.error || data.message || `POST ${path} failed`;
        throw new Error(msg);
    }
    return data;
}

// ===== LOAD USER (FAKE OR REAL) =====
async function loadUser() {
    try {
        // TODO: hook real auth here (e.g. /users/me)

        // TEMP: Fake user for demo – marked as verified so you can place orders
        currentUser = {
            id: "demo-user-1",
            name: "Demo User",
            ageVerified: true,
            verificationStatus: "approved"
        };

        userNameEl.textContent = currentUser.name;
        updateVerifyBadge();
    } catch (err) {
        console.error("Failed to load user", err);
        userNameEl.textContent = "Guest User";
        verifyStatusEl.textContent = "Age not verified";
        verifyStatusEl.classList.add("not-verified");
    }
}

function updateVerifyBadge() {
    if (!currentUser) return;
    const { ageVerified, verificationStatus } = currentUser;

    verifyStatusEl.classList.remove("verified", "not-verified");

    if (ageVerified) {
        verifyStatusEl.textContent = "Age verified";
        verifyStatusEl.classList.add("verified");
    } else {
        const txt =
            verificationStatus === "pending"
                ? "Verification pending"
                : "Age not verified";
        verifyStatusEl.textContent = txt;
        verifyStatusEl.classList.add("not-verified");
    }
}

// ===== STORES =====
async function loadStores() {
    storeListEl.innerHTML = "<p>Loading stores...</p>";
    try {
        const stores = await apiGet("/stores");
        console.log("Stores from backend:", stores);

        if (!stores || stores.length === 0) {
            storeListEl.innerHTML = "<p>No stores available.</p>";
            return;
        }

        storeListEl.innerHTML = "";
        stores.forEach((store) => {
            const card = document.createElement("div");
            card.className = "store-card";
            card.dataset.storeId = store.id || store._id;

            card.innerHTML = `
        <div class="store-name">${store.name}</div>
        <div class="store-address">${store.address || "Address not provided"}</div>
      `;

            card.addEventListener("click", () => {
                document
                    .querySelectorAll(".store-card")
                    .forEach((el) => el.classList.remove("active"));
                card.classList.add("active");
                onSelectStore(store);
            });

            storeListEl.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load stores", err);
        storeListEl.innerHTML = "<p>Error loading stores.</p>";
    }
}

function onSelectStore(store) {
    selectedStore = store;
    storeTitleEl.textContent = store.name;
    storeSubtitleEl.textContent = store.address || "Selected store";
    loadProducts(store);
}

// ===== PRODUCTS =====
async function loadProducts(store) {
    productListEl.innerHTML = "<p>Loading products...</p>";
    try {
        const storeId = store.id || store._id;

        // Match your backend: GET /api/products?storeId=store1
        const products = await apiGet(
            `/products?storeId=${encodeURIComponent(storeId)}`
        );
        console.log("Products from backend:", products);

        if (!products || products.length === 0) {
            productListEl.innerHTML = "<p>No products available.</p>";
            return;
        }

        productListEl.innerHTML = "";

        products.forEach((p) => {
            const card = document.createElement("div");
            card.className = "product-card";

            const price = Number(p.price) || 0;
            const volume = p.unit || p.size || "";
            const stock = true; // all products are effectively "in stock" in your current db

            card.innerHTML = `
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span>${p.storeId}</span>
          <span>${volume}</span>
        </div>
        <div class="product-meta">
          <span class="product-price">₹${price}</span>
          <span class="product-stock">${stock ? "In stock" : "Out of stock"}</span>
        </div>
        <div class="product-actions">
          <button class="btn small primary">Add</button>
        </div>
      `;

            const btnAdd = card.querySelector("button");
            btnAdd.addEventListener("click", () => addToCart(p));

            productListEl.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load products", err);
        productListEl.innerHTML = "<p>Error loading products.</p>";
    }
}

// ===== CART =====
function addToCart(product) {
    if (!selectedStore) {
        alert("Please select a store first.");
        return;
    }

    const id = product.id || product._id;
    const existing = cart.find((item) => item.productId === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            productId: id,
            name: product.name,
            price: Number(product.price) || 0,
            qty: 1
        });
    }

    console.log("Cart after add:", cart);
    renderCart();
}

function changeQty(productId, diff) {
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;
    item.qty += diff;
    if (item.qty <= 0) {
        cart = cart.filter((i) => i.productId !== productId);
    }
    console.log("Cart after change:", cart);
    renderCart();
}

function renderCart() {
    console.log("Rendering cart with items:", cart);

    if (cart.length === 0) {
        cartEmptyEl.style.display = "block";
        cartItemsEl.classList.add("hide");
        cartListEl.innerHTML = "";
        cartTotalEl.textContent = "0";
        return;
    }

    cartEmptyEl.style.display = "none";
    cartItemsEl.classList.remove("hide");
    cartListEl.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const price = Number(item.price) || 0;
        const lineTotal = price * item.qty;
        total += lineTotal;

        li.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-controls">
        <span>₹${lineTotal}</span>
        <span class="cart-qty-btn" data-action="decrease">-</span>
        <span>${item.qty}</span>
        <span class="cart-qty-btn" data-action="increase">+</span>
      </div>
    `;

        const buttons = li.querySelectorAll(".cart-qty-btn");
        const btnDec = buttons[0];
        const btnInc = buttons[1];

        if (btnDec) {
            btnDec.addEventListener("click", () => changeQty(item.productId, -1));
        }
        if (btnInc) {
            btnInc.addEventListener("click", () => changeQty(item.productId, 1));
        }

        cartListEl.appendChild(li);
    });

    cartTotalEl.textContent = total.toString();
    console.log("Cart total now:", total);
}

// ===== ORDER =====
// ===== ORDER (STEP 1: SAVE & REDIRECT TO ADDRESS PAGE) =====
function placeOrder() {
    orderMsgEl.textContent = "";
    orderMsgEl.style.color = ""; // reset

    if (!currentUser) {
        orderMsgEl.textContent = "Please log in to place an order.";
        return;
    }

    if (!currentUser.ageVerified) {
        orderMsgEl.textContent =
            "You must complete age verification before ordering.";
        return;
    }

    if (!selectedStore) {
        orderMsgEl.textContent = "Please select a store.";
        return;
    }

    if (cart.length === 0) {
        orderMsgEl.textContent = "Your cart is empty.";
        return;
    }

    const storeId = selectedStore.id || selectedStore._id;

    // Build order payload (WITHOUT address yet)
    const items = cart.map((i) => ({
        productId: i.productId,
        quantity: i.qty,
        price: i.price
    }));

    const pendingOrder = {
        items,
        customer: {
            name: currentUser.name || "Guest",
            storeId
        }
    };

    // Save to localStorage so address page can read it
    localStorage.setItem(
        "liquorLanePendingOrder",
        JSON.stringify(pendingOrder)
    );

    // Also save cart (for summary)
    localStorage.setItem("liquorLaneCart", JSON.stringify(cart));

    // Redirect to address page
    window.location.href = "address.html";
}

// ===== INIT =====
function init() {
    initAgeGate();
    loadUser();
    loadStores();
    renderCart();
    btnPlaceOrder.addEventListener("click", placeOrder);
}

document.addEventListener("DOMContentLoaded", init);
