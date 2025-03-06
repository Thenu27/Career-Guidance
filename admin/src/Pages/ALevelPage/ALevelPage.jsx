import { Outlet } from 'react-router-dom';
import './ALevelPage.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState,useEffect, useContext } from 'react';
import { ALevelContext } from '../../Context/ALevel.context';
import axios from 'axios';

const ALevelPage =()=>{

    const {setALevelLocalSubjects,ALevelLocalSubjects} = useContext(ALevelContext)

    const fetchALSubjectsLocal =async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/advancedlevel/subjects`);
            console.log(response.data);
            setALevelLocalSubjects(response.data);
        }catch(error){
            console.error("Error Fetching AL subjects",error);
       }
    }

    useEffect(()=>{
        fetchALSubjectsLocal();
    },[])

    const navigate = useNavigate();
    const location =useLocation();

    const backNavigation=()=>{
        if(location.pathname ==='/admin/advancedlevel'){
         navigate('/admin/option');
        }else if(location.pathname ==='/admin/advancedlevel/add'){
         navigate('/admin/advancedlevel/subjects');
        }else if(location.pathname==='/admin/advancedlevel/subjects'){
         navigate('/admin/advancedlevel/stream');
        }else if(location.pathname==='/admin/advancedlevel/add'){
            navigate('/admin/advancedlevel/subjects');
        }else if(location.pathname==='/admin/advancedlevel/stream'){
            navigate('/admin/advancedlevel')
        }else if(location.pathname==='/admin/advancedlevel/update'){
            navigate('/admin/advancedlevel/stream')
        }
     }
    return(
        <div className='home-container'>
            <Outlet/>

            <div className='navigation-btn'>
                <button onClick={backNavigation} className='login-btn back-btn'>Back</button>
            </div>
        </div>
    )
}

export default ALevelPage;