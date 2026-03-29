import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import WhatsAppButton from "./WhatsAppButton";

export default function LandscapeCard({ profile }) {
  const {
    wishlistIds,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const liked = wishlistIds.includes(profile.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
        
      <div className="relative">
        <img
          src={profile.photo_url}
          alt={profile.name}
          className="w-full h-64 object-cover"
        />

        <button
          onClick={() =>
            liked
              ? removeFromWishlist(profile.id)
              : addToWishlist(profile.id)
          }
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <Heart
            className={`w-6 h-6 ${
              liked
                ? "fill-pink-500 text-pink-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-lg font-bold">
          {profile.name}, {profile.age}
        </h2>

        <p className="text-sm text-gray-600">
          {profile.profession} • {profile.education}
        </p>

        <p className="text-pink-600 text-sm">
          {profile.city}
        </p>

        <div className="flex gap-3 pt-3">
          <Link
            to={`/profiledetails/${profile.id}`}
            className="flex-1 text-center border border-emerald-500 text-emerald-500 text-xs py-2 rounded-lg"
          >
            View Details
          </Link>

          <WhatsAppButton profileId={profile.id} />
        </div>
      </div>
    </div>
  );
}