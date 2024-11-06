import './O-Level-Local-MainSubjects.css';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext,useEffect } from 'react';

const OLevelCommonSubjects =[

    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",

]
const OLevelMainLocalSubjects = ()=>{


    const {setshowOLevelBox,setshowOLevelLocalSubj,goToLocalBasket,setshowOLevelBasketSubjects,goToOLevelBox}   = useContext(OLevelContext);



    useEffect(()=>{
        setshowOLevelBox(false);
        setshowOLevelBasketSubjects(false);
        setshowOLevelLocalSubj(true);
        
    })
    return(
        <div className='O-level-subject-component'>
            <h2 className='O-level-subject-box-title'>Select Subjects you have Done</h2>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Common Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {OLevelCommonSubjects.map((subject,index)=>{
                       return <button key={index} className='O-subject-level-btn'>{subject}</button>
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