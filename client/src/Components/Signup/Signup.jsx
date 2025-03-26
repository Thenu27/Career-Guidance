import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/Auth.context'

const Signup = () => {

  const navigate = useNavigate();
  
  const {user,checkAuth} = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
  }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup submitted:', formData);
    await sendToBE()
  };

  const sendToBE = async()=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/signup`,{
          formData
        })


        console.log(response)
        if(response.status===200){
          alert('Account Created!');
          
          await checkAuth();
          navigate('/Assesment')
        }

    }catch(err){
      if(err.response){
        if(err.response.status===409){
          alert("User already exists")
        }  
        if(err.response.status===400){
          alert("An Error Occured")
        }
          console.log(err)
      }

    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button  type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;