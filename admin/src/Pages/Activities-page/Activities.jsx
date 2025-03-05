import { useEffect, useState } from 'react';
import './Activities.css';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';

const Activities = ()=>{

    const navigate=useNavigate();
    const location =useLocation();

    const backNavigation=()=>{
        if(location.pathname ==='/activities'){
         navigate('/option');
         return;
        }
        if(location.pathname ==='/activities/add-main-activity'){
            navigate('/activities');
            return;
        }
        if(location.pathname ==='/activities/sub-activities'){
            navigate('/activities');
            return;
        }
        if(location.pathname ==='/activities/sub-activity-update'){
            navigate('/activities/sub-activities');
            return;
        }
        if(location.pathname ==='/activities/sub-activity-add'){
            navigate('/activities/sub-activities');
            return;
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

export default Activities;