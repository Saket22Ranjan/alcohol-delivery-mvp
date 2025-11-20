import React from 'react';

export default function StoreList({ stores, onSelect, selected }){
  return (
    <div>
      {stores.length === 0 && <div>Loading stores...</div>}
      {stores.map(s => (
        <div key={s.id}
             onClick={() => onSelect(s)}
             className={`store-card ${selected?.id === s.id ? 'selected' : ''}`}>
          <div className="store-name">{s.name}</div>
          <div className="store-addr">{s.address}</div>
        </div>
      ))}
    </div>
  );
}
