import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function AdminCarousel() {
  const [carousel, setCarousel] = useState([]);
  const [title, setTitle] = useState("");
  const [profileId, setProfileId] = useState("");

  // 📥 Fetch carousel data
  const fetchCarousel = async () => {
    const { data, error } = await supabase
      .from("carousel")
      .select(`
        id,
        title,
        profiles (
          id,
          name
        )
      `);

    if (!error) setCarousel(data);
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  // ➕ Add to carousel
 const addCarousel = async () => {
  if (!title || !profileId) {
    toast.error("Enter title and profile ID");
    return;
  }

  const { data, error } = await supabase.from("carousel").insert([
    {
      title: title,
      profile_id: profileId,
    },
  ]);

  if (error) {
    console.log("Insert error:", error);
    toast.error(error.message);
    return;
  }

  toast.success("Added to carousel");
  setTitle("");
  setProfileId("");
  fetchCarousel();
};

  // ❌ Delete carousel item
  const deleteCarousel = async (id) => {
    const confirm = window.confirm("Delete this item?");
    if (!confirm) return;

    const { error } = await supabase
      .from("carousel")
      .delete()
      .eq("id", id);

    if (!error) {
      toast.success("Deleted");
      fetchCarousel();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Carousel</h1>

      {/* Add Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Carousel Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-3 rounded"
        />

        <input
          type="text"
          placeholder="Profile ID"
          value={profileId}
          onChange={(e) => setProfileId(e.target.value)}
          className="border p-2 mr-3 rounded"
        />

        <button
          onClick={addCarousel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Carousel Table */}
      <div className="bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>ID</th>
              <th>Title</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carousel.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.profiles?.name}</td>
                <td>
                  <button
                    onClick={() => deleteCarousel(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}