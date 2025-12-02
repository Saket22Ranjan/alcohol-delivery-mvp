// src/Login.jsx
import { useState } from "react";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        // super simple: accept any non-empty credentials
        setError("");
        onLogin();
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">LiquorExpress</h1>
                <p className="login-subtitle">Sign in to access the store</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <label className="login-label">
                        Email
                        <input
                            type="email"
                            className="login-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="login-label">
                        Password
                        <input
                            type="password"
                            className="login-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    {error && <p className="login-error">{error}</p>}

                    <button type="submit" className="login-button">
                        Continue
                    </button>
                </form>

                <p className="login-footer">18+ only · Drink responsibly 🍷</p>
            </div>
        </div>
    );
}
