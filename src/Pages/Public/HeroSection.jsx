import React from 'react'
import { visualize } from "react";
import { Link } from "react-router-dom";


export const HeroSection = () => {
  return (
    <div>
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-16">

  {/* Stacked Cards */}
  <div className="relative w-64 h-80">
    <div className="absolute w-44 h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-purple-400 left-0 top-8 -rotate-12 z-30">
      <img src="/logo.png" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm font-medium">Find your love</p>
      </div>
    </div>
    <div className="absolute w-44 h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-pink-400 left-12 top-2 -rotate-1 z-20">
      <img src="/profile2.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm font-medium">Meet people</p>
      </div>
    </div>
    <div className="absolute w-44 h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-700 left-24 top-12 rotate-12 z-10">
      <img src="/profile3.jpg" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm font-medium">Made with love</p>
      </div>
    </div>
  </div>

  {/* Text */}
  <div className="text-center md:text-left max-w-sm">
    <h1 className="text-3xl font-bold mb-3">Find your life<br/>partner today</h1>
    <p className="text-gray-500 mb-6">Trusted matrimonial service with verified profiles.</p>
    <div className="flex gap-3 justify-center md:justify-start">
      <Link to="/signup" className="bg-[#285A48] text-white px-6 py-2.5 rounded-full font-medium">Get started</Link>
      <Link to="/profile" className="border border-gray-300 px-6 py-2.5 rounded-full font-medium">Browse profiles</Link>
    </div>
  </div>

</section>
    </div>
  )
}
