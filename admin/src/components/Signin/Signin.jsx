import { useEffect, useState } from 'react';
import './Signin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../AxiosInstance/axiosInstance';

const Signin=()=>{
    const [username,setusername] = useState('');
    const [password,setpassword] = useState('');

    const navigate = useNavigate();

    const goToSelectOptionPage =()=>{
        navigate('/option')
    };

    const handlePassword = (value)=>{
        setpassword(value)
    }

    const handleUsername = (value)=>{
        setusername(value)
    }
    


    const Auth =async()=>{
        try{
            const response =await  axiosInstance.get(`${import.meta.env.VITE_APP_URL}/api/admin/auth/logout`);
        }catch(error){
            throw new Error(error)
        }

    }

    useEffect(()=>{
        Auth();
    },[])

    const sendtoBE = async()=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/signin`,{
                username,password
            })
            
            console.log(response.data)
    
            if(response.status===200){
                goToSelectOptionPage()
            }
            
    

        }catch(error){
            if (error.response && error.response.status === 401) {
                alert("❌ Credentials are Invalid");
            }
            
        }

    }

    return(
        <div className='home-container'>
            <div className='login-container login-input-container'>
                <div>
                    <h1 className='login-title'>Enter Your Credentials</h1>
                </div>
            <div className='login-group'>
                <input placeholder='Username' onChange={(e)=>handleUsername(e.target.value)} className='login-input' type='text'></input>
            
               
            
                <input placeholder='Password' onChange={(e)=>handlePassword(e.target.value)} className='login-input' type='password'></input>
            
            </div>
            <div className='signin-btn-container'>
            <button onClick={()=>{sendtoBE()}} className='signin-btn'>Sign In</button>

            </div>

            </div>
        </div>
           
    )
}

export default Signin