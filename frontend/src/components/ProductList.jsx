import React from 'react';

export default function ProductList({ products, onAdd }){
  if(!products.length) return <div>No products</div>;
  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="product-card">
          <div className="product-name">{p.name}</div>
          <div className="product-price">₹{p.price} / {p.unit}</div>
          <button onClick={() => onAdd(p)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
