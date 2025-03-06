import { useEffect, useState } from 'react';
import './Activities.css';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';

const Activities = ()=>{

    const navigate=useNavigate();
    const location =useLocation();

    const backNavigation=()=>{
        if(location.pathname ==='/admin/activities'){
         navigate('/admin/option');
         return;
        }
        if(location.pathname ==='/admin/activities/add-main-activity'){
            navigate('/admin/activities');
            return;
        }
        if(location.pathname ==='/admin/activities/sub-activities'){
            navigate('/admin/activities');
            return;
        }
        if(location.pathname ==='/admin/activities/sub-activity-update'){
            navigate('/admin/activities/sub-activities');
            return;
        }
        if(location.pathname ==='/admin/activities/sub-activity-add'){
            navigate('/admin/activities/sub-activities');
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