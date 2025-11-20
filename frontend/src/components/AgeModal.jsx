// frontend/src/components/AgeModal.jsx
import React, { useEffect, useState } from 'react';

export default function AgeModal({ open, legalAge = 21, onClose }) {
  const [dob, setDob] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    if (!open) {
      // reset modal when closed
      setDob('');
      setFile(null);
      setPreview(null);
      setUploading(false);
      setStatus(null);
      setVerificationId(null);
    }
  }, [open]);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const checkAgeLocal = () => {
    if (!dob) { alert('Please enter your date of birth'); return null; }
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Normal DOB check (no upload) — if user is of age we approve immediately (optional)
  const confirmAgeByDob = () => {
    const age = checkAgeLocal();
    if (age === null) return;
    if (age >= legalAge) {
      // store in session so we don't ask again this session
      sessionStorage.setItem('ageVerified', JSON.stringify({ method: 'dob', verified: true }));
      onClose(true);
    } else {
      alert('You are under the legal drinking age.');
      onClose(false);
    }
  };

  // Upload ID image to backend for manual verification
  const uploadId = async () => {
    if (!file) { alert('Please select an ID image to upload'); return; }
    setUploading(true);
    try {
      const form = new FormData();
      form.append('idImage', file);
      // optional: send user name / dob with image
      form.append('dob', dob || '');
      form.append('name', 'Guest');

      const res = await fetch('http://localhost:4000/api/verify-id', {
        method: 'POST',
        body: form
      });

      const data = await res.json();
      setUploading(false);

      if (!res.ok) {
        console.error(data);
        alert('Upload failed: ' + (data.error || 'server error'));
        return;
      }

      setVerificationId(data.verificationId);
      setStatus(data.status || 'pending');

      // remember that the user has a pending verification this session (so we don't ask repeatedly)
      sessionStorage.setItem('ageVerified', JSON.stringify({ method: 'id', verified: false, vid: data.verificationId }));

      alert('ID uploaded. Verification is pending. You can check status from the modal.');
    } catch (err) {
      setUploading(false);
      console.error(err);
      alert('Network error during upload');
    }
  };

  // Check verification status using returned verification id
  const checkStatus = async () => {
    const vid = verificationId || JSON.parse(sessionStorage.getItem('ageVerified') || '{}')?.vid;
    if (!vid) { alert('No verification id found. Please upload first.'); return; }
    try {
      const res = await fetch(`http://localhost:4000/api/verify-status?vid=${vid}`);
      const data = await res.json();
      if (res.ok) {
        setStatus(data.status);
        if (data.status === 'approved') {
          // mark as verified in session
          sessionStorage.setItem('ageVerified', JSON.stringify({ method: 'id', verified: true, vid }));
          onClose(true); // auto-close modal and allow checkout
        } else {
          alert('Verification status: ' + data.status);
        }
      } else {
        alert('Could not fetch status: ' + (data.error || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert('Network error when checking status');
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Age Verification</h3>

        <p>You must be at least {legalAge} years old to place an order.</p>

        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 13, color: '#666' }}>Enter date of birth (quick check)</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
          <div style={{ marginTop: 6 }}>
            <button onClick={confirmAgeByDob}>Confirm by DOB</button>
          </div>
        </div>

        <hr />

        <div style={{ marginTop: 10 }}>
          <label style={{ fontSize: 13, color: '#666' }}>Or upload a photo of your ID (for verification)</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {preview && <div style={{ marginTop: 8 }}>
            <div style={{ marginBottom: 6 }}>Preview:</div>
            <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>}
          <div style={{ marginTop: 8 }}>
            <button disabled={uploading} onClick={uploadId}>{uploading ? 'Uploading...' : 'Upload ID for verification'}</button>
            <button style={{ marginLeft: 8 }} onClick={checkStatus}>Check status</button>
          </div>
        </div>

        {status && <div style={{ marginTop: 12 }}>
          <strong>Verification status:</strong> {status}
          {status === 'approved' && <div style={{ color: 'green' }}>Approved — you may place orders now.</div>}
          {status === 'rejected' && <div style={{ color: 'red' }}>Rejected — please contact support.</div>}
        </div>}

        <div style={{ marginTop: 14 }}>
          <button onClick={() => onClose(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}
