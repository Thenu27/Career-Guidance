import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import './CourseFieldEdit.css'


const CourseFieldEdit=()=>{

    const navigate = useNavigate();

    const [CourseField,setCourseField] = useState();

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
    })

    useEffect(()=>{
        console.log('CourseField:',CourseField);
    },[CourseField])

    return(
        <div className="login-container question-container">
            <h1 className='edit-institute-title'>Edit CourseField</h1>
            <div className='institute-edit-inner-container'>
                <div>
                    {/* <label className='ol-input-label'>CourseField Name</label> */}
                    <input placeholder='Enter Name' className='ol-input career-input institute-input'/>    
                </div>

            </div>

            <div>
                <button className='login-btn add-question-btn add-career-field' >Submit</button>
            </div>
            
        </div>
    )
}

export default CourseFieldEdit;