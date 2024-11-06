import './O-Level-Box.styles.css';
import { useNavigate } from 'react-router-dom';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext, useEffect } from 'react';

const OrdinaryLevelBox = () =>{

    const {goToLocalCommonSubjects,goToLondonStreamBox,setshowOLevelBox,setshowOLevelBasketSubjects,setshowOLevelLondStream,setshowOLevelSubj} = useContext(OLevelContext);

    const navigate = useNavigate();

    const HaventDoneBtnHandler=()=>{
        navigate("/Advancelevelpage")
    }

    useEffect(()=>{
        setshowOLevelBox(true);
        setshowOLevelBasketSubjects(false);
        setshowOLevelLondStream(false);
        setshowOLevelSubj(false)
    })
   
    return(
        <div className='O-level-box'>

            <h2 className='O-level-box-title'>Select Ordinary Level Category</h2>

            <div className='O-level-btn-container'>

                <button onClick={goToLocalCommonSubjects} className='O-level-btn'>Local</button>
                <button onClick={goToLondonStreamBox} className='O-level-btn'>London</button>
                <button onClick={HaventDoneBtnHandler} className='O-level-btn'>Havent Done</button>
                <button  className='backbtn'>Back</button>

            </div>
        </div>
    )
}

export default OrdinaryLevelBox;