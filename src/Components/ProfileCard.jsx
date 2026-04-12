import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";
import { useWishlist } from "../Context/WishlistContext";
import LazyImage from "./LazyImage.jsx";

export default function ProfileCard({ profiles = [] }) {
  const { wishlistIds, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="flex justify-center py-2">
      {profiles.map((profile) => {
        const liked = wishlistIds.includes(profile.id);

        return (
          <div
            key={profile.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            style={{ width: "220px", minWidth: "220px", maxWidth: "220px" }}
          >
            {/* Image */}
            <div className="relative" style={{ height: "200px" }}>
              <LazyImage
                src={profile.photo_url}
                alt={profile.name}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover object-top"
              />

              {/* Heart Button */}
              <button
                onClick={() =>
                  liked
                    ? removeFromWishlist(profile.id)
                    : addToWishlist(profile.id)
                }
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
              >
                <Heart
                  className={`w-4 h-4 ${
                    liked
                      ? "fill-[#285A48] text-[#285A48]"
                      : "text-[#285A48]"
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-3" style={{ height: "140px" }}>
              <h3 className="font-semibold text-sm truncate">
                {profile.name}, {profile.age}
              </h3>

              <p className="text-xs text-gray-500 mt-1 mb-2 truncate">
                📍 {profile.city}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {profile.religion && (
                  <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full truncate max-w-22.5">
                    {profile.religion}
                  </span>
                )}
                {profile.zodiac_sign && (
                  <span className="bg-gray-100 text-xs px-2 py-0.5 rounded-full truncate max-w-22.5">
                    {profile.zodiac_sign}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/profiledetails/${profile.id}`}
                  className="flex-1 text-center border border-[#285A48] text-[#285A48] text-xs font-medium py-1.5 rounded-lg hover:bg-emerald-50 transition"
                >
                  View Details
                </Link>
                <WhatsAppButton profileId={profile.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}