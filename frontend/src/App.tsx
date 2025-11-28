// frontend/src/App.tsx
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Stores from "./pages/Stores";
import Orders from "./pages/Orders";
import Verification from "./pages/Verification";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
