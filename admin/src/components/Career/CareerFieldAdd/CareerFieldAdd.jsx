import { useState } from 'react';
import './CareerFieldAdd.css';
import axios from 'axios';
import axiosInstance from '../../AxiosInstance/axiosInstance';

const CareerFieldAdd = ()=>{
    const [CareerField,setCareerField] = useState();

    const handleCareerField = (event)=>{
        setCareerField(event.target.value)
    }
    const sendToBE=async()=>{
        if(!CareerField){
            alert('Enter a career')
            return
        }
        try{    
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/admin/careerfield/career-field-add`,{
                CareerField
            })
            if(response.data === 'New Career Field Received'){
                alert('New career field created')
            }else{
                alert('Error Occured')
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <div className='career-field-container'>
            <div className='career-field-title-container'>
                <h1 className='career-field-title'>Enter Career Field You Want To Add</h1>
            </div>

            <div className='career-field-input-container'>
                <label className='add-career-field-label'>Add Career Field</label>
                <input value={CareerField} onChange={(e)=>handleCareerField(e)} className='add-career-field-input' placeholder='New Career Field'/>
            </div>

            <div>
                <button onClick={sendToBE} className='login-btn' >Add</button>
            </div>
        </div>

        </>

    )
}

export default CareerFieldAdd