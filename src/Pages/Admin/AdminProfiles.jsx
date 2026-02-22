import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { Link } from "react-router-dom";


export default function AdminProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*");
    setProfiles(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-4 w-full bg-white shadow rounded">

      {/* Mobile Scroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm ">
          <thead className="bg-pink-600 text-white">
            <tr>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left">Name</th>

              {/* Hide Age & City on Mobile */}
              <th className="p-2 text-center hidden sm:table-cell">Age</th>
              <th className="p-2 text-left hidden sm:table-cell">City</th>

              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {profiles.map((p) => (
             <tr key={p.id} className="border-b last:border-none hover:bg-gray-50">
            
            <td className="p-2">
              <img src={p.photo_url} className="w-10 h-10 rounded object-cover" />
            </td>

            <td className="p-2 font-semibold">{p.name}</td>

            <td className="p-2 hidden sm:table-cell text-center">{p.age}</td>

            <td className="p-2 hidden sm:table-cell">{p.city}</td>

            {/* FIXED ACTION */}
            <td className="p-2 text-center">
              <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
                <Link
                  to={`/admin/editprofile/${p.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs w-full sm:w-auto"
                >
             ✏️ Edit
                </Link>

                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs w-full sm:w-auto">
                 🗑️Delete
                </button>
              </div>
            </td>
          </tr>

            ))}

            {profiles.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Profile not found 😢
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
