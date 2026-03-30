import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { toast } from "react-toastify";
import AdminProfiles from "./AdminProfiles.jsx";
import AdminHeader from "./AdminHeader.jsx";
import UserCount from "./UserCount.jsx";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  // 🔐 Check admin login..
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/login");
      }
    };
    checkAdmin();
  }, []);

  // 📥 Fetch profiles
  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (!error) {
      setProfiles(data);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // ❌ Delete profile
const deleteProfile = async (id, photo_url) => {
  const confirm = window.confirm("Delete profile?");
  if (!confirm) return;

  try {
    // ✅ Extract file name only
    const fileName = photo_url.split("/user-image/")[1];

    // ✅ Delete from Storage
    const { error: imgError } = await supabase.storage
      .from("user-image")
      .remove([fileName]);

    if (imgError) {
      console.error("Image delete error:", imgError);
    } else {
      console.log("Image deleted");
    }

    // ✅ Delete DB row
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DB delete error:", error);
    } else {
      toast.success("Profile Deleted successfully")
      fetchProfiles();
    }

  } catch (err) {
    console.error(err);
  }
};



  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Header */}
       <AdminHeader name="Admin"/>

      <div className="flex justify-evenly mt-2.5 w-full rounded-2xl p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
        {/* Add Profile Button */}
              <Link
        to="/admin/addprofile"  className="  bg-white text-black px-4 py-2 rounded mt-4" >
        Add Profile
      </Link>
     
            <Link to="/admin/carousel" className=" bg-white text-black px-4 py-2 rounded mt-4" >
           Manage Carousel
        </Link>
             <UserCount/>

      </div>

      {/* Profiles Table */}
     <AdminProfiles/>
    </div>
  );
}
