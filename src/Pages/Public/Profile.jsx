import { useEffect, useState, useRef } from "react";
import supabase from "../../DB/Supabaseclient.js";
import LandscapeCard from "../../Components/LandscapeCard.jsx";
import Header from "../../Components/Header.jsx";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Profile() {

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("");
  const [age, setAge] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [page, setPage] = useState(0);

  const limit = 10;
  const loaderRef = useRef();

  useEffect(() => {
    setProfiles([]);
    setPage(0);
  }, [search, religion, age]);

  useEffect(() => {
    fetchProfiles();
  }, [page, search, religion, age]);

  const fetchProfiles = async () => {

    if (page === 0) setLoading(true);
    else setPageLoading(true);

    let query = supabase
      .from("profiles")
      .select("*")
      .range(page * limit, page * limit + limit - 1);

    if (search) query = query.ilike("name", `%${search}%`);
    if (religion) query = query.eq("religion", religion);
    if (age) query = query.eq("age", Number(age));

    const { data, error } = await query;

    if (!error && data) {
      setProfiles((prev) => [...prev, ...data]);
    }

    setLoading(false);
    setPageLoading(false);
  };

  /* Infinite Scroll */
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();

  }, []);

 

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <Header title="Browse Profiles" />

      <div className="p-4">

        {/* SEARCH + FILTER */}
        <div className="flex items-center gap-3 mb-5">

          <div className="flex items-center bg-white border rounded-lg px-3 py-2 flex-1">
            <Search className="w-4 h-4 text-gray-500 mr-2" />

            <input
              type="text"
              placeholder="Search name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full text-sm"
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-white border p-2 rounded-lg"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

        </div>

        {/* FILTER */}
        {showFilter && (

          <div className="bg-white p-4 rounded-xl shadow mb-5 flex gap-3 flex-wrap">

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

        {/* PROFILES */}
       
          <div className="space-y-4">

            {profiles.map((profile) => (
              <LandscapeCard
                key={profile.id}
                profile={profile}
              />
            ))}

          </div>

       

        {/* PAGINATION */}
        <div ref={loaderRef} className="text-center py-10">

          {pageLoading && (
            <p className="text-gray-500 text-sm">
              Loading more profiles...
            </p>
          )}

        </div>

      </div>

    </div>
  );
}