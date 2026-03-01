import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserProfiles } from "../Context/UserContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useContext(UserProfiles);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const profilePhoto =
    user?.user_metadata?.avatar_url ||   // Google login
    user?.user_metadata?.picture ||      // Some Google accounts
    null;

  return (
    <nav className="bg-pink-600 text-white px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold">Matrimony</h1>

        {/* Desktop */}
        <div className="space-x-4 hidden md:flex items-center">

          <Link to="/">Home</Link>
          <Link to="/Profile">Profiles</Link>
          <Link to="/Contact">Contact</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              {/* Admin Link */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-white text-pink-600 px-3 py-1 rounded"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Profile Photo */}
              {profilePhoto && (
                <img
                  src={profilePhoto}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              )}

              {/* Name */}
              <span className="font-semibold">
                {user.user_metadata?.full_name}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white text-gray-900 px-4 py-3 space-y-2">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/Profile">Profiles</Link>
          <Link onClick={() => setOpen(false)} to="/Contact">Contact</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin"
                  className="block font-semibold"
                >
                  Admin Dashboard
                </Link>
              )}

              {profilePhoto && (
                <img
                  src={profilePhoto}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              )}

              <p>{user.user_metadata?.full_name}</p>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-pink-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}