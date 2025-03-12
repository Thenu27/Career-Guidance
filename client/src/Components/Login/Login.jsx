import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

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
    console.log('Login submitted:', formData);
    await sendToBE();
    // Add your login logic here
  };

  const sendToBE=async()=>{
    try{
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/login`,{
        formData
      })

      if(response.status===200){
        navigate('/Assesment')
        alert('Login Succesful!')
      }

    }catch(err){
      if(err.response.status===401){
        alert("Invalid Credentials!")
      }
      if(err.response.status===500){
        alert("Login Failed!")
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
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;