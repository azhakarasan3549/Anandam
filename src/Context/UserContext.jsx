import React, { createContext, useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient.js";

export const UserProfiles = createContext();

const UserContext = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      console.log("Error:", error.message);
    } else {
      setProfiles(data);
    }

    setLoading(false);
  };

  return (
    <UserProfiles.Provider value={{ profiles, loading, fetchProfiles }}>
      {children}
    </UserProfiles.Provider>
  );
};

export default UserContext;
