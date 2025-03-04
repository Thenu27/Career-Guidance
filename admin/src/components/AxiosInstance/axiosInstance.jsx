import axios from "axios";

// Create an Axios instance with credentials set to true
const axiosInstance = axios.create({
    withCredentials: true,  // Ensures cookies (including JWT tokens) are sent with every request
});

// Set up the Axios response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Return response if everything is OK
        return response;
    },
    (error) => {
        // If the server responds with 401 or 403 (expired/invalid token)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error('Token expired or invalid. Redirecting to login...');

            // Redirect to the login page (using React Router or just a regular redirect)
            window.location.href = '/login';  // You can use `history.push('/login')` if using React Router

            // Optionally, clear any sensitive data (like tokens from localStorage/sessionStorage)
            // localStorage.removeItem('authToken');
            // sessionStorage.removeItem('authToken');
        }
        
        // Return the error to propagate it for further handling if needed
        return Promise.reject(error);
    }
);

export default axiosInstance;
 