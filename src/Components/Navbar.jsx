import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-pink-600 text-white px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold">Matrimony</h1>

        {/* Desktop Menu */}
        <div className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Profile" className="hover:underline">Profiles</Link>
          <Link to="/Contact" className="hover:underline">Contact</Link>
          <Link to="/admin-login" className="hover:underline">Admin Login</Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl z-50"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-mist-200 text-gray-900 px-4 py-3 space-y-2 transition-all duration-300 absolute left-0 w-full z-40 ${
          open ? "block" : "hidden"
        }`}
      >
        <Link onClick={() => setOpen(false)} to="/" className="block hover:underline">Home</Link>
        <Link onClick={() => setOpen(false)} to="/Profile" className="block hover:underline">Profiles</Link>
        <Link onClick={() => setOpen(false)} to="/Contact" className="block hover:underline">Contact</Link>
        <Link onClick={() => setOpen(false)} to="/admin-login" className="block hover:underline">Admin Login</Link>
      </div>
    </nav>
  );
}