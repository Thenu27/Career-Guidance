import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import './CourseFieldEdit.css'


const CourseFieldEdit=()=>{

    const navigate = useNavigate();

    const [CourseField,setCourseField] = useState();

    const [CourseFieldName,setCourseFieldName] = useState();
    const [CourseFieldId,setCourseFieldId] = useState();

    useEffect(()=>{
        if(CourseField){
            setCourseFieldName(CourseField.course_field_name)
            setCourseFieldId(CourseField.course_field_id);
        }
    },[CourseField])

    useEffect(()=>{
        console.log('Course Field Name:',CourseFieldName)
    },[CourseFieldName])

    const FetchCourseFieldToEdit = async(id) => {
        try{
            const response = await axiosInstance.post('/api/v1/admin/higher-education/coursefield/edit', {
                id
            })
            if(response.status === 200){
                console.log(response.data);
                setCourseField(response.data);
            }
        }catch(error){
            console.error("Error sending course field ID for edit:", error);
            alert("Error sending course field ID for edit. Please try again.");
        }
    }

    useEffect(()=>{
        const storedData = localStorage.getItem('SelectedCourseFieldIdEdit');
        if (storedData) {
            FetchCourseFieldToEdit(storedData);
        }
    },[])

    useEffect(()=>{
        console.log('CourseField:',CourseField);
    },[CourseField])

    const handleCoruseFieldNameChange=(event)=>{
        setCourseFieldName(event)
    }

    const sendDataToBE = async () => {
        if (!window.confirm('Are you sure you want to Change the Course Field Name?')) {
            return;
        }

        try {
            const response = await axiosInstance.post('/api/v1/admin/higher-education/coursefield/edit/name', { 
                CourseFieldName,
                CourseFieldId  
            });

            console.log('Response:', response.data);

            if (response.status === 200) {
                alert('Course Field Name Changed Successfully');
                navigate('/admin/higher-education/');
            }

        } catch (error) {
            console.error("Error updating Course Field Name:", error);
            alert("Update failed. Please try again.");
        }
    };
    

    return(
        <div className="login-container question-container">
            <h1 className='edit-institute-title'>Edit CourseField</h1>
            <div className='institute-edit-inner-container'>
                <div>
                    {/* <label className='ol-input-label'>CourseField Name</label> */}
                    <input placeholder='Enter Name' onChange={(e)=>{handleCoruseFieldNameChange(e.target.value)}} value={CourseFieldName} className='ol-input career-input institute-input'/>    
                </div>

            </div>

            <div>
                <button onClick={sendDataToBE} className='login-btn add-question-btn add-career-field' >Submit</button>
            </div>
            
        </div>
    )
}

export default CourseFieldEdit;