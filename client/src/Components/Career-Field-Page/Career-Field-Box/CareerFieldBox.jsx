import './CareerFieldBox.css';
import { useState } from 'react';
import CareerDropdownContainer from '../Career-Dropdown-Container/CareerDropdown';

const CareerFieldsBtnList = [
    "Engineering",
    "Healthcare",
    "Education",
    "Business and Finance",
    "Information Technology",
    "Law and Public Policy",
    "Arts and Design",
    "Science and Research"
];


const CareerFieldBox = ({setShowCareerDropdown,setshowCareerFieldBox,setshowMatchedProfileMsg}) =>{

    const[selectedBtn,setselectedbtn] = useState([])
   
  const CareerFieldSubmitBtnHandler=()=>{
    setShowCareerDropdown(true);
    setshowCareerFieldBox(false);
    setshowMatchedProfileMsg(false);
  }

  const btnHandler=(career)=>{
    if(selectedBtn.includes(career)){
        setselectedbtn(selectedBtn.filter((careerbtn)=>careerbtn!==career))
    }else{
        setselectedbtn([...selectedBtn,career]);
    }
  }
  
    return(
        <div>
            <h2 className='career-field-box-title'>Select 3 Career Field That You Like</h2>
            <div className='career-field-box-container'>
                <div className='career-btn-container'>
                    {CareerFieldsBtnList.map(career=>{
                        return <button disabled={!selectedBtn.includes(career) && selectedBtn.length>=3} onClick={()=>{btnHandler(career)}} className={`career-btn ${selectedBtn.includes(career)?"extra-curricular-btn-selected":""}`}>{career}</button>
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

export default CareerFieldBox;