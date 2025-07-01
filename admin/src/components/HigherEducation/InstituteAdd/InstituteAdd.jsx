import { useEffect, useState } from 'react';
import './InstituteAdd.css'
import axios from 'axios';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const InstituteAdd = ()=>{

    const navigate = useNavigate()

    const [CourseField, setCourseField] = useState('');

    const handleCourseFieldChange = (event) => {
        setCourseField(event);
    }



    const sendCourseFieldToBackend = async () => {

        try {
            const response = await axiosInstance.post('/api/v1/admin/higher-education/course-field-add', {
                 CourseField
            });
            if(response.status===200){
                 alert("Course Field Added Successfully");
                  navigate('/admin/higher-education')
            }

        } catch (error) {
            console.error("Error when adding course field:", error);
            alert("Error when adding course field. Please try again.");
        }
    }
    
    const handleAddCourseField = (e) => {
        if(CourseField.trim() === '' || CourseField=== null || CourseField === undefined) {
            alert("Please enter a valid course field.");
            return;}
        if(!window.confirm("Are you sure you want to add this course field?")) {
            return;
        }
        sendCourseFieldToBackend();
    }

    return(
        <>
        <div className='login-container question-container'>
            <div className='inner-question-container'>

                <div className='career-field-title-container'>
                    <h1 className='welcome-title olevel-title enter-question-title'>Enter Institute You Want To Add</h1>
                </div>

                <div className='career-field-input-container'>
                    <input onChange={(e)=>{handleCourseFieldChange(e.target.value)}}  className='input-question' placeholder='Enter Institute'/>
                </div>

                <div>
                    <button onClick={handleAddCourseField} className='login-btn add-question-btn add-career-field' >Add Institute</button>
                </div>

            </div>

        </div>

        </>

    )
}

export default InstituteAdd