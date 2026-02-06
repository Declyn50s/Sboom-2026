import { Navigate, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import Footer from "../components/Footer";

import Home from "./fo/Home";
import Menu from "./fo/Menu";
import Product from "./fo/Product";
import Checkout from "./fo/Checkout";
import Restaurant from "./fo/Restaurant";
import Contact from "./fo/Contact";
import Story from "./fo/Story";
import Account from "./fo/Account";
import MentionsLegales from "./fo/MentionsLegales";
import Jobs from "./fo/Jobs";

import AdminLayout from "./bo/AdminLayout";
import AdminLogin from "./bo/AdminLogin";
import AdminDashboard from "./bo/AdminDashboard";
import AdminProducts from "./bo/AdminProducts";
import AdminSettings from "./bo/AdminSettings";

export default function App() {
  return (
    <div className="min-h-screen bg-sboom-orange">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10">
        <Routes>
          {/* Front Office */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/story" element={<Story />} />
          <Route path="/account" element={<Account />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* Back Office */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all à la fin */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer global */}
      <Footer />

      {/* Bottom nav (mobile) */}
      <BottomBar />
    </div>
  );
}
