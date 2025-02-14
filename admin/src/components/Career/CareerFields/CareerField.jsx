import { useContext, useEffect, useState } from 'react';
import './CareerField.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CareerContext } from '../../../Context/Career.context';

const CareerField =()=>{

    const [CareerField,setCareerField] =useState([]);
    const {SelectedField,setSelectedField} = useContext(CareerContext)

    const navigate =useNavigate();

    const fetchCareerField=async()=>{
        try{
            const response = await axios.get('/api/admin/careerfield');
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
        fetchCareerField();
    },[])

    

    useEffect(()=>{
        localStorage.setItem('SelectedField',SelectedField)
    },[SelectedField])

 
    return(
        <>
        <div className='career-field-title-container'>
            <h1 className='career-field-title'>Choose a Career Field</h1>
        </div>
        <div className='career-field-container'>
            <div className='career-field-inner-container'>
                {CareerField.map((career)=>{
                    return <button key={career.field} onClick={()=>{goToIndividualCareerPage();handleField(career.field)}} className='login-btn career-field-btn'>{career.field}</button>
                })}
            </div>
        </div>
        </>

    )
}

export default CareerField