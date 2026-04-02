import { ArrowLeft, Share2, CheckCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { useParams, useNavigate } from "react-router-dom";
import WhatsAppButton from "../../Components/WhatsAppButton.jsx";
import { useWishlist } from "../../Context/WishlistContext";

export default function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ CONTEXT
  const { wishlistIds, addToWishlist, removeFromWishlist } = useWishlist();

  const liked = wishlistIds.includes(id); // 🔥 important

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setProfile(data);
    setLoading(false);
  };

  // 🔗 Share
  const handleShare = async () => {
    if (!profile) return;

    if (navigator.share) {
      await navigator.share({
        title: profile.name,
        text: `Check this profile: ${profile.name}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!profile) return <p className="text-center p-10">Profile not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <ArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h2 className="font-semibold">Profile Details</h2>

        <Share2
          className="w-5 h-5 cursor-pointer"
          onClick={handleShare}
        />
      </div>

      {/* IMAGE */}
      <div className="relative">
        <img
          src={profile.photo_url}
          alt={profile.name}
          className="w-full h-112.5 object-cover"
        />

        {profile.verified && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow">
            <CheckCircle className="w-4 h-4 text-blue-500" />
            VERIFIED
          </div>
        )}
      </div>

      {/* CARD */}
      <div className="bg-white rounded-t-3xl -mt-6 p-5 relative">

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">
              {profile.name}, {profile.age}
            </h1>
            <p className="text-sm text-gray-500">📍 {profile.city}</p>
          </div>

          {/* ❤️ SAME LOGIC AS CARD */}
          <button
            onClick={() =>
              liked
                ? removeFromWishlist(profile.id)
                : addToWishlist(profile.id)
            }
            className="bg-pink-100 p-2 rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${
                liked
                  ? "fill-pink-600 text-pink-600"
                  : "text-pink-600"
              }`}
            />
          </button>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[profile.height, profile.languages].map((item, i) => (
            <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>

        {/* PROFESSIONAL */}
        <Section title="Professional & Education">
          <Item icon="💼" title={profile.profession} sub={profile.company} />
          <Item icon="🎓" title={profile.education} sub={profile.college} />
          <Item icon="💰" title={profile.income_range} sub="Annual Income" />
        </Section>

        {/* FAMILY */}
        <Section title="Family & Lifestyle">
              <KeyValue
                label="Religion / Caste"
                value={
                  profile.religion || profile.caste
                    ? `${profile.religion || ""}${profile.caste ? " / " + profile.caste : ""}`
                    : "Not mentioned"
                }
              />
          <KeyValue label="Zodiac_sign" value={profile.zodiac_sign} />
          <KeyValue label="Star" value={profile.star} />
          <KeyValue label="Lagnam" value={profile.lagna} />
        </Section>

        {/* WHATSAPP */}
        <div className="bg-pink-50 p-4 rounded-xl mt-6 text-center">
          <h3 className="font-semibold mb-2">
            Interested in {profile.name.split(" ")[0]}?
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Contact on WhatsApp for full details.
          </p>

          <div className="flex justify-center">
            <WhatsAppButton profileId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */
function Section({ title, children }) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Item({ icon, title, sub }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-3 rounded-lg">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

function KeyValue({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}