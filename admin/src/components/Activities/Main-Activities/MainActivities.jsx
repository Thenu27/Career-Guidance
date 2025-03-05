import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ActivitiesContext} from '../../../Context/Activities.context';
import './MainActivities.css'


const MainActivities = ()=>{

    const navigate = useNavigate();

    const {SelectedMainActivity,setSelectedMainActivity} = useContext( ActivitiesContext)


    const [Activities,setActivities] = useState([]);

    const goToAddMainActivity=()=>{
        navigate('/activities/add-main-activity')
    }

    const goToSubActivities=()=>{
        navigate('/activities/sub-activities')
    }


    const handleClick=(value)=>{
        setSelectedMainActivity(value)
    }

    useEffect(()=>{
        console.log("SelectedMainActivity",SelectedMainActivity)
    },[SelectedMainActivity])


    const fetchActivities=async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/activities`);
            setActivities(response.data);
        }catch(error){
            console.log("Error Fetching Activities from Database",error)
        }

    }

    useEffect(()=>{
        fetchActivities();
    },[])    
    useEffect(()=>{
        console.log("Activties",Activities)
    },[Activities])        

    return(
        <div className='login-container main-activity-container'>
            <h1 className='welcome-title olevel-title activity-title'>Main Activities in the Database</h1>
            <div className='subject-container'>
                <div className='subject-inner-container'>

                {Activities.map(item=>{
                   return <button onClick={()=>{goToSubActivities();handleClick(item.main_activity)}}  className='subject'>{item.main_activity}</button>
                })}
                </div>

                <div className='add-activity-btn-container'>
                    <button onClick={goToAddMainActivity} className='login-btn add-question-btn'>Add Activity Field</button>
                </div>

            </div>
        </div>
    )
}

export default MainActivities;