import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useContext } from "react";
import { UserProfiles } from "../Context/UserContext.jsx";
import ProfileCard from "./ProfileCard.jsx";
import SkeletonLoader from "./SkeletonLoader.jsx";

export default function Carousel() {
  const { profiles, loading } = useContext(UserProfiles);

  if (loading) return <SkeletonLoader/>;


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Profiles</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {profiles.map((profile) => (
          <SwiperSlide key={profile.id}>
            {/* Send SINGLE profile as array */}
            <ProfileCard profiles={[profile]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
