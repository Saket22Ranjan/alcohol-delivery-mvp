import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:4000/api';
const UPLOADS_URL = 'http://localhost:4000/uploads';

export default function Admin(){
  const [verifs, setVerifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    if(passwordOk) fetchList();
  }, [passwordOk]);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/verifications`);
      const data = await res.json();
      setVerifs(data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load verifications');
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (vid, status) => {
    if(!confirm(`Set status to "${status}" for ${vid}?`)) return;
    try {
      const res = await fetch(`${API}/verifications/${vid}/status`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if(!res.ok) { alert('Error: ' + (data.error || JSON.stringify(data))); return; }
      setVerifs(prev => prev.map(v => v.id === vid ? {...v, status: data.status} : v));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleLogin = () => {
    // demo password
    if(pwd === 'admin123'){
      setPasswordOk(true);
    } else {
      alert('Wrong password');
    }
  };

  if(!passwordOk){
    return (
      <div style={{ padding: 20 }}>
        <Link to="/">← Back</Link>
        <h2>Admin — Login</h2>
        <p>Enter the demo admin password to continue.</p>
        <input value={pwd} onChange={e => setPwd(e.target.value)} placeholder="password" />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">← Back to app</Link>
      <h2>Admin — Verifications</h2>
      <div style={{ marginTop: 12 }}>
        <button onClick={fetchList} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</button>
      </div>

      <table style={{ width: '100%', marginTop: 12, borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign:'left', padding:8, borderBottom:'1px solid #ddd' }}>ID</th>
            <th style={{ textAlign:'left', padding:8, borderBottom:'1px solid #ddd' }}>Name / DOB</th>
            <th style={{ textAlign:'left', padding:8, borderBottom:'1px solid #ddd' }}>Image</th>
            <th style={{ textAlign:'left', padding:8, borderBottom:'1px solid #ddd' }}>Status</th>
            <th style={{ padding:8, borderBottom:'1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {verifs.length === 0 && <tr><td colSpan={5} style={{ padding:12 }}>No verifications</td></tr>}
          {verifs.map(v => (
            <tr key={v.id}>
              <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{v.id}</td>
              <td style={{ padding:8, borderBottom:'1px solid #eee' }}>{v.name || 'Guest'}<br/><small>{v.dob}</small></td>
              <td style={{ padding:8, borderBottom:'1px solid #eee' }}>
                {v.filename ? (
                  <a href={`${UPLOADS_URL}/${v.filename}`} target="_blank" rel="noreferrer">
                    <img src={`${UPLOADS_URL}/${v.filename}`} alt="id" style={{ maxHeight:80, borderRadius:6 }} />
                  </a>
                ) : '—'}
              </td>
              <td style={{ padding:8, borderBottom:'1px solid #eee' }}>
                <strong>{v.status}</strong>
              </td>
              <td style={{ padding:8, borderBottom:'1px solid #eee', textAlign:'center' }}>
                <button onClick={() => changeStatus(v.id, 'approved')} style={{ marginRight:6 }}>Approve</button>
                <button onClick={() => changeStatus(v.id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
