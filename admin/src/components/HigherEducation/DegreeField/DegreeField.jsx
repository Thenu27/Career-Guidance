import { useEffect,useState } from 'react';
import './DegreeField.css'
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../../../Context/CoursesContext';

const DegreeField =()=>{

    const [CourseField,setCourseField] = useState([]);
    const {SelectedCourseField,setSelectedCourseField,SelectedCourseFieldId,setSelectedCourseFieldId } = useContext(CoursesContext);

    const [Edit,setEdit] = useState(false);

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

    const handleCourseField = (field,id) => {
        setSelectedCourseField(field);
        setSelectedCourseFieldId(id)
    }

    useEffect(()=>{
        localStorage.setItem('SelectedAdminCourseField',SelectedCourseField)
        localStorage.setItem('SelectedAdminCourseFieldId',SelectedCourseFieldId)

    },[SelectedCourseField,SelectedCourseField])


    
    const goToInstitutes=()=>{
        navigate('/admin/higher-education/institutes/');
    }

    const goToAddCourseField=()=>{
        navigate('/admin/higher-education/course-field-add');
    }

    const handleEdit = () => {
        setEdit(!Edit);
    }

    const handleCourseFieldEdit = (courseFieldId) => {
        localStorage.setItem('SelectedCourseFieldIdEdit',courseFieldId);
        navigate('/admin/higher-education/coursefield/edit');
    }

    return(
        <>
            <div className='login-container career-field-container'>
                <div className='career-field-title-container'>
                    <h1 className='career-field-title'>Choose a Course Field</h1>
                </div>
                    <div className='career-field-inner-container institute-container'>

                        {CourseField.map((course)=>{
                            return(
                                <div className='institute-btn-container'>
                                     <button onClick={() => {handleCourseField(course.course_field_name,course.course_field_id);goToInstitutes();}} key={course.course_field_id} className='login-btn career-field-btn'>{course.course_field_name}</button>
                                    {Edit?<button onClick={()=>handleCourseFieldEdit(course.course_field_id)} className='insititue-edit-btn'>Edit</button>:null}
                                
                                </div>    
                            ) 
                        })}
            
                    </div>              

                    <div className='career-field-add'>
                        <button onClick={handleEdit} className='login-btn institute-edit-delete-btn'>Edit Institute</button>
                        <button onClick={goToAddCourseField}  className='login-btn add-question-btn'>Add Course Field</button>

                    </div>  
            </div>
            
            </>
    )

}

export default DegreeField;