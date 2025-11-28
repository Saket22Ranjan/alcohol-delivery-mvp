import { useState } from "react";

function AgeGate({ onVerified }: { onVerified: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050509]/95">
      <div className="max-w-md w-full mx-4 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl shadow-black/40">
        <p className="text-xs uppercase tracking-[0.25em] text-[#A3A3A3] mb-3">
          Liquor Lane
        </p>
        <h1 className="text-3xl font-semibold text-white mb-2">
          Age Verification
        </h1>
        <p className="text-sm text-[#A3A3A3] mb-6">
          You must be of legal drinking age to use this service. Please confirm
          that you are 21+ and agree to drink responsibly.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onVerified}
            className="w-full py-3 rounded-2xl bg-[#F5A623] text-black font-semibold text-sm tracking-wide hover:brightness-110 transition"
          >
            Yes, I am 21+
          </button>
          <button
            className="w-full py-3 rounded-2xl border border-white/20 text-[#F5F5F5] text-sm hover:bg-white/5 transition"
            onClick={() => window.open("https://google.com", "_self")}
          >
            No, take me back
          </button>
        </div>

        <p className="mt-4 text-[11px] text-[#696969] text-center">
          Please drink responsibly. Delivery will require valid ID verification.
        </p>
      </div>
    </div>
  );
}

function StoreCard() {
  return (
    <div className="bg-[#0B0F16] rounded-2xl p-4 border border-white/5 hover:border-[#F5A623]/50 hover:-translate-y-1 transition shadow-lg shadow-black/40 cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">
          City Liquor – Downtown
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-[#7B1E3A]/50 text-[#F5F5F5]">
          Verified
        </span>
      </div>
      <p className="text-xs text-[#A3A3A3] mb-3">
        123 Main St · 1.2 km · Open till 11:30 PM
      </p>
      <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
        <span>Delivery in 30–45 min</span>
        <span className="text-[#3DFA9A]">ID mandatory</span>
      </div>
    </div>
  );
}

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="min-h-screen bg-[#050509] text-[#F5F5F5]">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-40 -left-20 w-80 h-80 bg-[#F5A623]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B1E3A]/30 blur-3xl" />
      </div>

      {/* Main content */}
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

      {!isVerified && <AgeGate onVerified={() => setIsVerified(true)} />}
    </div>
  );
}

export default App;
