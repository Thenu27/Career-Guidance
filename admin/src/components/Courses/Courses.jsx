import { useContext, useEffect, useState } from 'react';
import './Courses.css';
import axios from 'axios';
import { CareerContext } from '../../Context/Career.context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance/axiosInstance';

const Courses = () => {


    return (
        <>

            <div className="login-container career-field-container">
                <div className="career-field-title-container">
                    <h1 className="career-field-title">Choose a Course you want to Update</h1>
                </div>
                <div className="career-field-inner-container career-field-inner-container-02">
                    {/* {CareerInField.length > 0 ? ( 
                        CareerInField.map((career) => (
                            <button
                                key={career.career_id || career.career} // ✅ Ensure unique key
                                onClick={() => handleOnClick(career.career,career.career_id)}
                                className="login-btn career-field-btn"
                            >
                                {career.career}
                            </button>
                        ))
                    ) : ( 
                        <p>No Careers Available in this Field</p> 
                    )} */}
                </div>

                <div className="add-career-container">
                    <div className='add-career-btn-container'>
                        <button  className="add-career-btn">Add Career</button>
                    </div>

                    <div className='add-career-btn-container'>
                        <button className="add-career-btn delete-field-btn"> Delete</button>
                    </div>
                </div>

                
            </div>
        </>
    );
};

export default Courses;
