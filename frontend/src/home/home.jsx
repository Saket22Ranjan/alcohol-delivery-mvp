import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreList from '../components/StoreList';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import AgeModal from '../components/AgeModal';

const API = 'http://localhost:4000/api';
const LEGAL_AGE = 21;

export default function Home(){
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ageVerified, setAgeVerified] = useState(() => {
    try {
      const v = JSON.parse(sessionStorage.getItem('ageVerified'));
      return v?.verified === true;
    } catch { return false; }
  });

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

  const tryPlaceOrder = (customer) => {
    if(cart.length === 0){ alert('Cart is empty'); return; }
    if(!ageVerified) {
      setShowAgeModal(true);
      return;
    }
    placeOrder(customer);
  };

  const placeOrder = async (customer) => {
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

  // Called by AgeModal when verified
  const handleAgeVerified = (ok) => {
    setShowAgeModal(false);
    if(ok){
      setAgeVerified(true);
    } else {
      alert('You must be of legal drinking age to place an order.');
    }
  };

  return (
    <div className="app">
      <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <h1>LiquorExpress — MVP</h1>
        <div>
          <Link to="/admin" style={{ marginRight: 12 }}>Admin</Link>
        </div>
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
          <Cart
            cart={cart}
            setCart={setCart}
            onPlace={tryPlaceOrder}
            setQuantity={setQuantity}
            removeFromCart={removeFromCart}
          />
        </aside>
      </main>

      <AgeModal
        open={showAgeModal}
        legalAge={LEGAL_AGE}
        onClose={(ok) => handleAgeVerified(ok)}
      />
    </div>
  );
}
