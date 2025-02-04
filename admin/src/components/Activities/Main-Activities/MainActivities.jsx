import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const MainActivities = ()=>{

    const navigate = useNavigate();
    const [Activities,setActivities] = useState([])

    const goToAddMainActivity=()=>{
        navigate('/activities/add-main-activity')
    }

    const goToSubActivities=()=>{
        navigate('/activities/sub-activities')
    }

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
        <div>
            <h1 className='welcome-title olevel-title '>Main Activites in the Database</h1>
            <div className='subject-container'>
                <div className='subject-inner-container'>

                {Activities.map(item=>{
                   return <button onClick={goToSubActivities} className='subject'>{item.main_activity}</button>
                })}
                </div>

                <div className='add-activity-btn-container'>
                    <button onClick={goToAddMainActivity} className='login-btn add-activity-btn'>Add Activity Field</button>
                </div>

            </div>
        </div>
    )
}

export default MainActivities;