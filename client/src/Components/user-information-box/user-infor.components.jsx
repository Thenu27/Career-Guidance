import { useState } from 'react';
import './user-infor.styles.css';

const districtList =[
    "Gampaha",
    "kalutara",
    "Galle"
]

const EducationList =[
    "School",
    "Ordinary-Level",
    "Advanced-Level",
    "University"
]

const UserInformation = ()=>{

    const [District,setDistrict]=useState("District");
    const [Education,setEducation]=useState("Education Level")

    const DistrictHandler = (value)=>{
        setDistrict(value);
    }

    const EducationHandler=(value)=>{
        setEducation(value)
    }
    return(
        <div className='dropdown-container'> 
            <label className="dropdown">

                <div className="dd-button">
                         {District}
                </div>

                <input type="checkbox" className="dd-input" id="test"/>

                <ul className="dd-menu">

                    {districtList.map((district,index)=>{
                       return  <li key={index} onClick={()=>DistrictHandler(`${district}`)}>{district}</li>
                    })}
               
                </ul>

             </label>       
                    <input className='age-input' type="number" min="0" max="120" placeholder="Enter age" /> 
                 

              <label className="dropdown">

                        <div className="dd-button">
                                { Education } 
                        </div>

                        <input type="checkbox" class="dd-input" id="test"/>

                        <ul className="dd-menu">
                                {EducationList.map((education,index)=>{
                                    return  <li key={index} onClick={()=>EducationHandler(education)}>{education}</li>
                    })}
                        </ul>

              </label>      

                              

        </div>
    )
}

export default UserInformation;