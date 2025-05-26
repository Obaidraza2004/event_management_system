import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { ADMIN_EMAIL } from "../constants/admin";

export default function ProtectedRoute({ adminOnly = false, children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
