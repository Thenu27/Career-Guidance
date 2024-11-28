import './ALevelLocalCommerce.css';

import { useContext,useState } from "react";
import { ALevelContext } from "../../../context/ALevel.context";

const ALCommerceSubjects = [
    "Accounting",
    "Business Studies",
    "Economics",
    "Entrepreneurship",
    "Commerce",
    "Statistics",
    "Business Law",
    "Marketing",
    "Finance",
    "Management",
    "Banking",
    "Cost Accounting",
    "Taxation",
    "Insurance"
];



const ALevelLocalCommerceSubject = ()=>{

    const {goToStreams} = useContext(ALevelContext)

    const [selectedSubject,setselectedSubject] = useState([]);

    const btnHandler =(subject)=>{
        if(selectedSubject.includes(subject)){
            setselectedSubject(selectedSubject.filter((subj)=>subj!==subject))
        }else {
            setselectedSubject([...selectedSubject,subject])
        }
    }

    return(
             <>
               <div className='O-level-box-title-container'>
                   <h2 className='O-level-subject-box-title'>Select A LevelCommerce Subjects you have Done</h2>
               </div>
               <div className='O-level-subject-component'>

            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Commerce Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {ALCommerceSubjects.map((subject,index)=>{
                       return <button key={index} onClick={()=>{btnHandler(subject)}} className={`O-subject-level-btn ${selectedSubject.includes(subject)? "extra-curricular-btn-selected":""}`}>{subject}</button>
                    })}


                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button onClick={goToStreams} className='nextbtn '>Back</button>
                    <button  className='nextbtn '>Next</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default ALevelLocalCommerceSubject;