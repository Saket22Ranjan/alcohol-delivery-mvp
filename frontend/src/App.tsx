import { Routes, Route } from "react-router-dom";

// 👉 Pages (ye sab tumhare project me dikh rahe the)
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Stores from "@/pages/Stores";
import StoreCatalog from "@/pages/StoreCatalog";
import Orders from "@/pages/Orders";
import Verification from "@/pages/Verification";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:storeId" element={<StoreCatalog />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
