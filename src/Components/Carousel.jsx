import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";
import ProfileCard from "./ProfileCard.jsx";
import SkeletonLoader from "./SkeletonLoader.jsx";

export default function Carousel() {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarouselProfiles();
  }, []);

  const fetchCarouselProfiles = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("carousel")
      .select(`
        id,
        title,
        profiles (
          id,
          name,
          age,
          star,
          zodiac_sign,
          height,
          photo_url,
          city,
          religion
        )
      `);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    // Group by title
    const grouped = data.reduce((acc, item) => {
      if (!item.profiles) return acc;

      if (!acc[item.title]) {
        acc[item.title] = [];
      }

      acc[item.title].push(item.profiles);

      return acc;
    }, {});

    setGroupedData(grouped);
    setLoading(false);
  };

  if (loading) return <SkeletonLoader />;

  const titles = Object.keys(groupedData);

  if (titles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No carousel profiles found 😔
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2 py-10 space-y-12">
      {titles.map((title) => (
        <div key={title}>
          {/* Title */}
          <h2 className="text-lg font-bold mb-6 text-center">
            {title}
          </h2>

          {/* Swiper for each title */}
          <Swiper
            modules={[ Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1.6}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {groupedData[title].map((profile) => (
              <SwiperSlide key={profile.id}>
                <ProfileCard profiles={[profile]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
}