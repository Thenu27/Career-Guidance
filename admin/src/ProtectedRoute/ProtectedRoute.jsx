import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosInstance from "../components/AxiosInstance/axiosInstance";
import { useState, useEffect } from "react";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // To track the current route

  useEffect(() => {
    // If we're on the login page, set the authenticated state to false
    const checkAuth = async () => {
      try {
        await axiosInstance.get("/api/admin/auth/check");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]); // Re-run the effect when the route changes

  // Show loading state until authentication check is complete
  if (loading) return <p>Loading...</p>;

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
