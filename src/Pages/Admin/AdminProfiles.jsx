import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { Link } from "react-router-dom";

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Check admin login..
  useEffect(() => {
       const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin-login");
      }
    };
    checkAdmin();
    fetchProfiles();
  }, []);
  


  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*");
    setProfiles(data || []);
    setLoading(false);
  };

  const deleteProfile = async (profile) => {
    if (!window.confirm("Delete this profile?")) return;

    // Delete image from storage
    const fileName = profile.photo_url?.split("/").pop();
    if (fileName) {
      await supabase.storage.from("user-image").remove([fileName]);
    }

    // Delete row from table
    await supabase.from("profiles").delete().eq("id", profile.id);

    fetchProfiles();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-6 bg-white rounded-xl shadow p-4">

  
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* HEADER */}
          <thead>
            <tr className="bg-pink-600 text-white">
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center hidden sm:table-cell">Age</th>
              <th className="p-3 hidden sm:table-cell">ID</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">

                {/* Photo */}
                <td className="p-3">
                  <img
                    src={p.photo_url}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-md "
                  />
                </td>

                {/* Name */}
                <td className="p-3 font-semibold text-gray-800">
                  {p.name}
                </td>

                {/* Age */}
                <td className="p-3 text-center hidden sm:table-cell">
                  {p.age}
                </td>

                {/* City */}
                <td className="p-3 hidden sm:table-cell">
                  {p.id}
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex gap-2 justify-center">

                    <Link
                      to={`/admin/editprofile/${p.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      ✏️ Edit
                    </Link>

                    <button
                      onClick={() => deleteProfile(p)}
                      className="bg-gray-500 hover:bg-black text-white px-3 py-1 rounded text-xs"
                    >
                      🗑 Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}

            {profiles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No profiles found 😢
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}