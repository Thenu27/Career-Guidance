import { useEffect, useState } from 'react';
import './InstituteAdd.css'
import axios from 'axios';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const InstituteAdd = ()=>{

    const navigate = useNavigate()

    const [InstituteFullName, setInstituteFullName] = useState();
    const [InstituteAcronym,setInstituteAcronym] = useState();
    const [InstituteWebSite,setInstituteWebSite] = useState();


    const handleInstituteFullName=(event)=>{
        setInstituteFullName(event)
    }

    const handleInstituteAcronym=(event)=>{
        setInstituteAcronym(event)
    }

    const handleInstituteWebSite=(event)=>{
        setInstituteWebSite(event)
    }    


    const handleAddInstitute = async () => {
        if (!InstituteFullName || !InstituteAcronym || !InstituteWebSite) {
            alert("Please fill the necessary details before submitting.");
            return;
        }

        if(!window.confirm('Are you sure you want to add this Institute')){
            return
        }

        try {
            const response = await axiosInstance.post('/api/v1/admin/higher-education/institutes/add', {
                 InstituteFullName,
                 InstituteAcronym,
                 InstituteWebSite
            });

            if (response.status === 200) {
                alert("Institute Added Successfully");
                navigate('/admin/higher-education/institutes');
            }

        } catch (error) {
            console.error("Error when adding institute:", error);
            alert("Error when adding institute. Please try again.");
        }
    };

    


    return(
        <>
        <div className='login-container question-container insititue-add-container'>
            <div className='inner-question-container'>

                <div className='career-field-title-container'>
                    <h1 className='welcome-title olevel-title enter-question-title'>Enter Institute Details You Want To Add</h1>
                </div>

                <div className='career-field-input-container'>
                    <input onChange={(e)=>{handleInstituteFullName(e.target.value)}} className='input-question' placeholder='Enter Institute Full Name'/>
                </div>

                <div className='career-field-input-container'>
                    <input onChange={(e)=>{handleInstituteAcronym(e.target.value)}}  className='input-question' placeholder='Enter Institute Acronym'/>
                </div>

                <div className='career-field-input-container'>
                    <input onChange={(e)=>{handleInstituteWebSite(e.target.value)}}   className='input-question' placeholder='Enter Institute Website'/>
                </div>
                
                <div>
                    <button onClick={handleAddInstitute} className='login-btn add-question-btn add-career-field' >Add Institute</button>
                </div>

            </div>

        </div>

        </>

    )
}

export default InstituteAdd