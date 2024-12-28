import './O-Level-Box.styles.css';
import { useNavigate } from 'react-router-dom';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext, useEffect } from 'react';

const OrdinaryLevelBox = () =>{

    const {goToLocalCommonSubjects,goToLondonStreamBox,setshowOLevelBox,setshowOLevelLondStream,setshowOLevelSubj} = useContext(OLevelContext);

    const navigate = useNavigate();

    const HaventDoneBtnHandler=()=>{
        navigate("/Advancelevelpage")
    }

    const goToActivities=()=>{
        navigate("/ExtraCurricular");
        
    }

    useEffect(()=>{
        setshowOLevelBox(true);
        setshowOLevelLondStream(false);
        setshowOLevelSubj(false)
    })
   
    return(
        <>
         <div className='O-level-box-title-container'>
            <h2 className='O-level-box-title'>Select Ordinary Level Category You did from the following</h2>
          </div>   

        <div className='O-level-box'>

            <div className='O-level-btn-container'>

                <button onClick={goToLocalCommonSubjects} className='O-level-btn'>Local</button>
                <button onClick={goToLondonStreamBox} className='O-level-btn'>London</button>
                <button onClick={HaventDoneBtnHandler} className='O-level-btn'>Havent Done</button>
                

            </div>
            
            <div className='O-level-box-back-btn'>
                <button onClick={()=>{goToActivities()}} className='nextbtn'>Back</button>
            </div>
        </div>
        </>
    )
}

export default OrdinaryLevelBox;