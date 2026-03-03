import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserProfiles } from "../Context/UserContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useContext(UserProfiles);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("loged out")
    navigate("/");
  };

  const profilePhoto =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-pink-600 text-white fixed top-0 left-0 w-full z-50 shadow-md h-18">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
          
          <h1 className="text-xl font-bold tracking-tight">
            Matrimony
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="hover:text-pink-100 transition font-medium" to="/">
              Home
            </Link>
            <Link className="hover:text-pink-100 transition font-medium" to="/Profile">
              Profiles
            </Link>
            <Link className="hover:text-pink-100 transition font-medium" to="/Contact">
              Contact
            </Link>

            {!user ? (
              <div className="flex items-center gap-4">
                <Link
                  className="hover:text-pink-100 transition font-medium"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-pink-600 px-5 py-2 rounded-full font-bold shadow-sm hover:bg-pink-50 transition"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-pink-700/30 px-3 py-1.5 rounded-full border border-pink-400/30">
                  {profilePhoto && (
                    <img
                      src={profilePhoto}
                      alt="profile"
                      className="w-7 h-7 rounded-full object-cover border border-white"
                    />
                  )}
                  <span className="font-medium text-sm">
                    {user.user_metadata?.full_name}
                  </span>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-white text-pink-600 px-4 py-1.5 rounded-lg text-sm font-bold"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <span className="text-4xl font-bold leading-none">
                &times;
              </span>
            ) : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            )}
          </button>
        </div>
      </nav>


   

      {/* ================= MOBILE MENU ================= */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Side Panel */}
      <div
        className={`fixed top-4 right-0 w-4/5 max-w-sm h-[50vh] bg-white text-gray-900 z-50 shadow-2xl rounded-l-3xl md:hidden overflow-hidden transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-pink-50">
            <span className="font-bold text-pink-600 text-lg">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-4xl font-bold leading-none hover:scale-110 transition"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <Link onClick={() => setOpen(false)} to="/" className="block font-medium text-lg">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} to="/Profile" className="block font-medium text-lg">
              Profiles
            </Link>
            <Link onClick={() => setOpen(false)} to="/Contact" className="block font-medium text-lg">
              Contact
            </Link>

            <hr />

            {!user ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="block w-full text-center py-3 border-2 border-pink-600 text-pink-600 rounded-xl font-bold"
                >
                  Login
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/signup"
                  className="block w-full text-center py-3 bg-pink-600 text-white rounded-xl font-bold"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="profile"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                      {user.user_metadata?.full_name?.charAt(0)}
                    </div>
                  )}
                  <span className="font-bold">
                    {user.user_metadata?.full_name}
                  </span>
                </div>

                {isAdmin && (
                  <Link
                    onClick={() => setOpen(false)}
                    to="/admin"
                    className="block w-full text-center py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}