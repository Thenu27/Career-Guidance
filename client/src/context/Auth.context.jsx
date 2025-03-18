import { createContext, useContext, useEffect, useState } from 'react';
import {API} from '../Components/API/Api';
import Cookies from "js-cookie";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent UI flicker

  // Function to check authentication
  const checkAuth = async () => {

    try {

      const response = await API.get(`${process.env.REACT_APP_URL}/api/clientAuth`)
      console.log("response:",response)
      setUser(response.data.user);

      

    } catch(err) {
      setUser(null);
      console.log(err)
    } finally {
      setLoading(false); // Only now is the UI ready
    }
  };

  useEffect(() => { 
    checkAuth(); 
    // Run authentication check when app loads
  }, []);

  const login = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  const logout = () => {
    API.get(`${process.env.REACT_APP_URL}/auth/logout`).then(() => {
      Cookies.remove("token");
      setUser(null);
    });
    
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth ,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
