import { Heart, CheckCircle, Key } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton.jsx";


export default function ProfileCard({ profiles = []}) {


 return (
   <div className="w-full px-4 py-6 ">
     
     
        {profiles.map((profile) => (
          
            <div key={profile.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition m-5">
              {/* Image */}
              <div className="relative">
                <img
                  src={profile.photo_url}
                  alt={profile.name}
                  className="w-full h-72 object-cover rounded-t-2xl"
                />


                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                  <Heart className="w-4 h-4 text-pink-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {profile.name}, {profile.age}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  📍 {profile.city}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                    {profile.height}
                  </span>
                  <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                    {profile.religion}
                  </span>
                  <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                    {profile.zodiac_sign}
                  </span>
                  <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">
                    {profile.star}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/profiledetails/${profile.id}`}
                    className="text-pink-600 text-sm font-medium"
                  >
                    View Details
                  </Link>

                  <WhatsAppButton profileId={profile.id} />
                </div>
              </div>
            </div>
        
        ))}
     
    </div>
  );
}