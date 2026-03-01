import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function ProfileCard({ profiles = [] }) {
  return (
    <div className="w-full px-1 py-4">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 mb-6 overflow-hidden"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={profile.photo_url}
              alt={profile.name}
              className="w-full h-44 object-cover"
            />

            {/* Heart Button */}
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition">
              <Heart className="w-4 h-4 text-pink-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-sm">
              {profile.name}, {profile.age}
            </h3>

            <p className="text-xs text-gray-500 mt-1 mb-3">
              📍 {profile.city}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                {profile.religion}
              </span>
              <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                {profile.zodiac_sign}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <Link
                to={`/profiledetails/${profile.id}`}
                className="flex-1 text-center border border-b-emerald-500 text-emerald-500 text-xs font-medium py-2 rounded-lg hover:bg-emerald-50 transition"
              >
                View Details
              </Link>

            
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}