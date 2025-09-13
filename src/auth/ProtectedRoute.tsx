import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthed, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 16 }}>Checking session…</div>;
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
