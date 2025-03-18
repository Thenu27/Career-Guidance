import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../API/Api';
import { useAuth } from '../../context/Auth.context';


const Login = () => {
  
  const navigate = useNavigate();
  
    const {user,checkAuth,login} = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('Login submitted:', formData);
    await sendToBE();
    // Add your login logic here
  };

  const sendToBE=async()=>{
    try{
      const response = await API.post(`${process.env.REACT_APP_URL}/api/login`,{
        formData
      },
      
    )

      if(response.status===200){
       await checkAuth()
       navigate('/Assesment')
        // alert('Login Succesful!')
        
      }

    }catch(err) {
      console.log(err);
      if (err.response) {
        if (err.response.status === 401) {
          alert("Invalid Credentials!");
        } else if (err.response.status === 500) {
          alert("Login Failed!");
        }
      } else {
        // If err.response is undefined, handle the error differently
        alert("An error occurred. Please try again later.");
      }
    }
  }



 
  return (
    <div className="login-container">
      <div className="login-form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div onClick={login} className="login-button">Login With Google</div>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;