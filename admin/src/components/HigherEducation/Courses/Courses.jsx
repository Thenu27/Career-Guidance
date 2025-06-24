import { useContext, useEffect, useState } from 'react';
import './Courses.css';
import axios from 'axios';
import { CareerContext } from '../../../Context/Career.context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { CoursesContext } from '../../../Context/CoursesContext';

const Courses = () => {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const {SelectedCourseFieldId,setSelectedCourseFieldId} = useContext(CoursesContext);

    useEffect(() => {
           const storedResult =  localStorage.getItem('SelectedAdminCourseFieldId');
           if(storedResult){
                setSelectedCourseFieldId(storedResult);
           }else{
            alert('Sonething went wrong, Please try again');
            navigate('/admin/higher-education');
           }
    },[SelectedCourseFieldId])

    const fetchCourses = async () => {
        try{
            const response = await axiosInstance.get(`/api/v1/admin/higher-education/courses?field=${SelectedCourseFieldId}`);
            console.log(response.data.courses);
            setCourses(response.data.courses);  
        }catch(error){
            console.error("Error when fetching courses", error);
        }
    }


    const deletingCourseField=async(SelectedCourseFieldId)=>{
        if(!window.confirm('Are you sure want Delete this Field')){
            return
        }
        try{
            const response = await axiosInstance.post(`/api/v1/admin/higher-education/coursefield/delete`,{
                SelectedCourseFieldId
            });
            console.log(response.data.courses);
            if(response.status===200){
                alert('CourseField Deleted Successfully')
                navigate('/admin/higher-education')
            }
        }catch(error){
            console.error("Error when fetching courses", error);
        }
    }

    useEffect(()=>{
    fetchCourses()
    },[SelectedCourseFieldId])

    const handleCourseClick = () => {
        navigate('/admin/higher-education/courses/update');
    }

    const handleSelectedCourse = (course_id) => {
        localStorage.setItem('SelectedAdminCourseId',course_id);
    }

    const handleAddCourse=()=>{
        navigate('/admin/higher-education/courses/add');
    }

    return (
        <>

            <div className="login-container career-field-container">
                <div className="career-field-title-container">
                    <h1 className="career-field-title">Choose a Course you want to Update</h1>
                </div>
                <div className="career-field-inner-container career-field-inner-container-02">
                    {courses.length > 0 ? ( 
                        courses.map((course) => (
                            <button
                                onClick={() => {handleCourseClick();handleSelectedCourse(course.course_id)}} // ✅ Handle click to navigate
                                key={course.course_id} // ✅ Ensure unique key
                                className="login-btn career-field-btn course-btn"
                            >
                                {course.course_name}
                            </button>
                        ))
                    ) : ( 
                        <p>No Careers Available in this Field</p> 
                    )}
                </div>

                <div className="add-career-container">
                    <div className='add-career-btn-container'>
                        <button onClick={handleAddCourse}  className="add-career-btn">Add Course</button>
                    </div>

                    <div className='add-career-btn-container'>
                        <button onClick={()=>deletingCourseField(SelectedCourseFieldId)} className="add-career-btn delete-field-btn">Delete</button>
                    </div>
                </div>

                
            </div>
        </>
    );
};

export default Courses;
