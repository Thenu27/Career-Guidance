import { useContext, useEffect, useState } from 'react';
import './Career.css';
import axios from 'axios';
import { CareerContext } from '../../../Context/Career.context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosInstance';

const Career = () => {
    const navigate = useNavigate();
    
    const { setSelectedField, SelectedField, setSelectedCareer, SelectedCareer,SelectedCareerId,setSelectedCareerId } = useContext(CareerContext);
    const [CareerInField, setCareerInField] = useState([]);


    // ✅ Fetch Careers from API
    const fetchCareers = async () => {
        try {
            const response = await axiosInstance.post('/api/v1/admin/career/careerfield/all-careers', {
                SelectedField
            });
            console.log("Response from API:", response.data);
            setCareerInField(response.data);


        } catch (error) {
            console.error("Error when fetching careers", error);
        }
    };

    // ✅ Fetch careers when `SelectedField` changes
    useEffect(() => {
        fetchCareers();
    }, [SelectedField]);

    useEffect(()=>{
        console.log("This is the careers",CareerInField)
        if(CareerInField.length > 0 ){
            localStorage.setItem("HasCareer",true)
        }else{
            localStorage.setItem("HasCareer",false)

        }
    },CareerInField)

    // ✅ Ensure `SelectedField` is retrieved from localStorage before fetching careers
    useEffect(() => {
        const storedField = localStorage.getItem('SelectedField') || ""; // Default to empty string
        setSelectedField(storedField);
        if (storedField) {
            fetchCareers();
        }
    }, []);

    // ✅ Log whenever `SelectedCareer` changes
    useEffect(() => {
        if (SelectedCareer) {
            console.log("Career Selected:", SelectedCareer);
            localStorage.setItem("SelectedCareer", SelectedCareer);
            localStorage.setItem("SelectedCareerId",SelectedCareerId);

        }
    }, [SelectedCareer]);

    // ✅ Handle career selection
    const handleOnClick = (career,careerId) => {
        setSelectedCareerId(careerId);
        setSelectedCareer(career);
        navigate('/admin/careerfield/update');
    };

    useEffect(()=>{
        console.log("CareerFieldCares:",CareerInField)
    },[CareerInField])

    // ✅ Navigate to Add Career page
    const goToAddCareerPage = () => {
        navigate('/admin/careerfield/add');
    };
    
    const sendCareerFieldToDelete = async (CareerField) => {
        if(!window.confirm(`Do You want to delete this \n This action cannot be undone`)){
            return
        }
        try {
            const response = await axiosInstance.post(
                `${import.meta.env.VITE_APP_URL}/api/v1/admin/career/careerfield/delete`,
                    {CareerField} 
            );

            if (response.status === 200) {
                alert('Career Field deleted successfully');
                navigate('/admin/careerfield')
            } 
        } catch (error) {
            console.log(error)
            alert('An error occurred while deleting the career. Please try again later.');
        }
    };

    return (
        <>

            <div className="login-container career-field-container">
                <div className="career-field-title-container">
                    <h1 className="career-field-title">Choose a Career you want to Update</h1>
                </div>
                <div className="career-field-inner-container career-field-inner-container-02">
                    {CareerInField.length > 0 ? ( 
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
                    )}
                </div>

                <div className="add-career-container">
                    <div className='add-career-btn-container'>
                        <button onClick={goToAddCareerPage} className="add-career-btn">Add Career</button>
                    </div>

                    <div className='add-career-btn-container'>
                        <button onClick={()=>sendCareerFieldToDelete(SelectedField)} className="add-career-btn delete-field-btn"> Delete</button>
                    </div>
                </div>

                
            </div>
        </>
    );
};

export default Career;
