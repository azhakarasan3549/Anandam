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
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  return (
    <nav className="bg-pink-600 text-white sticky top-0 z-50 shadow-md">
      
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-lg font-bold tracking-wide">Matrimony</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link className="hover:text-pink-200 transition" to="/">Home</Link>
          <Link className="hover:text-pink-200 transition" to="/Profile">Profiles</Link>
          <Link className="hover:text-pink-200 transition" to="/Contact">Contact</Link>

          {!user ? (
            <>
              <Link className="hover:text-pink-200 transition" to="/login">Login</Link>
              <Link
                to="/signup"
                className="bg-white text-pink-600 px-3 py-1 rounded-lg font-medium"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Profile Info */}
              <div className="flex items-center gap-2">
                {profilePhoto && (
                  <img
                    src={profilePhoto}
                    alt="profile"
                    className="w-8 h-8 rounded-full "
                  />
                )}
                <span className="font-medium text-sm">
                  {user.user_metadata?.full_name}
                </span>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-white text-pink-600 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-black text-white px-3 py-1 rounded-lg text-sm"
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

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white text-gray-800 px-6 py-4 space-y-4 shadow-lg border-t">
          
          <Link
            onClick={() => setOpen(false)}
            className="block font-medium"
            to="/"
          >
            Home
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="block font-medium"
            to="/Profile"
          >
            Profiles
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="block font-medium"
            to="/Contact"
          >
            Contact
          </Link>

          <hr />

          {!user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="block text-pink-600 font-semibold"
              >
                Login
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/signup"
                className="block bg-pink-600 text-white text-center py-2 rounded-lg"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Profile Info */}
              <div className="flex items-center gap-3">
                {profilePhoto && (
                  <img
                    src={profilePhoto}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="font-medium">
                  {user.user_metadata?.full_name}
                </span>
              </div>

              {isAdmin && (
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin"
                  className="block bg-gray-100 text-pink-600 text-center py-2 rounded-lg font-medium"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full bg-black text-white py-2 rounded-lg"
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