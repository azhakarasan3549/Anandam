import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserProfiles } from "../Context/UserContext";
import supabase from "../DB/Supabaseclient";

// ─────────────────────────────────────────
//  SVG Icons — all use your site green #4a9b7f
// ─────────────────────────────────────────
const GREEN  = "#4a9b7f";
const GRAY   = "#b0b8c1";
const ACTIVE_BG = "#e8f5f0";

const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 12L12 3L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
      fill={active ? GREEN : "none"}
      stroke={active ? GREEN : GRAY}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={active ? GREEN : GRAY} strokeWidth="1.8" />
    <path d="M16.5 16.5L21 21" stroke={active ? GREEN : GRAY} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HeartIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={active ? GREEN : "none"}
      stroke={active ? GREEN : GRAY}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PersonIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4"
      fill={active ? GREEN : "none"}
      stroke={active ? GREEN : GRAY} strokeWidth="1.8" />
    <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
      stroke={active ? GREEN : GRAY} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
      fill="#e8f5f0" stroke={GREEN} strokeWidth="1.8" strokeLinejoin="round" />
    <polyline points="9,12 11,14 15,10"
      stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.08 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
      fill="#e8f5f0" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="#e05252" strokeWidth="1.8" strokeLinecap="round" />
    <polyline points="16,17 21,12 16,7"
      stroke="#e05252" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="12" x2="9" y2="12"
      stroke="#e05252" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────
//  Bottom nav tabs
// ─────────────────────────────────────────
const NAV_TABS = [
  { label: "Home",    to: "/",        icon: HomeIcon   },
  { label: "Search",  to: "/Profile", icon: SearchIcon },
  { label: "Matches", to: "/Wishlist",icon: HeartIcon  },
];

// ─────────────────────────────────────────
//  Component
// ─────────────────────────────────────────
export default function Navbar() {
  const [sheet, setSheet] = useState(false);
  const { user, logout }  = useContext(UserProfiles);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.app_metadata?.role === "admin");
    })();
  }, []);

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) navigate("/login", { replace: true });
  };

  const profilePhoto =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture     ||
    null;

  const fullName = user?.user_metadata?.full_name || "";
  const email    = user?.email || "";

  // lock scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sheet]);

  return (
    <>
      {/* ══════════════════════════════════════════════
          DESKTOP NAVBAR — 100% original, completely
          hidden on mobile via "hidden md:block"
      ══════════════════════════════════════════════ */}
      <nav className="hidden md:block bg-blend-color text-black top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-18">

          <img src="/pnglogo.png" alt="logo" className="h-20 w-22 mix-blend-multiply" />

          <div className="flex items-center gap-8">
            <Link className="transition font-medium" to="/Profile">Profiles</Link>
            <Link className="transition font-medium" to="/Contact">Contact</Link>
            <Link className="transition font-medium" to="/Wishlist">Wishlist</Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#091413] px-3 py-1.5 rounded-full">
                {profilePhoto && (
                  <img src={profilePhoto} alt="profile"
                    className="w-7 h-7 rounded-full object-cover" />
                )}
                <span className="font-medium text-white text-sm">
                  {user.user_metadata?.full_name}
                </span>
              </div>

              {isAdmin && (
                <Link to="/admin"
                  className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                  Admin
                </Link>
              )}

              <button onClick={handleLogout}
                className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          MOBILE — logo-only top bar (no hamburger)
          Matches your current site header exactly
      ══════════════════════════════════════════════ */}
      <div className="md:hidden sticky top-0 left-0 right-0 z-40 flex items-center px-4"
        style={{ background: "transparent", height: "64px" }}>
        <img src="/pnglogo.png" alt="logo"
          className="h-14 mix-blend-multiply" />
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE BOTTOM NAV BAR
          White pill bar — matches your green theme
      ══════════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "#ffffff",
          borderTop: "1.5px solid #e8f0ec",
          boxShadow: "0 -2px 20px rgba(74,155,127,0.10)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>

        <div className="flex items-center justify-around px-2 pt-2 pb-3">

          {/* Home · Search · Matches */}
          {NAV_TABS.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className="flex flex-col items-center gap-1"
                style={{ minWidth: 64 }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 14,
                  background: active ? ACTIVE_BG : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: active ? "translateY(-3px)" : "none",
                  transition: "all 0.2s ease",
                }}>
                  <Icon active={active} />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, lineHeight: 1,
                  color: active ? GREEN : GRAY,
                  transition: "color 0.2s",
                }}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Me — avatar tab opens bottom sheet */}
          <button onClick={() => setSheet(true)}
            className="flex flex-col items-center gap-1"
            style={{ minWidth: 64 }}>
            <div style={{
              width: 44, height: 44,
              borderRadius: 14,
              background: sheet ? ACTIVE_BG : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: sheet ? "translateY(-3px)" : "none",
              transition: "all 0.2s ease",
            }}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="me"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    objectFit: "cover",
                    border: `2.5px solid ${sheet ? GREEN : "#dde8e4"}`,
                    transition: "border-color 0.2s",
                  }} />
              ) : (
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: GREEN, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: 700,
                  border: `2.5px solid ${sheet ? "#2d7a60" : GREEN}`,
                }}>
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600, lineHeight: 1,
              color: sheet ? GREEN : GRAY,
              transition: "color 0.2s",
            }}>
              Me
            </span>
          </button>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SCRIM (backdrop behind sheet)
      ══════════════════════════════════════════════ */}
      <div className="md:hidden fixed inset-0 z-[60]"
        onClick={() => setSheet(false)}
        style={{
          background: "rgba(0,0,0,0.4)",
          opacity: sheet ? 1 : 0,
          pointerEvents: sheet ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }} />

      {/* ══════════════════════════════════════════════
          PROFILE BOTTOM SHEET
          Slides up when "Me" is tapped
      ══════════════════════════════════════════════ */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 z-[70]"
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          transform: sheet ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.38s cubic-bezier(0.32,0.72,0,1)",
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
        }}>

        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 6px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 99, background: "#e0e7e4" }} />
        </div>

        {/* ── Profile card ── */}
        <div style={{
          margin: "10px 16px 12px",
          padding: "14px 16px",
          borderRadius: 18,
          background: "linear-gradient(135deg, #edf8f4 0%, #f4fdf8 100%)",
          border: "1px solid #d0ece4",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          {profilePhoto ? (
            <img src={profilePhoto} alt="profile"
              style={{
                width: 56, height: 56, borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${GREEN}`,
                flexShrink: 0,
              }} />
          ) : (
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: GREEN, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, flexShrink: 0,
            }}>
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#1a2e26", margin: 0,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {fullName}
            </p>
            <p style={{ fontSize: 12, color: "#7a9e90", margin: "3px 0 0",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {email}
            </p>
            <div style={{
              marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4,
              background: "#d4f0e6", borderRadius: 99, padding: "2px 8px",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: GREEN }}>Active</span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "#f0f5f3", margin: "0 16px 6px" }} />

        {/* ── Menu rows ── */}
        <div style={{ padding: "0 12px" }}>

          {/* Browse Profiles */}
          <Link to="/Profile" onClick={() => setSheet(false)}
            style={{ display: "flex", alignItems: "center", gap: 14,
              padding: "13px 12px", borderRadius: 16,
              textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f4fdf8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#e8f5f0", border: "1px solid #c8e8dd",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <SearchIcon active={true} />
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a2e26", margin: 0 }}>Browse Profiles</p>
              <p style={{ fontSize: 11, color: "#9ab8ae", margin: "2px 0 0" }}>Find your perfect match</p>
            </div>
            <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke={GRAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Wishlist */}
          <Link to="/Wishlist" onClick={() => setSheet(false)}
            style={{ display: "flex", alignItems: "center", gap: 14,
              padding: "13px 12px", borderRadius: 16,
              textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f4fdf8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#e8f5f0", border: "1px solid #c8e8dd",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <HeartIcon active={true} />
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a2e26", margin: 0 }}>My Wishlist</p>
              <p style={{ fontSize: 11, color: "#9ab8ae", margin: "2px 0 0" }}>Your saved profiles</p>
            </div>
            <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke={GRAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Contact */}
          <Link to="/Contact" onClick={() => setSheet(false)}
            style={{ display: "flex", alignItems: "center", gap: 14,
              padding: "13px 12px", borderRadius: 16,
              textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#f4fdf8"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <span style={{
              width: 40, height: 40, borderRadius: 12,
              background: "#e8f5f0", border: "1px solid #c8e8dd",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <ContactIcon />
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a2e26", margin: 0 }}>Contact Us</p>
              <p style={{ fontSize: 11, color: "#9ab8ae", margin: "2px 0 0" }}>Get in touch</p>
            </div>
            <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke={GRAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Admin — conditional */}
          {isAdmin && (
            <Link to="/admin" onClick={() => setSheet(false)}
              style={{ display: "flex", alignItems: "center", gap: 14,
                padding: "13px 12px", borderRadius: 16,
                textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f4fdf8"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <span style={{
                width: 40, height: 40, borderRadius: 12,
                background: "#e8f5f0", border: "1px solid #c8e8dd",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <ShieldIcon />
              </span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1a2e26", margin: 0 }}>Admin Panel</p>
                <p style={{ fontSize: 11, color: "#9ab8ae", margin: "2px 0 0" }}>Manage the platform</p>
              </div>
              <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke={GRAY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "#f0f5f3", margin: "6px 16px 12px" }} />

        {/* ── Logout ── */}
        <div style={{ padding: "0 16px 40px" }}>
          <button
            onClick={() => { handleLogout(); setSheet(false); }}
            style={{
              width: "100%", padding: "14px",
              borderRadius: 16, border: "1.5px solid #fcc",
              background: "#fff8f8", color: "#e05252",
              fontSize: 14, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#fee"}
            onMouseLeave={e => e.currentTarget.style.background = "#fff8f8"}
          >
            <LogoutIcon />
            Logout
          </button>
        </div>

      </div>

      {/* Content spacer — keeps page above bottom nav */}
      <div className="md:hidden" style={{ height: 80 }} />
    </>
  );
}