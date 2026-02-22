import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Matrimony</h1>
        <div className="space-x-4 hidden md:block">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to={"/Profile"} className="hover:underline">Profiles</Link>
          <Link to={"/Contact"} className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}