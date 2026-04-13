import { Routes, Route } from "react-router-dom";

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
import ResetPassword from "./Pages/Public/Resetpassword.jsx";
import ForgetPassword from "./Pages/Public/Forgetpassword.jsx";

export default function App() {
  //.....
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute>
        <Home />
        </ProtectedRoute>} />

      <Route path="/contact" element={<ProtectedRoute>
        <Contact />
        </ProtectedRoute>} />

      <Route path="/Wishlist" element={<ProtectedRoute>
        <Wishlist />
        </ProtectedRoute>} />

      <Route path="/profile" element={<ProtectedRoute>
       <Profile />
        </ProtectedRoute>} />

      <Route path="/profiledetails/:id" element={<ProtectedRoute>
       <ProfileDetails />
        </ProtectedRoute>} />
        
      <Route path="/reset-password" element={
        <PublicRoute>
           <ResetPassword/>
        </PublicRoute> } />
      <Route path="/forget-password" element={
        <PublicRoute>
           <ForgetPassword/>
        </PublicRoute> } />
      <Route path="/login" element={
        <PublicRoute>
           <Login/>
        </PublicRoute> } />
      <Route path="/signup" element={
        <PublicRoute>
            <Signup/>
        </PublicRoute>
      } />

      <Route 
      path="/admin/carousel"
      element={
        <AdminRoute>
          <AdminCarousel />
        </AdminRoute>
     } 
    />
      <Route
        path="/admin/addprofile"
        element={
          <AdminRoute>
            <AddProfile/>
          </AdminRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

        <Route 
          path="/admin/profiles"
          element={
            <AdminRoute>
              <AdminProfiles />
            </AdminRoute>
           }
       />
       
       <Route path="/viewprofile/:id" element={<AdminRoute>
       <ViewProfile/>
        </AdminRoute>} />


          <Route 
          path="/admin/editprofile/:id" 
          element={
         <AdminRoute>
            <EditProfile />
          </AdminRoute>} />
    </Routes>

    
  );
}
