import React, { createContext, useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";

export const UserProfiles = createContext();

const UserContext = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Get Session + Listen for Auth Changes
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 📥 Fetch Profiles
  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (!error) {
      setProfiles(data);
    } else {
      console.log("Profile fetch error:", error.message);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // 👑 Check Admin Role
  const isAdmin = user?.user_metadata?.role === "admin";

  // 🖼 Get Profile Photo (Google or Email)
  const profilePhoto =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.identities?.[0]?.identity_data?.picture ||
    null;

  return (
    <UserProfiles.Provider
      value={{
        profiles,
        fetchProfiles,
        user,
        session,
        loading,
        logout,
        isAdmin,
        profilePhoto,
      }}
    >
      {children}
    </UserProfiles.Provider>
  );
};

export default UserContext;