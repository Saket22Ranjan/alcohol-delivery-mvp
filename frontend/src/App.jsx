import React, { useEffect, useState } from 'react';
import StoreList from './components/StoreList';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const API = 'http://localhost:4000/api';

export default function App(){
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=> {
    fetch(`${API}/stores`).then(r=>r.json()).then(setStores).catch(console.error);
  }, []);

  useEffect(()=> {
    if(selectedStore){
      fetch(`${API}/products?storeId=${selectedStore.id}`).then(r=>r.json()).then(setProducts).catch(console.error);
    } else {
      setProducts([]);
    }
  }, [selectedStore]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if(existing) return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity+1} : p);
      return [...prev, {...product, quantity:1}];
    });
  };

  const setQuantity = (id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? {...p, quantity: Math.max(1, qty)} : p));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));

  const placeOrder = async (customer) => {
    if(cart.length === 0) { alert('Cart empty'); return; }
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ items: cart, customer })
      });
      const data = await res.json();
      if(res.ok){
        alert(`Order placed: ${data.orderId}. Total ₹${data.total}`);
        setCart([]);
      } else {
        alert('Order failed: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert('Network error when placing order');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>LiquorExpress — MVP</h1>
      </header>

      <main className="layout">
        <aside className="stores">
          <h3>Stores</h3>
          <StoreList stores={stores} onSelect={setSelectedStore} selected={selectedStore} />
        </aside>

        <section className="products">
          <h3>{selectedStore ? `Products — ${selectedStore.name}` : 'Select a store'}</h3>
          <ProductList products={products} onAdd={addToCart} />
        </section>

        <aside className="cart">
          <Cart cart={cart} setCart={setCart} onPlace={placeOrder} setQuantity={setQuantity} removeFromCart={removeFromCart} />
        </aside>
      </main>
    </div>
  );
}
