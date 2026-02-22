import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../DB/Supabaseclient.js";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    city: "",
    profession: "",
    education: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔐 Admin Check
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin-login");
      }
    };
    checkAdmin();
  }, []);

  // 📥 Load profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      alert("Profile not found");
      return;
    }

    setProfile(data);
    setLoading(false);
  };

  // ✅ Update Profile
  const updateProfile = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profiles")
      .update({
        name: profile.name,
        age: profile.age,
        city: profile.city,
        profession: profile.profession,
        education: profile.education,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Update failed");
    } else {
      alert("Profile Updated");
      navigate("/admin/profiles");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={updateProfile} className="bg-white p-4 rounded shadow w-96">

        <Input label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
        <Input label="Age" type="number" value={profile.age} onChange={(v) => setProfile({ ...profile, age: v })} />
        <Input label="City" value={profile.city} onChange={(v) => setProfile({ ...profile, city: v })} />
        <Input label="Profession" value={profile.profession} onChange={(v) => setProfile({ ...profile, profession: v })} />
        <Input label="Education" value={profile.education} onChange={(v) => setProfile({ ...profile, education: v })} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-3">
          Save
        </button>
      </form>
    </div>
  );
}

// Reusable Input
function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-1 w-full rounded"
      />
    </div>
  );
}
