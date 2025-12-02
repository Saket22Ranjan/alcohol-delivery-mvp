// src/MainApp.jsx
import { useState } from "react";

const STORES = [
    { id: "store1", name: "City Liquor - Downtown", address: "123 Main St" },
    { id: "store2", name: "Brew House", address: "45 River Rd" },
];

const PRODUCTS = {
    store1: [
        { id: "p1", name: "Jack Daniel's (750ml)", price: 2300 },
        { id: "p2", name: "Kingfisher Premium (6-pack)", price: 540 },
    ],
    store2: [
        { id: "p3", name: "Old Monk Rum (750ml)", price: 650 },
        { id: "p4", name: "Budweiser (4-pack)", price: 520 },
    ],
};

export default function MainApp() {
    const [selectedStoreId, setSelectedStoreId] = useState(STORES[0].id);
    const [cart, setCart] = useState([]);
    const [customerName, setCustomerName] = useState("");

    const currentStore = STORES.find((s) => s.id === selectedStoreId);
    const currentProducts = PRODUCTS[selectedStoreId] || [];

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const placeOrder = () => {
        if (cart.length === 0) {
            alert("Cart is empty.");
            return;
        }
        alert(
            `Order placed for ₹${total} ${customerName ? `by ${customerName}` : ""
            }. Thank you!`
        );
        setCart([]);
        setCustomerName("");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                padding: "16px",
                fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
        >
            {/* Header */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <div>
                    <h1 style={{ margin: 0, fontSize: "20px" }}>LiquorExpress – MVP</h1>
                    <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>
                        Simple demo store with cart
                    </p>
                </div>
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>Admin</span>
            </header>

            {/* Stores */}
            <section style={{ marginBottom: "16px" }}>
                <h2 style={{ fontSize: "14px", marginBottom: "4px" }}>Stores</h2>
                <select
                    value={selectedStoreId}
                    onChange={(e) => setSelectedStoreId(e.target.value)}
                    style={{
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #4b5563",
                        backgroundColor: "#020617",
                        color: "#e5e7eb",
                        fontSize: "13px",
                        marginBottom: "8px",
                    }}
                >
                    {STORES.map((store) => (
                        <option key={store.id} value={store.id}>
                            {store.name}
                        </option>
                    ))}
                </select>

                <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {currentStore?.address}
                </div>
            </section>

            {/* Products */}
            <section style={{ marginBottom: "16px" }}>
                <h2 style={{ fontSize: "14px", marginBottom: "4px" }}>Products</h2>
                {currentProducts.length === 0 ? (
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>No products</p>
                ) : (
                    <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "13px" }}>
                        {currentProducts.map((product) => (
                            <li
                                key={product.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "6px 0",
                                    borderBottom: "1px solid #1f2937",
                                }}
                            >
                                <span>{product.name}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span>₹{product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        style={{
                                            padding: "4px 8px",
                                            borderRadius: "999px",
                                            border: "none",
                                            backgroundColor: "#f97316",
                                            color: "#020617",
                                            fontSize: "11px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Cart */}
            <section style={{ marginBottom: "16px" }}>
                <h2 style={{ fontSize: "14px", marginBottom: "4px" }}>Cart</h2>
                {cart.length === 0 ? (
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>Cart is empty</p>
                ) : (
                    <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "13px" }}>
                        {cart.map((item, idx) => (
                            <li
                                key={idx}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "4px 0",
                                }}
                            >
                                <span>{item.name}</span>
                                <span>₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <p style={{ marginTop: "8px", fontSize: "13px" }}>Total: ₹{total}</p>
            </section>

            {/* Order form */}
            <section>
                <input
                    placeholder="Your name (optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                        padding: "6px 8px",
                        borderRadius: "4px",
                        border: "1px solid #4b5563",
                        backgroundColor: "#020617",
                        color: "#e5e7eb",
                        fontSize: "13px",
                        marginBottom: "8px",
                        display: "block",
                    }}
                />
                <button
                    onClick={placeOrder}
                    style={{
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#f97316",
                        color: "#020617",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                    }}
                >
                    Place Order
                </button>
            </section>
        </div>
    );
}
