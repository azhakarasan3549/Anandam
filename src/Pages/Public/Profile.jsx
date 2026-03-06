import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import LandscapeCard from "../../Components/LandscapeCard.jsx";
import SkeletonLoader from "../../Components/SkeletonLoader.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const LIMIT = 6;

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("");
  const [age, setAge] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    resetProfiles();
  }, [search, religion, age]);

  useEffect(() => {
    fetchProfiles();
  }, [page]);

  // reset when filter changes
  const resetProfiles = () => {
    setProfiles([]);
    setPage(0);
    setHasMore(true);
  };

  const fetchProfiles = async () => {
    if (!hasMore) return;

    if (page === 0) setLoading(true);

    let query = supabase
      .from("profiles")
      .select("*")
      .range(page * LIMIT, page * LIMIT + LIMIT - 1);

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
      if (data.length < LIMIT) {
        setHasMore(false);
      }

      setProfiles((prev) => [...prev, ...data]);
    }

    setLoading(false);
  };

  // infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  if (loading && profiles.length === 0) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="relative flex items-center justify-center px-6 py-4">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 text-gray-600 hover:text-pink-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-semibold text-gray-900">
            Browse Profiles
          </h2>

        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 px-4 py-6">

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">

          <input
            type="text"
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg outline-none"
          />

          <button
            onClick={() => setShowMore(!showMore)}
            className="px-3 py-2 bg-gray-100 rounded-lg text-xl"
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
          <div className="text-center text-gray-500 text-xl mt-20">
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

        {/* Loading More */}
        {loading && (
          <div className="text-center py-6 text-gray-500">
            Loading more profiles...
          </div>
        )}

        {!hasMore && profiles.length > 0 && (
          <div className="text-center py-6 text-gray-400">
            No more profiles
          </div>
        )}

      </div>
    </div>
  );
}