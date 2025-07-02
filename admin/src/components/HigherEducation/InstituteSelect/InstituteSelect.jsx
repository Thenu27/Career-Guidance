import { useEffect,useState } from 'react';
import './InstituteSelect.css'
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../../../Context/CoursesContext';

const InstituteSelect =()=>{

    const [SelectedAdminCourseField,setSelectedAdminCourseField] = useState();
    const [Institutes,setInstitutes] = useState()
    const [SelectedInstituteId,setSelectedInstituteId] = useState();
    const [Edit,setEdit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
    const storedData = localStorage.getItem('SelectedAdminCourseField');
    if (storedData) {
        setSelectedAdminCourseField(storedData);
    }
    }, []);

    useEffect(()=>{
        localStorage.setItem('SelectedInstituteId',SelectedInstituteId)
    },[SelectedInstituteId])


    const fetchInstitutes = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/admin/higher-education/institutes');

        if (response.status === 200) {
        setInstitutes(response.data.institutes); // Assuming the `institutes` array is inside response.data
        console.log(response.data.institutes);
        } else {
        console.error("Unexpected response status:", response.status);
        alert("Error fetching institutes: Unexpected response status");
        }
    } catch (error) {
        console.error("Error fetching institutes:", error);

        if (error.response) {
        // Server responded with a status code outside 2xx
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'Server Error'}`);
        } else if (error.request) {
        // Request was made but no response received
        alert("No response from server. Please check your network.");
        } else {
        // Something else happened
        alert("An unexpected error occurred while fetching institutes.");
        }
    }
    };



    useEffect(() => {
        fetchInstitutes()
    }, []);


    const handleSelectedInsititue =(institute_id)=>{
        setSelectedInstituteId(institute_id)
    }

    const goToCourses=()=>{
        navigate('/admin/higher-education/courses')
    }

    const goToAddInstitute=()=>{
        navigate('/admin/higher-education/institutes/add')
    }

    const handleEdit=()=>{
        setEdit(!Edit)
    }

    const handleInsitituteEditBtn=(id)=>{
        localStorage.setItem('SelectedInstituteId',id)
        navigate('/admin/higher-education/institutes/edit')
        
    }



    if(!Institutes || Institutes.length<1){
        return(
            <p>Loading...</p>
        )
    }

    return(
        <>
            <div className='login-container career-field-container'>
                <div className='career-field-title-container'>
                    <h1 className='career-field-title'>Choose an Institute</h1>
                </div>
                     <div className='career-field-inner-container institute-container'>

                        {Institutes.map((institute)=>{
                            return (
                                <div className='institute-btn-container'>
                                    <button className='login-btn career-field-btn' key={institute.institute_id} onClick={() => (handleSelectedInsititue(institute.institute_id), goToCourses())} >{institute.institute_acronym}</button>
                                    {Edit?<button onClick={()=>handleInsitituteEditBtn(institute.institute_id)} className='insititue-edit-btn'>Edit</button>:null}
                                </div>   
                            )
 
                        })}
            
                    </div>
                    <div className='career-field-add institute-edit-delete-container'>
                        <div>
                            <button onClick={handleEdit} className='login-btn institute-edit-delete-btn'>Edit Institute</button>
                        </div>
                        <div>
                            <button onClick={()=>{goToAddInstitute()}}  className='login-btn add-question-btn'>Add Institute</button>
                        </div>
                     </div>  
            </div>
            
            </>
    )

}

export default InstituteSelect;