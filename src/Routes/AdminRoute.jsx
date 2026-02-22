import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Checking Admin...</p>;

  // Not logged in
  if (!session) return <Navigate to="/admin-login" />;

  // Check role
  if (session.user.user_metadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
