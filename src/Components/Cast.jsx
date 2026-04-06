import React from "react";

const Casts = [
  "Vaniyar","Mudhaliar","Nattar","Padaiyachi","Settiyar",
  "Mukulathor","Naidu","Mupanar","Udaiyar","Kamalar",
  "Vishwakarma","Vellalar","Muthuraja","Mutharaiar"
];

const Cast = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-8 ">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Popular Casts
      </h2>

      {/* Wrapper with relative positioning */}
      <div className="relative overflow-hidden">

        {/* SVG with independent opacity */}
        <img
          src="/design.svg"
          className="absolute -z-10 pointer-events-none opacity-50"
          style={{
            width: "500px",
            top: "50%",
            right: "-50px",
            transform: "translateY(-50%)",
          }}
        />

        {/* Container */}
        <div className="relative  rounded-2xl p-5 text-center shadow-sm hover:shadow-md  transition">

          {/* Chips */}
          <div className="flex flex-wrap gap-3">
            {Casts.map((cast, index) => (
              <span
                key={index}
                className="
                  bg-black
                  text-white
                  font-medium
                  text-sm sm:text-base 
                  px-4 py-1.5 
                  rounded-full 
                  transition
                  cursor-pointer
                "
              >
                {cast}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cast;