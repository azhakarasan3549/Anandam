import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Public/Home.jsx";
import Contact from "./Pages/Public/Contact.jsx";
import Profile from "./Pages/Public/Profile.jsx";
import ProfileDetails from "./Pages/Public/ProfileDetails.jsx";

import AdminRoute from "./Routes/AdminRoute.jsx";
import AdminLogin from "./Pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminProfiles from "./Pages/Admin/AdminProfiles.jsx";
import EditProfile from "./Pages/Admin/EditProfile.jsx";
import AddProfile from "./Pages/Admin/AddProfile.jsx";
import AdminCarousel from "./Pages/Admin/AdminCarousel.jsx";

export default function App() {
  //.....
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profiledetails/:id" element={<ProfileDetails />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/carousel" element={<AdminCarousel />} />

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
