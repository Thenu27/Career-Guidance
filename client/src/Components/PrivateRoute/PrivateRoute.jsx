import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevents UI flickering

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
