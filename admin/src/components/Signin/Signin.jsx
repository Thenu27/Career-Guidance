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
    
    useEffect(()=>{
        console.log(password)
        console.log(username)

    },[username,password])

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
        <div className='Singin-page'>
           <div className='Singin-container'>
            <div className='login-group'>
                <label className='login-label'>Email</label>
                <input onChange={(e)=>handleUsername(e.target.value)} className='login-input' type='email'></input>
            </div>
               
            <div className='login-group'>
                <label className='login-label'>Password</label>
                <input onChange={(e)=>handlePassword(e.target.value)} className='login-input' type='password'></input>
            </div>

            <button onClick={()=>{sendtoBE()}} className='signin-btn'>Sign In</button>

            </div>
        </div>
    )
}

export default Signin