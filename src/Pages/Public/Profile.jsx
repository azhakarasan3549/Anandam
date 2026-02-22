import { useContext, useState } from "react";
import { UserProfiles } from "../../Context/UserContext.jsx";
import ProfileCard from "../../Components/ProfileCard.jsx";
import SkeletonLoder from "../../Components/SkeletonLoader.jsx";

export default function Profile() {
  const { profiles, loading } = useContext(UserProfiles);

  const [search, setSearch] = useState("");
  const [religion, setReligion] = useState("");
  const [age, setAge] = useState("");
  const [showMore, setShowMore] = useState(false);

  if (loading) return <SkeletonLoder />;

  // Filter Logic
  const filteredProfiles = profiles.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (religion === "" || p.religion === religion) &&
      (age === "" || p.age === Number(age))
    );
  });

  return (
    <div className="w-full px-4 py-6">

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg outline-none"
        />

        {/* Filter Emoji Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-3 py-2 bg-gray-100 rounded-lg text-xl hover:bg-gray-200"
        >
          ⚙️
        </button>
      </div>

      {/* Hidden Filters */}
      {showMore && (
        <div className="flex gap-3 mb-4">

          {/* Religion */}
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="border px-2 py-2 rounded-lg"
          >
            <option value="">Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
          </select>

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border px-2 py-2 rounded-lg w-24"
          />
        </div>
      )}

      {/* Profile Not Found */}
      {filteredProfiles.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10">
          Profile Not Found 😢
        </div>
      ) : (
        <ProfileCard profiles={filteredProfiles} />
      )}
    </div>
  );
}
