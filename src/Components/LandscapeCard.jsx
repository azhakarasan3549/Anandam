import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import WhatsAppButton from "./WhatsAppButton";
import LazyImage from "./LazyImage.jsx";

export default function LandscapeCard({ profile }) {
  const { wishlistIds, addToWishlist, removeFromWishlist } = useWishlist();
  const liked = wishlistIds.includes(profile.id);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900"
      style={{ height: "380px" }}
    >
      {/* Full Background Image */}
      <LazyImage
        src={profile.photo_url}
        alt={profile.name}
        wrapperClassName="absolute inset-0 w-full h-full"
         className="w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay - bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Heart Button - top right */}
      <button
        onClick={() =>
          liked ? removeFromWishlist(profile.id) : addToWishlist(profile.id)
        }
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full z-10 hover:scale-110 transition"
      >
        <Heart
          className={`w-4 h-4 ${
            liked ? "fill-white text-white" : "text-white"
          }`}
        />
      </button>

      {/* Bottom Details */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">

        {/* Name + Age */}
        <h2 className="text-white text-xl font-bold mb-1">
          {profile.name}{" "}
          <span className="text-gray-300 font-normal text-base">
            {profile.age}
          </span>
        </h2>

        {/* Profession + City */}
        <div className="flex items-center gap-3 mb-3">
          {profile.profession && (
            <span className="text-gray-300 text-xs flex items-center gap-1">
              💼 {profile.profession}
            </span>
          )}
          {profile.city && (
            <span className="text-gray-300 text-xs flex items-center gap-1">
              📍 {profile.city}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <WhatsAppButton profileId={profile.id} />
          <Link
            to={`/profiledetails/${profile.id}`}
            className="flex-1 text-center bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-2 rounded-lg hover:bg-white/30 transition flex items-center justify-center gap-1"
          >
             View Details
          </Link>
        </div>

      </div>
    </div>
  );
}