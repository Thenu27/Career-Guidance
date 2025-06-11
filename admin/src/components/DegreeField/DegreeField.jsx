import { useEffect,useState } from 'react';
import './DegreeField.css'
import axiosInstance from '../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../../Context/CoursesContext';

const DegreeField =()=>{

    const [CourseField,setCourseField] = useState([]);
    const {SelectedCourseField,setSelectedCourseField } = useContext(CoursesContext);

    const navigate = useNavigate();

    const fetchCourseField=async()=>{
        try{
            const response = await axiosInstance.get('/api/v1/admin/higher-education/courseField');
            console.log(response.data.field);
            setCourseField(response.data.field);
        }catch(error){
            console.log("Error when Fetching Career Fields from Backend",error)
        }
    }

    useEffect(()=>{
        fetchCourseField();
    },[])

    useEffect(()=>{
        console.log("Course Fields:", CourseField);
    },[CourseField])

    const handleCourseField = (field) => {
        setSelectedCourseField(field);
    }

    useEffect(()=>{
        localStorage.setItem('SelectedAdminCourseField',SelectedCourseField)
    },[SelectedCourseField])

    const goToCourses=()=>{
        navigate('/admin/higher-education/courses');
    }


    return(
        <>
            <div className='login-container career-field-container'>
                <div className='career-field-title-container'>
                    <h1 className='career-field-title'>Choose a Career Field</h1>
                </div>
                    <div className='career-field-inner-container'>

                        {CourseField.map((course)=>{
                            return <button onClick={() => {handleCourseField(course.course_field);goToCourses();}} key={course.course_field} className='login-btn career-field-btn'>{course.course_field}</button>
                        })}
            
                    </div>
                    <div className='career-field-add'>
                    <button  className='login-btn add-question-btn'>Add Course Field</button>
                </div>  
            </div>
            
            </>
    )

}

export default DegreeField;