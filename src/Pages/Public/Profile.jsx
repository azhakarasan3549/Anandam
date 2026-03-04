import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import LandscapeCard from "../../Components/LandscapeCard.jsx";
import SkeletonLoader from "../../Components/SkeletonLoader.jsx";
import {  useNavigate } from "react-router-dom";
import { ArrowLeft,} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

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

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (religion) {
      query = query.eq("religion", religion);
    }

    if (age) {
      query = query.eq("age", Number(age));
    }

    const { data, error } = await query;

    if (error) {
      console.log("Error:", error.message);
    } else {
      setProfiles(data || []);
    }

    setLoading(false);
  };

  if (loading) return <SkeletonLoader />;

  return (
    
    <div className="w-full px-4 py-6">
            {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="relative flex items-center justify-center px-6 py-4">

            {/* Back Button - Left */}
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 flex items-center text-gray-600 hover:text-pink-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Center Title */}
            <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
              Browse Profiles
            </h2>

          </div>
        </header>
      {/* Search & Filter */}
      <div className="flex items-center gap-3 my-8">

        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg outline-none"
        />

        <button
          onClick={() => setShowMore(!showMore)}
          className="px-3 py-2 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
        >
          ⚙️
        </button>
      </div>

      {/* Filters */}
      {showMore && (
        <div className="flex gap-3 mb-4">

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

      {/* Profiles Grid */}
      {profiles.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10">
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