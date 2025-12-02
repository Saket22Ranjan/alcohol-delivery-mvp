import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Stores from "./pages/Stores";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

function AgeGate({ onVerified }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050509]/95">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl">🍷</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Age Verification Required
                    </h2>
                    <p className="text-gray-600 mb-8">
                        You must be 21+ years old to access this alcohol delivery service.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={onVerified}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                        >
                            I am 21 or older
                        </button>
                        <button className="w-full text-gray-500 hover:text-gray-700 font-medium">
                            I'm under 21
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StoreCard() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🍷</span>
                </div>
                <div>
                    <h3 className="font-medium text-sm">City Liquor</h3>
                    <p className="text-xs text-[#A3A3A3]">0.8 km away</p>
                </div>
            </div>
            <div className="flex items-center justify-between text-xs">
                <span className="text-[#3DFA9A]">Open</span>
                <span>⭐ 4.8 (234)</span>
            </div>
        </div>
    );
}

function App() {
    const [isVerified, setIsVerified] = useState(false);
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-[#050509] text-[#F5F5F5]">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 opacity-40">
                <div className="absolute -top-40 -left-20 w-80 h-80 bg-[#F5A623]/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B1E3A]/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <Navbar isAuthenticated={isAuthenticated} />

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Auth />} />

                {/* Protected routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 space-y-6">
                                {/* Header */}
                                <header className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#A3A3A3]">
                                            Verified Alcohol Delivery
                                        </p>
                                        <h1 className="text-2xl font-semibold">Liquor Lane</h1>
                                    </div>
                                    <button className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5">
                                        Delhi · Change
                                    </button>
                                </header>

                                {/* Hero */}
                                <section className="mt-4 grid gap-6 md:grid-cols-[2fr,1.4fr] items-stretch">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-semibold mb-3">
                                                Late-night bottles,{" "}
                                                <span className="text-[#F5A623]">legally delivered.</span>
                                            </h2>
                                            <p className="text-sm text-[#A3A3A3]">
                                                Browse verified local liquor stores, upload your ID once, and
                                                get your favorite drinks delivered to your doorstep.
                                            </p>
                                        </div>
                                        <div className="mt-5 flex flex-wrap gap-3">
                                            <button className="px-4 py-2 rounded-2xl bg-[#F5A623] text-black text-sm font-semibold">
                                                View Nearby Stores
                                            </button>
                                            <button className="px-4 py-2 rounded-2xl border border-white/20 text-xs text-[#F5F5F5]">
                                                How verification works
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#0B0F16] border border-white/10 rounded-3xl p-5 flex flex-col justify-between">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3]">
                                                Live Cart
                                            </span>
                                            <span className="text-[11px] text-[#3DFA9A]">ID verified</span>
                                        </div>
                                        <div className="space-y-3 text-sm text-[#A3A3A3]">
                                            <div className="flex justify-between">
                                                <span>Jack Daniel&apos;s (750ml)</span>
                                                <span>₹2,300</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Kingfisher Premium (6-pack)</span>
                                                <span>₹540</span>
                                            </div>
                                            <div className="flex justify-between pt-3 border-t border-white/10 text-[#F5F5F5]">
                                                <span>Total</span>
                                                <span>₹2,840</span>
                                            </div>
                                        </div>
                                        <button className="mt-4 w-full py-2.5 rounded-2xl bg-[#F5A623] text-black text-sm font-semibold">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </section>

                                {/* Stores list */}
                                <section className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">Nearby Stores</h2>
                                        <button className="text-xs text-[#A3A3A3] underline underline-offset-4">
                                            View all
                                        </button>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <StoreCard />
                                        <StoreCard />
                                        <StoreCard />
                                    </div>
                                </section>
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                        <Admin />
                    </ProtectedRoute>
                } />
                <Route path="/stores" element={
                    <ProtectedRoute>
                        <Stores />
                    </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/landing" element={
                    <ProtectedRoute>
                        <Landing />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {!isVerified && <AgeGate onVerified={() => setIsVerified(true)} />}
        </div>
    );
}

export default App;
