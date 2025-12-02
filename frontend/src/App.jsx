import { useState } from "react";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // 🔹 AFTER LOGIN: show your website here
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
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
        <div>
          <strong>City Liquor – Downtown</strong>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>123 Main St</div>
        </div>
        <div style={{ marginTop: "8px" }}>
          <strong>Brew House</strong>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>45 River Rd</div>
        </div>
      </section>

      {/* Products */}
      <section style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", marginBottom: "4px" }}>Products</h2>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>No products</p>
        {/* Later you can map real products here */}
      </section>

      {/* Cart */}
      <section style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", marginBottom: "4px" }}>Cart</h2>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>Cart is empty</p>
        <p style={{ fontSize: "13px", marginTop: "8px" }}>Total: ₹0</p>
      </section>

      {/* Order form */}
      <section>
        <input
          placeholder="Your name (optional)"
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

export default App;
