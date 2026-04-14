import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import supabase from "./DB/Supabaseclient.js";

import Home from "./Pages/Public/Home.jsx";
import Contact from "./Pages/Public/Contact.jsx";
import Profile from "./Pages/Public/Profile.jsx";
import ProfileDetails from "./Pages/Public/ProfileDetails.jsx";

import AdminRoute from "./Routes/AdminRoute.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import PublicRoute from "./Routes/PublicRoute.jsx";

import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminProfiles from "./Pages/Admin/AdminProfiles.jsx";
import EditProfile from "./Pages/Admin/EditProfile.jsx";
import AddProfile from "./Pages/Admin/AddProfile.jsx";
import AdminCarousel from "./Pages/Admin/AdminCarousel.jsx";
import Login from "./Pages/Public/Login.jsx";
import Signup from "./Pages/Public/Signup.jsx";
import Wishlist from "./Pages/Public/Wishlist.jsx";
import ViewProfile from "./Pages/Admin/ViewProfile.jsx";
import ResetPassword from "./Pages/Public/ResetPassword.jsx";
import ForgetPassword from "./Pages/Public/ForgetPassword.jsx";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ STEP 1: Check URL hash immediately on load
    const hash = window.location.hash;
    if (hash && hash.includes("type=recovery")) {
      navigate("/reset-password" + hash);
      return;
    }

    // ✅ STEP 2: Check query params (Vercel sometimes converts hash to query)
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") === "recovery") {
      navigate("/reset-password" + window.location.search);
      return;
    }

    // ✅ STEP 3: Listen for auth state change as backup
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          navigate("/reset-password");
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <Routes>

      {/* ===== PUBLIC PROTECTED ROUTES ===== */}
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />

      <Route path="/contact" element={
        <ProtectedRoute><Contact /></ProtectedRoute>
      } />

      <Route path="/Wishlist" element={
        <ProtectedRoute><Wishlist /></ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />

      <Route path="/profiledetails/:id" element={
        <ProtectedRoute><ProfileDetails /></ProtectedRoute>
      } />

      {/* ===== AUTH ROUTES ===== */}
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />

      <Route path="/signup" element={
        <PublicRoute><Signup /></PublicRoute>
      } />

      <Route path="/forget-password" element={
        <PublicRoute><ForgetPassword /></PublicRoute>
      } />

      {/* ✅ Reset password must NOT be inside ProtectedRoute or PublicRoute */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin" element={
        <AdminRoute><AdminDashboard /></AdminRoute>
      } />

      <Route path="/admin/profiles" element={
        <AdminRoute><AdminProfiles /></AdminRoute>
      } />

      <Route path="/admin/addprofile" element={
        <AdminRoute><AddProfile /></AdminRoute>
      } />

      <Route path="/admin/editprofile/:id" element={
        <AdminRoute><EditProfile /></AdminRoute>
      } />

      <Route path="/admin/carousel" element={
        <AdminRoute><AdminCarousel /></AdminRoute>
      } />

      <Route path="/viewprofile/:id" element={
        <AdminRoute><ViewProfile /></AdminRoute>
      } />

    </Routes>
  );
}