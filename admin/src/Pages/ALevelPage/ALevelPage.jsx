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
        if(location.pathname ==='/advancedlevel'){
         navigate('/option');
        }else if(location.pathname ==='/advancedlevel/add'){
         navigate('/advancedlevel/subjects');
        }else if(location.pathname==='/advancedlevel/subjects'){
         navigate('/advancedlevel/stream');
        }else if(location.pathname==='/advancedlevel/add'){
            navigate('/advancedlevel/subjects');
        }else if(location.pathname==='/advancedlevel/stream'){
            navigate('/advancedlevel')
        }
     }
    return(
        <div>
            <Outlet/>

            <div className='navigation-btn'>
                <button onClick={backNavigation} className='login-btn'>Back</button>
            </div>
        </div>
    )
}

export default ALevelPage;