import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (user?.user_metadata?.role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAdmin ? children : <Navigate to="/" />;
}