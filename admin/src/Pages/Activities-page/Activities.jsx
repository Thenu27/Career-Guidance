import { useEffect, useState } from 'react';
import './Activities.css';
import axios from 'axios';
// import { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'


const Activities = ()=>{

    // const navigate = useNavigate();
    const [Activities,setActivities] = useState([])

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
                   return <button className='subject'>{item.main_activity}</button>
                })}
                </div>
            </div>
        </div>
    )
}

export default Activities