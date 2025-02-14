import { useContext, useEffect, useState } from 'react';
import './Career.css';
import axios from 'axios';
import { CareerContext } from '../../../Context/Career.context';
import { useNavigate } from 'react-router-dom';


const Career=()=>{

    const navigate=useNavigate(); 
    
    const {setSelectedField,SelectedField,setSelectedCareerDetails,SelectedCareer,setSelectedCareer}=useContext(CareerContext);
    const [CareerInField,setCareerInField] = useState([]);

    const fetchCareers=async()=>{
        try{
            const response =await axios.post('/api/admin/career',{
                SelectedField
            });
            setCareerInField(response.data)
        }catch(error){
            console.log("Error when fetching careers",error)
        }

    }


    useEffect(()=>{
        fetchCareers();

    },[SelectedField])

    useEffect(()=>{
        setSelectedField(localStorage.getItem('SelectedField'))
    },[])


    useEffect(()=>{
        console.log("Career",SelectedCareer)
    },[SelectedCareer])


    const handleOnClick=(career)=>{
        setSelectedCareer(career);
        navigate('/admin/careerfield/update')
    }
    const goToAddCareerPage=()=>{
        navigate('/admin/careerfield/add')
    }

    useEffect(()=>{
        localStorage.setItem("SelectedCareer", SelectedCareer);
    },[SelectedCareer])


    return(
        <>
        <div className='career-field-title-container'>
            <h1 className='career-field-title'>Choose a Career you want to Update</h1>
        </div>
        <div className='career-field-container'>
            <div className='career-field-inner-container career-field-inner-container-02'>
                {CareerInField.map(career=>{
                  return <button onClick={() => {
                    handleOnClick(career.career);
                    
                }}
                  className='login-btn career-field-btn'>{career.career}</button>  
                })}
            </div>
            <div className='add-career-container'>
                <button onClick={goToAddCareerPage} className='add-career-btn'>Add Career</button>
            </div>
        </div>
        </>
    )


    
}

export default Career