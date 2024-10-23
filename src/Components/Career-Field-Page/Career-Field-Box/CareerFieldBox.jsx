import './CareerFieldBox.css';
import { useState } from 'react';
import CareerDropdownContainer from '../Career-Dropdown-Container/CareerDropdown';

const CareerFieldsBtnList = [
    "Career 1",
    "Career 2",
    "Career 3",
    "Career 4",
    "Career 5",
    "Career 6",
    "Career 7",
    "Career 8",
]

const CareerFieldBox = () =>{
 
  const [showCareerDropdown,setshowCareerDropdown]= useState(false);
  
  const CareerFieldSubmitBtnHandler=()=>{
    setshowCareerDropdown(true)
  }
  if(!showCareerDropdown){
    return(
        <div>
            <h2 className='career-field-box-title'>Select 3 Career Field That You Like</h2>
            <div className='career-field-box-container'>
                <div className='career-btn-container'>
                    {CareerFieldsBtnList.map(career=>{
                        return <button className='career-btn'>{career}</button>
                    })}
                </div>
                <div className='careerFieldBtn'>
                    <button className='backbtn '>Back</button>
                    <button onClick={CareerFieldSubmitBtnHandler} className='nextbtn '>Next</button>
                </div>
            </div>
        </div>
    )
 }
else{
 return <CareerDropdownContainer/>
}
}

export default CareerFieldBox;