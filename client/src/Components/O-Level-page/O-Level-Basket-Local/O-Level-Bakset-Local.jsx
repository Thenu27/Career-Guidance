import './O-Level-Basket-Local.css';
import { useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';


const OLevelLocalBasketSubjects = [
    "Art and Design",
    "Business Studies",
    "Computer Science",
    "Environmental Management",
    "Food and Nutrition",
    "Accounting",
    "Economics",
    "Physical Education",
    "French",
    "Spanish",
    "Geography",
    "History",
    "Religious Studies",
    "Travel and Tourism",
    "Psychology"
]

const OLevelBasketLocal =()=>{

    
    const [selectedButtons,setselectedButtons] = useState([])

    const {OLevelResultsArray,setOLevelResultsArray} = useContext(OLevelContext);
 
    const btnSelectHandler = (subject)=>{
        if(selectedButtons.includes(subject)){
            setselectedButtons(selectedButtons.filter(subj=>subj!==subject));
            setOLevelResultsArray(OLevelResultsArray.filter(subj=>subj!==subject))
        }else{
           setselectedButtons([...selectedButtons,subject]);
           setOLevelResultsArray([...OLevelResultsArray,subject]);

        }
    }

    const {goToLocalCommonSubjects, goToOLevelResults} = useContext(OLevelContext);
    const navigate = useNavigate();

    const goToALevelPage = ()=>{
        navigate("/Advancelevelpage")
    }

    return(
        <>  
        <div className='O-level-box-title-container'>
            <h2 className='O-level-box-title'>Select Basket Subjects you have Done from the following</h2>
        </div>
        <div className='O-level-subject-component'>

            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Basket Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {OLevelLocalBasketSubjects.map((subject,index)=>{
                    return <button onClick={()=>btnSelectHandler(subject)} key={index} className={`O-subject-level-btn ${selectedButtons.includes(subject)? "OL-subject-btn-selected":""}`}>{subject}</button>
                    })}

                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button onClick={goToLocalCommonSubjects}  className='nextbtn '>Back</button>
                    <button onClick={ goToOLevelResults} className='nextbtn '>Next</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default OLevelBasketLocal;