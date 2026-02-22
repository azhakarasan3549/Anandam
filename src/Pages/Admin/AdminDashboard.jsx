import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { toast } from "react-toastify";
import AdminProfiles from "./AdminProfiles.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  // 🔐 Check admin login..
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin-login");
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
      <div className="flex justify-between items-center bg-white p-3 shadow rounded">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Profile Button */}
      <Link
        to="/admin/addprofile"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        ➕ Add Profile
      </Link>

      {/* Profiles Table */}
     <AdminProfiles/>
    </div>
  );
}
