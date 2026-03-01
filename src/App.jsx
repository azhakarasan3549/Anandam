import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Public/Home.jsx";
import Contact from "./Pages/Public/Contact.jsx";
import Profile from "./Pages/Public/Profile.jsx";
import ProfileDetails from "./Pages/Public/ProfileDetails.jsx";

import AdminRoute from "./Routes/AdminRoute.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminProfiles from "./Pages/Admin/AdminProfiles.jsx";
import EditProfile from "./Pages/Admin/EditProfile.jsx";
import AddProfile from "./Pages/Admin/AddProfile.jsx";
import AdminCarousel from "./Pages/Admin/AdminCarousel.jsx";
import Login from "./Pages/Public/Login.jsx";
import Signup from "./Pages/Public/Signup.jsx";

export default function App() {
  //.....
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profiledetails/:id" element={<ProfileDetails />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

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

      <Route path="/admin/profiles" element={ <AdminRoute>
        <AdminProfiles />
          </AdminRoute>
          } />
<Route path="/admin/editprofile/:id" element={ <AdminRoute>
  <EditProfile />
          </AdminRoute>} />
    </Routes>

    
  );
}
