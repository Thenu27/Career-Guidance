import { useEffect, useState } from 'react';
import './AddSpatialization.css'
import axios from 'axios';
import axiosInstance from '../AxiosInstance/axiosInstance';

const AddSpatialization = ()=>{

    const [spatialization, setSpatialization] = useState('');

    const handleSpatializationChange = (event) => {
        setSpatialization(event);
    }

    const sendSpatializationToBackend = async () => {
        if(!window.confirm("Are you sure you want to add this spatialization?")) {
            return;
        }
        try {
            const response = await axiosInstance.post('/api/v1/admin/spatialization/add', {
                spatialization
            });

            if (response.status === 200) {
                 alert("Spatialization Added Successfully");
            }

        } catch (error) {
            console.error("Error when adding spatialization:", error);
            alert("Error when adding spatialization. Please try again.");
        }
    }

 
    
    return(
        <>
        <div className='Spatialization-container'>
            <div className='login-container question-container'>
                <div className='inner-question-container'>

                    <div className='career-field-title-container'>
                        <h1 className='welcome-title olevel-title enter-question-title'>Enter Spatialization You Want To Add</h1>
                    </div>

                    <div className='career-field-input-container'>
                        <input onChange={(e)=>{handleSpatializationChange(e.target.value)}}   className='input-question' placeholder='Enter Spatialization'/>
                    </div>

                    <div>
                        <button onClick={sendSpatializationToBackend} className='login-btn add-question-btn add-career-field' >Add Spatialization</button>
                    </div>

                </div>

            </div>
        </div>


        </>

    )
}

export default AddSpatialization