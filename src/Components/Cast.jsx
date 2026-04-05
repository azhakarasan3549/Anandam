import React from "react";

const Casts = [
  "Vaniyar","Mudhaliar","Nattar","Padaiyachi","Settiyar",
  "Mukulathor","Naidu","Mupanar","Udaiyar","Kamalar",
  "Vishwakarma","Vellalar","Muthuraja","Mutharaiar"
];

const Cast = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-8">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        Popular Casts
      </h2>

      {/* Container */}
      <div   className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition">
        
        {/* Chips */}
        <div className="flex flex-wrap gap-3">
          {Casts.map((cast, index) => (
            <span
              key={index}
              className="
                bg-[#408A71] 
                text-black
                font-medium
                text-sm sm:text-base 
                px-4 py-1.5 
                rounded-full 
                hover:bg-[#B0E4CC] 
                transition
                cursor-pointer
              "
            >
              {cast}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Cast;