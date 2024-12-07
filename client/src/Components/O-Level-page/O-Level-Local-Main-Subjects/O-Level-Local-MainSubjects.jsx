import './O-Level-Local-MainSubjects.css';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext,useEffect,useState } from 'react';
import OLevelResults from '../O-Level-Results/O-Level-Results';


const OLevelMainLocalSubjects = ({OLevelLocalCoreSubj})=>{


    const {setshowOLevelBox,setshowOLevelLocalSubj,goToLocalBasket,setshowOLevelBasketSubjects,goToOLevelBox,setOLevelResultsArray,OLevelResultsArray}   = useContext(OLevelContext);

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
        console.log(OLevelLocalCoreSubj);
    }, [OLevelLocalCoreSubj]);






    useEffect(()=>{
        setshowOLevelBox(false);
        setshowOLevelBasketSubjects(false);
        setshowOLevelLocalSubj(true);
        
    },[])






      
      
    return(
        <>
        <div className='O-level-box-title-container'>
           <h2 className='O-level-box-title'>Select the Common Subjects you have Done from the following</h2>
        </div>

        <div className='O-level-subject-component'>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Common Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {OLevelLocalCoreSubj.map((subject,index)=>{
                       return <button
                       onClick={() => {
                        btnSelectHandler(subject.subjects);}}
                                 key={index}   
                                 className={`O-subject-level-btn ${selectedButtons.includes(subject.subjects)? "OL-subject-btn-selected":""}`}>
                                {subject.subjects}
                                
                              </button>
                    })} 


                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button onClick={goToOLevelBox} className='nextbtn'>Back</button>
                    <button onClick={goToLocalBasket} className='nextbtn '>Next</button>
                </div>
            </div>
            </div>
            </>
    )
}

export default OLevelMainLocalSubjects;