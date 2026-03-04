import { useState } from "react";
import { Heart} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";

export default function LandscapeCard({ profile }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
        
      {/* Image */}
      <div className="relative">
        <img
          src={profile.photo_url}
          alt={profile.name}
          className="w-full h-64 object-cover"
        />

        {profile.is_premium && (
          <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            PREMIUM
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Name + Like */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900">
            {profile.name}, {profile.age}
          </h2>

          <button
            onClick={() => setLiked(!liked)}
            className="transition-transform active:scale-90"
          >
            <Heart
              className={`w-6 h-6 ${
                liked ? "fill-pink-500 text-pink-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <p className="text-gray-600 text-sm">
          {profile.profession} • {profile.education}
        </p>

        <p className="text-pink-600 text-sm font-medium">
          {profile.city}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">

          <Link
                          to={`/profiledetails/${profile.id}`}
                          className="flex-1 text-center border border-b-emerald-500 text-emerald-500 text-xs font-medium py-2 rounded-lg hover:bg-emerald-50 transition"
                        >
                          View Details
                        </Link>
          
                      <Link className="mt-1"> <WhatsAppButton profileId={profile.id} /></Link>
        </div>
      </div>
    </div>
  );
}