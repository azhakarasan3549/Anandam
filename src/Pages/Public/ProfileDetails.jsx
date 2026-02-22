import { ArrowLeft, Share2, CheckCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { useParams, useNavigate } from "react-router-dom";
import WhatsAppButton from "../../Components/WhatsAppButton.jsx";


export default function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.log("Error:", error.message);
    } else {
      setProfile(data);
    }

    setLoading(false);
  };

  // ✅ SHARE FUNCTION
  const handleShare = async () => {
    if (!profile) return;

    if (navigator.share) {
      await navigator.share({
        title: profile.name,
        text: `Check this matrimonial profile: ${profile.name}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied!");
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

      {/* PROFILE IMAGE */}
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

      {/* INFO CARD */}
      <div className="bg-white rounded-t-3xl -mt-6 p-5 relative">

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">
              {profile.name}, {profile.age}
            </h1>
            <p className="text-sm text-pink-600">{profile.active}</p>
            <p className="text-sm text-gray-500">📍 {profile.city}</p>
          </div>

          <div className="bg-pink-100 p-2 rounded-full">
            <Heart className="text-pink-600 w-5 h-5" />
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[profile.height, profile.marital, profile.languages].map((item, i) => (
            <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>

        {/* PROFESSIONAL */}
        <Section title="Professional & Education">
          <Item icon="💼" title={profile.profession} sub={profile.company} />
          <Item icon="🎓" title={profile.education} sub={profile.college} />
          <Item icon="💰" title={profile.income} sub="Annual Income" />
        </Section>

        {/* FAMILY */}
        <Section title="Family & Lifestyle">
          <KeyValue label="Mother Tongue" value={profile.motherTongue} />
          <KeyValue label="Religion / Caste" value={profile.religion} />
          <KeyValue label="Family Status" value={profile.familyStatus} />
          <KeyValue label="Diet" value={profile.diet} />
        </Section>

        {/* WHATSAPP CARD */}
        <div className="bg-pink-50 p-4 rounded-xl mt-6 text-center">
          <h3 className="font-semibold mb-2">
            Interested in {profile.name.split(" ")[0]}?
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Contact our matrimonial concierge on WhatsApp for full details.
          </p>

          <WhatsAppButton profileId={profile.id} fullWidth />
        </div>
      </div>
    </div>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

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
