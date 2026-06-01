// src/Components/HeroSwipeCards.jsx

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../DB/Supabaseclient.js";

export default function HeroSwipeCards() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    fetchRandomProfiles();
  }, []);

  const fetchRandomProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, age, city, photo_url");

    if (error) {
      console.log(error);
      return;
    }

    const shuffled = [...data]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setProfiles(shuffled);
  };

  const handleSwipe = (direction) => {
    if (!profiles.length) return;

    if (direction === "left") {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    } else {
      setCurrentIndex(
        (prev) => (prev - 1 + profiles.length) % profiles.length
      );
    }
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - startX;

    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? "right" : "left");
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? "right" : "left");
    }
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">

        {/* Swipe Cards */}
        <div className="relative w-full md:w-80 h-96">
          <div
            ref={containerRef}
            className="relative w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {profiles.map((profile, idx) => {
              const offset = idx - currentIndex;

              const scale = 1 - Math.abs(offset) * 0.04;
              const translateY = offset * 16;
              const rotateZ = offset * 8;
              const zIndex = 30 - Math.abs(offset) * 10;
              const opacity = offset > 1 || offset < -1 ? 0 : 1;

              return (
                <div
                  key={profile.id}
                  className="absolute w-60 h-80 rounded-3xl overflow-hidden shadow-2xl cursor-grab transition-all duration-500"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale}) rotateZ(${rotateZ}deg)`,
                    zIndex,
                    opacity,
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {/* Profile Image */}
                  <img
                    src={
                      profile.photo_url ||
                      "https://via.placeholder.com/400x500"
                    }
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Count */}
                  <div className="absolute top-3 right-3 bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {idx + 1}/{profiles.length}
                  </div>

                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <h3 className="text-white font-semibold text-lg">
                      {profile.name}
                    </h3>

                    <p className="text-white/90 text-sm">
                      {profile.age} • {profile.city}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center md:text-left max-w-sm">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            Find your life
            <br />
            partner today
          </h1>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Trusted matrimonial service with verified profiles.
            Swipe through real people looking for genuine
            connections.
          </p>

          <div className="flex gap-3 justify-center md:justify-start mb-6 flex-wrap">
            <Link
              to="/signup"
              className="bg-[#285A48] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#1e4635] transition"
            >
              Get Started
            </Link>

            <Link
              to="/profile"
              className="border border-gray-300 text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-50 transition"
            >
              Browse Profiles
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}