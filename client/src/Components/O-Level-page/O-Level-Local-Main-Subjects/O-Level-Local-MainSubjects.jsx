import './O-Level-Local-MainSubjects.css';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext,useEffect,useState } from 'react';

const OLevelCommonSubjects = [
    "Mathematics",
    "English Language",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
    "Business Studies",
    "Economics",
    "Accounting",
    "Information Technology",
    "Literature in English",
    "Islamic Studies",
    "French"
];

const OLevelMainLocalSubjects = ()=>{


    const {setshowOLevelBox,setshowOLevelLocalSubj,goToLocalBasket,setshowOLevelBasketSubjects,goToOLevelBox,OLevelResultsArray,setOLevelResultsArray}   = useContext(OLevelContext);

    const [selectedButtons,setselectedButtons] = useState([])
 
    const btnSelectHandler = (subject)=>{
        if(selectedButtons.includes(subject)){
            setselectedButtons(selectedButtons.filter(subj=>subj!==subject))
            setOLevelResultsArray(OLevelResultsArray.filter(subj=>subj!==subject))
        }else{
           setselectedButtons([...selectedButtons,subject]);
           setOLevelResultsArray([...OLevelResultsArray,subject]);
        }

        
    }

    useEffect(() => {
        console.log(OLevelResultsArray);
    }, [OLevelResultsArray]);


    useEffect(()=>{
        setshowOLevelBox(false);
        setshowOLevelBasketSubjects(false);
        setshowOLevelLocalSubj(true);
        
    },[])

    useEffect(()=>{
        setOLevelResultsArray([])
      },[])
      
    return(
        <div className='O-level-subject-component'>
            <h2 className='O-level-subject-box-title'>Select Subjects you have Done</h2>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Common Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {OLevelCommonSubjects.map((subject,index)=>{
                       return <button
                       onClick={() => {
                        btnSelectHandler(subject);}}
                                 key={index}   
                                 className={`O-subject-level-btn ${selectedButtons.includes(subject)? "extra-curricular-btn-selected":""}`}>
                                {subject}
                                
                              </button>
                    })} 


                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button onClick={goToOLevelBox} className='backbtn '>Back</button>
                    <button onClick={goToLocalBasket} className='nextbtn '>Next</button>
                </div>
            </div>
        </div>
    )
}

export default OLevelMainLocalSubjects;