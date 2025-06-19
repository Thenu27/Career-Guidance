import { useContext, useEffect, useState } from 'react';
import './CareerField.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CareerContext } from '../../../Context/Career.context';
import axiosInstance from '../../AxiosInstance/axiosInstance';

const CareerField =()=>{

    const [CareerField,setCareerField] =useState([]);
    const {SelectedField,setSelectedField} = useContext(CareerContext)

    const navigate =useNavigate();

    const fetchCareerField=async()=>{
        try{
            const response = await axiosInstance.get('/api/v1/admin/career/careerfield');
            console.log(response.data);
            setCareerField(response.data);
        }catch(error){
            console.log("Error when Fetching Career Fields from Backend",error)
        }
    }

    const goToIndividualCareerPage=()=>{
        navigate('/admin/careerfield/career')
    }

    const handleField=(field)=>{
        setSelectedField(field);
    }

    useEffect(()=>{
        console.log("SelectedField:",SelectedField);
    },[SelectedField])
    useEffect(()=>{
        fetchCareerField();
    },[])

    const goToAddCareerField=()=>{
        navigate('/admin/careerfield/career-field-add')
    }
    


    useEffect(()=>{
        localStorage.setItem('SelectedField',SelectedField)
    },[SelectedField])

 
    return(
        <>
        <div className='login-container career-field-container'>
        <div className='career-field-title-container'>
            <h1 className='career-field-title'>Choose a Career Field</h1>
        </div>
            <div className='career-field-inner-container'>
                {CareerField.map((careerfield)=>{
                    return <button key={careerfield.id} onClick={()=>{goToIndividualCareerPage();handleField(careerfield.id)}} className='login-btn career-field-btn'>{careerfield.field_name}</button>
                })}

      
            </div>
            <div className='career-field-add'>
            <button onClick={goToAddCareerField} className='login-btn add-question-btn'>Add Career Field</button>
        </div>  
        </div>


        
        </>

    )
}

export default CareerField