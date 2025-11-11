import React, { useState } from 'react';

export default function Cart({ cart, setCart, onPlace, setQuantity, removeFromCart }){
  const [name, setName] = useState('');

  const changeQty = (id, delta) => {
    const item = cart.find(c => c.id === id);
    if(!item) return;
    setQuantity(id, item.quantity + delta);
  };

  const total = cart.reduce((s,p) => s + p.price * p.quantity, 0);

  return (
    <div className="cart-box">
      <h3>Cart</h3>
      {cart.length === 0 && <div>Cart is empty</div>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div>
            <div className="cart-name">{item.name}</div>
            <div className="cart-meta">₹{item.price} × {item.quantity}</div>
          </div>

          <div className="cart-controls">
            <button onClick={() => changeQty(item.id, 1)}>+</button>
            <button onClick={() => changeQty(item.id, -1)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      <hr />
      <div className="cart-total">Total: ₹{total}</div>

      <div style={{ marginTop: 8 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" />
      </div>

      <button style={{ marginTop: 8 }} onClick={() => onPlace({ name: name || 'Guest' })}>Place Order</button>
    </div>
  );
}
