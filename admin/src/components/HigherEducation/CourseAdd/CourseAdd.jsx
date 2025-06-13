import { useEffect, useState,useContext } from 'react';
import './CourseAdd.css';
import axios from 'axios';
import { CareerContext } from '../../../Context/Career.context';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CourseAdd = () => {

    const navigate = useNavigate();
    
    const [CourseField, setCourseField] = useState('');
    const [CourseName,setCourseName] = useState();
    const [CourseLevel,setCourseLevel] = useState();
    const [CourseUrl,setCourseUrl] = useState();
    const [CourseDuration,setCourseDuration] = useState();
    const [Courseinstitute,setCourseinstitute] = useState();
    const [CourseMinimumLevel,setCourseMinimumLevel] = useState();
    const [CourseSpecialization01,setCourseSpecialization01] = useState();
    const [CourseSpecialization02,setCourseSpecialization02] = useState();
    const [CourseSpecialization03,setCourseSpecialization03] = useState();
    const [CourseSpecialization04,setCourseSpecialization04] = useState();
    const [Coursetitle,setCoursetitle] = useState();
    const [CourseUniversity,setCourseUniversity] = useState();
    const [InstituteWebsite,setInstituteWebsite] = useState();
    const [CourseFees,setCourseFees] = useState();

    const handleCourseNameChange=(event)=>{
        setCourseName(event)
    }

    const handleCourseLevelChange=(event)=>{
        setCourseLevel(event)
    }

    const handleCourseDuration=(event)=>{
        setCourseDuration(event)
    }

    const handleCourseInstituteChange = (value) => {
    setCourseinstitute(value);
    };

    const handleCourseMinimumLevelChange = (value) => {
        setCourseMinimumLevel(value);
    };

    const handleSpecialization01Change = (value) => {
        setCourseSpecialization01(value);
    };

    const handleSpecialization02Change = (value) => {
        setCourseSpecialization02(value);
    };

    const handleSpecialization03Change = (value) => {
        setCourseSpecialization03(value);
    };

    const handleSpecialization04Change = (value) => {
        setCourseSpecialization04(value);
    };

    const handleCourseTitleChange = (value) => {
        setCoursetitle(value);
    };

    const handleCourseUniversityChange = (value) => {
        setCourseUniversity(value);
    };

    const handleInstituteWebsiteChange = (value) => {
        setInstituteWebsite(value);
    };

    const handleCourseFeesChange = (value) => {
        setCourseFees(value);
    };

    const handleCourseUrlChange = (value) => {
        setCourseUrl(value);
    };   

    useEffect(()=>{
        console.log("Course Name:", CourseName);
    },[CourseName])

    useEffect(()=>{
        const storedField = localStorage.getItem('SelectedAdminCourseField')
        if (storedField) {
            setCourseField(storedField);
        } else {
            alert("Something went wrong, please try again later!");
            navigate('/admin/higher-education');
        }
    },[])



    const sendUpdatedDataToBE = async () => {
    try {
        const response = await axiosInstance.post(`/api/v1/admin/higher-education/course-add`, {
            course_name: (CourseName || '').trim(),
            course_field: (CourseField || '').trim(),
            course_level: (CourseLevel || '').trim(),
            course_url: (CourseUrl || '').trim(),
            duration: (Number(CourseDuration) || null),
            institute: (Courseinstitute || '').trim(),
            minimum_level_category: (CourseMinimumLevel || '').trim(),
            s1: (CourseSpecialization01 || '').trim(),
            s2: (CourseSpecialization02 || '').trim(),
            s3: (CourseSpecialization03 || '').trim(),
            s4: (CourseSpecialization04 || '').trim(),
            title: (Coursetitle || '').trim(),
            university: (CourseUniversity || '').trim(),
            website: (InstituteWebsite || '').trim(),
            fees: (Number(CourseFees) || null)
        });

        if(response.status===200){
            alert("Course Added successfully!!");
            // navigate('/admin/higher-education/courses/');
        }
    window.location.reload();
    } catch (error) {
        console.error("Error Adding course:", error.response?.data || error.message);
        alert('Error Adding Course!')
    }
};

const handleSubmit = () => {
    if(CourseName.trim()==='' || CourseName===undefined) {
        alert('Please Enter a Course Name')
        return
    }
    if(!window.confirm("Do you want to add this course?")) {
        return;
    }

    sendUpdatedDataToBE();
}

    return (
        <>

            <div className='login-container ol-add-container career-add-input-container'>
            <div className='ol-add-header'>
                <h1 className='ol-add-title career-add-title'>Enter the necessary details</h1>
            </div>
                <div className='ol-add-inner-container career-add-inner-input-container'>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Course Name</label>
                        <input onChange={(e)=>{handleCourseNameChange(e.target.value)}} type='text' className='ol-input career-input ' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Course Level</label>
                        <input onChange={(e)=>{handleCourseLevelChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Title</label>
                        <input onChange={(e)=>{handleCourseTitleChange(e.target.value.h)}} type='text' className='ol-input career-input' />
                    </div>   


                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Course Duration</label>
                        <input onChange={(e)=>{handleCourseDuration(e.target.value)}} type='number' className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Course Fees</label>
                        <input onChange={(e)=>{handleCourseFeesChange(e.target.value)}} type='number' className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Institute</label>
                        <input onChange={(e)=>{handleCourseInstituteChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>
                    <div className='ol-input-container'>
                        <label className='ol-input-label career-input-label'>Institute Website</label>
                        <input onChange={(e)=>{handleInstituteWebsiteChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Course URL</label>
                        <input onChange={(e)=>{handleCourseUrlChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>University</label>
                        <input onChange={(e)=>{handleCourseUniversityChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>

                     <div className='ol-input-container'>
                        <label className='ol-input-label'>Specialization 01</label>
                        <input onChange={(e)=>{handleSpecialization01Change(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>
                    
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Specialization 02</label>
                        <input onChange={(e)=>{handleSpecialization02Change(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>
                    
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Specialization 03</label>
                        <input onChange={(e)=>{handleSpecialization03Change(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>  

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Specialization 04</label>
                        <input onChange={(e)=>{handleSpecialization04Change(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>  

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Minimum Level</label>
                        <input onChange={(e)=>{handleCourseMinimumLevelChange(e.target.value)}} type='text' className='ol-input career-input' />
                    </div>   

                </div>

                <div className='add-ol-btn-container add-career-btn-container'>
                    <button
                        className='add-ol-btn add-career-btn'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default CourseAdd;
