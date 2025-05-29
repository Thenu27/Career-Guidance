import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth.context";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  console.log(user)
  if (loading) return <div className="spinner-container"><Spinner/></div>; // Prevents UI flickering

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
