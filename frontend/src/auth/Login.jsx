// frontend/src/auth/Login.jsx
import React, { useState, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

const API = 'http://localhost:4000/api';

export default function Login({ onLogin }) {
  // Email OTP state
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailStep, setEmailStep] = useState('idle'); // idle | sent | verifying

  // Phone OTP state
  const [phone, setPhone] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [message, setMessage] = useState('');
  const recaptchaRef = useRef(null);
  const confirmationResultRef = useRef(null);

  // GOOGLE SIGN-IN (Firebase)
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // minimal user object passed to parent
      onLogin({ provider: 'google', uid: user.uid, email: user.email, name: user.displayName });
    } catch (err) {
      console.error(err);
      setMessage('Google sign-in failed: ' + (err.message || ''));
    }
  };

  // EMAIL OTP: send
  const sendEmailOtp = async () => {
    if (!email) { setMessage('Please enter your email'); return; }
    setMessage('Sending OTP...');
    setEmailStep('sending');
    try {
      const res = await fetch(`${API}/send-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage('Error: ' + (data.error || 'failed to send OTP'));
        setEmailStep('idle');
        return;
      }
      setMessage('OTP sent to email. Check your inbox (and spam).');
      setEmailStep('sent');
    } catch (err) {
      console.error(err);
      setMessage('Network error sending OTP');
      setEmailStep('idle');
    }
  };

  // EMAIL OTP: verify
  const verifyEmailOtp = async () => {
    if (!emailOtp) { setMessage('Enter the OTP'); return; }
    setMessage('Verifying OTP...');
    setEmailStep('verifying');
    try {
      const res = await fetch(`${API}/verify-email-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: emailOtp })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage('Verification failed: ' + (data.error || 'invalid code'));
        setEmailStep('sent');
        return;
      }
      // success: backend returned user object
      setMessage('Email verified. Logged in.');
      // persist session (demo) and notify parent
      sessionStorage.setItem('user', JSON.stringify(data.user));
      onLogin({ provider: 'email', ...data.user });
    } catch (err) {
      console.error(err);
      setMessage('Network error verifying OTP');
      setEmailStep('sent');
    }
  };

  // PHONE (Firebase) helpers
  const setupRecaptcha = () => {
    if (recaptchaRef.current) return;
    recaptchaRef.current = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
  };

  const sendPhoneOtp = async () => {
    if (!phone) { setMessage('Enter phone with country code (e.g. +9199...)'); return; }
    setupRecaptcha();
    setMessage('Sending SMS OTP...');
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaRef.current);
      confirmationResultRef.current = confirmationResult;
      setMessage('SMS OTP sent. Enter the code below.');
    } catch (err) {
      console.error(err);
      setMessage('Phone OTP failed: ' + (err.message || ''));
    }
  };

  const verifyPhoneOtp = async () => {
    if (!phoneOtp) { setMessage('Enter SMS code'); return; }
    try {
      const result = await confirmationResultRef.current.confirm(phoneOtp);
      const user = result.user;
      const userObj = { provider: 'phone', uid: user.uid, phone: user.phoneNumber };
      sessionStorage.setItem('user', JSON.stringify(userObj));
      onLogin(userObj);
    } catch (err) {
      console.error(err);
      setMessage('Invalid SMS code');
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '22px auto', background: '#fff', padding: 18, borderRadius: 8 }}>
      <h2>Sign in</h2>

      <div style={{ marginBottom: 14 }}>
        <button onClick={handleGoogle}>Sign in with Google</button>
      </div>

      <hr />

      <div style={{ marginTop: 12 }}>
        <h4>Email OTP</h4>
        <input placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        <div style={{ marginTop: 8 }}>
          <button onClick={sendEmailOtp} disabled={emailStep === 'sending'}>{emailStep === 'sending' ? 'Sending...' : 'Send OTP'}</button>
        </div>

        {emailStep === 'sent' && (
          <div style={{ marginTop: 8 }}>
            <input placeholder="Enter OTP" value={emailOtp} onChange={e => setEmailOtp(e.target.value)} />
            <button onClick={verifyEmailOtp} style={{ marginLeft: 8 }}>Verify OTP</button>
          </div>
        )}
      </div>

      <hr />

      <div style={{ marginTop: 12 }}>
        <h4>Phone (SMS OTP)</h4>
        <input placeholder="+91..." value={phone} onChange={e => setPhone(e.target.value)} />
        <div id="recaptcha-container" />
        <div style={{ marginTop: 8 }}>
          <button onClick={sendPhoneOtp}>Send SMS OTP</button>
        </div>

        <div style={{ marginTop: 8 }}>
          <input placeholder="Enter SMS code" value={phoneOtp} onChange={e => setPhoneOtp(e.target.value)} />
          <button onClick={verifyPhoneOtp} style={{ marginLeft: 8 }}>Verify SMS</button>
        </div>
      </div>

      <div style={{ marginTop: 12, color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</div>
    </div>
  );
}
