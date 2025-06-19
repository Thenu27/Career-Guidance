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
            alert('Enter a Career Field')
            return
        }
        try{  
            
            if(!window.confirm('Do you want to add this Career Field')){
                return
            }
            
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/admin/career/careerfield/add`,{
                CareerField
            })
            console.log(response);
            if(response.status === 200){
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
        <div className='login-container question-container'>
            <div className='inner-question-container'>

                <div className='career-field-title-container'>
                    <h1 className='welcome-title olevel-title enter-question-title'>Enter Career Field You Want To Add</h1>
                </div>

                <div className='career-field-input-container'>
                    <input value={CareerField} onChange={(e)=>handleCareerField(e)} className='input-question' placeholder='Add career field'/>
                </div>

                <div>
                    <button onClick={sendToBE} className='login-btn add-question-btn add-career-field' >Add Career Field</button>
                </div>

            </div>

        </div>

        </>

    )
}

export default CareerFieldAdd