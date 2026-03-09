import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";

export default function PublicRoute({ children }) {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;

  if (session) {
    return <Navigate to="/" replace />;
  }

  return children;
}