import './A-Level-Local-Science-Subject.css';

import { useContext,useState } from "react";
import { ALevelContext } from "../../../context/ALevel.context";

const ALScienceSubjects = [
    "Biology",
    "Chemistry",
    "Physics",
    "Environmental Science",
    "Geology",
    "Marine Science",
    "Computer Science",
    "Human Biology",
    "Psychology",
    "Astronomy",
    "Biochemistry",
    "Forensic Science",
    "Engineering Science",
    "Earth and Planetary Sciences"
];


const ALevelLocalScienceSubject = ()=>{

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
        <div>
             <>
            <h2 className='O-level-subject-box-title'>Select A Level Science Subjects you have Done</h2>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Science Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {ALScienceSubjects.map((subject,index)=>{
                       return <button key={index} onClick={()=>{btnHandler(subject)}} className={`O-subject-level-btn ${selectedSubject.includes(subject)? "extra-curricular-btn-selected":""}`}>{subject}</button>
                    })}


                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button onClick={goToStreams} className='backbtn '>Back</button>
                    <button  className='nextbtn '>Next</button>
                </div>
            </div>
        </>
        </div>
    )
}

export default ALevelLocalScienceSubject;