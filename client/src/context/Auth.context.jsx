import { createContext, useContext, useEffect, useState } from 'react';
import {API} from '../Components/API/Api'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent UI flicker

  // Function to check authentication
  const checkAuth = async () => {
    try {
      const res = await API.get(`${process.env.REACT_APP_URL}/api/clientAuth`); // Call any protected route
      setUser({ id: res.data.userId }); // Store user data
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // Only now is the UI ready
    }
  };

  useEffect(() => {
    checkAuth(); 
    // Run authentication check when app loads
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
