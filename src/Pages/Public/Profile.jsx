import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import LandscapeCard from "../../Components/LandscapeCard.jsx";
import SkeletonLoader from "../../Components/SkeletonLoader.jsx";

export default function Profile() {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("");
  const [age, setAge] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [search, religion, age]);

  const fetchProfiles = async () => {
    setLoading(true);

    let query = supabase.from("profiles").select("*");

    if (search) query = query.ilike("name", `%${search}%`);
    if (religion) query = query.eq("religion", religion);
    if (age) query = query.eq("age", Number(age));

    const { data, error } = await query;

    if (!error) {
      setProfiles(data || []);
    }

    setLoading(false);
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">

        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg outline-none"
        />

        <button
          onClick={() => setShowMore(!showMore)}
          className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          ⚙️
        </button>

      </div>

      {/* Filters */}
      {showMore && (
        <div className="flex gap-3 mb-6">

          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
          </select>

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border px-3 py-2 rounded-lg w-24"
          />

        </div>
      )}

      {/* Profiles */}
      {profiles.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Profile Not Found 😢
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {profiles.map((profile) => (
            <LandscapeCard
              key={profile.id}
              profile={profile}
            />
          ))}

        </div>
      )}

    </div>
  );
}