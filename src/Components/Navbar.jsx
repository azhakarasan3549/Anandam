import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserProfiles } from "../Context/UserContext";
import supabase from "../DB/Supabaseclient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(UserProfiles);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // ✅ Secure admin check (app_metadata)
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.app_metadata?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  const handleLogout = async () => {
    const { error } = await logout();

    if (!error) {
      navigate("/login", { replace: true });
    }
  };

  const profilePhoto =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-blend-color text-black  top-0 left-0 w-full z-50  h-18">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-full">
          
          <img
              src="/logo-transperent.png"
              alt="logo"
              className="h-20 w-22 mix-blend-multiply"
            />
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link className=" transition font-medium" to="/Profile">
              Profiles
            </Link>
            <Link className=" transition font-medium" to="/Contact">
              Contact
            </Link>
            <Link className=" transition font-medium" to="/Wishlist">
              Wishlist
            </Link>

           
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#091413] px-3 py-1.5 rounded-full ">
                  {profilePhoto && (
                    <img
                      src={profilePhoto}
                      alt="profile"
                      className="w-7 h-7 rounded-full object-cover "
                    />
                  )}
                  <span className="font-medium text-white text-sm">
                    {user.user_metadata?.full_name}
                  </span>
                </div>

                {/* ✅ Admin button (no UI change) */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
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
          
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2 text-black"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <span className="text-4xl font-bold leading-none">
                &times;
              </span>
            ) : (
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
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
  className={`fixed top-4 right-0 w-4/5 max-w-sm h-[50vh] bg-gray-800 text-white z-50 rounded-l-3xl md:hidden overflow-hidden transform transition-transform duration-300 ease-in-out ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col h-full">

    {/* ✅ Header with Menu title and X button side by side */}
    <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-600">
      <span className="text-lg font-semibold">Menu</span>
      <button
        onClick={() => setOpen(false)}
        className="text-2xl font-bold leading-none hover:scale-110 transition text-white"
      >
        &times;
      </button>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      <Link onClick={() => setOpen(false)} to="/Profile" className="block font-medium text-lg">
        Profiles
      </Link>
      <Link onClick={() => setOpen(false)} to="/Contact" className="block font-medium text-lg">
        Contact
      </Link>
      <Link onClick={() => setOpen(false)} to="/Wishlist" className="block font-medium text-lg">
        Wishlist
      </Link>

      <hr className="border-gray-600" />

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
          <span className="font-bold text-black">
            {user.user_metadata?.full_name}
          </span>
        </div>

        {isAdmin && (
          <Link
            onClick={() => setOpen(false)}
            to="/admin"
            className="block w-full text-center py-3 bg-gray-50 text-indigo-700 rounded-xl font-bold"
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
    </div>
  </div>
</div>
    </>
  );
}