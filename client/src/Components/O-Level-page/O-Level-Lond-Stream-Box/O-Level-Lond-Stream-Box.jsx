import { OLevelContext } from '../../../context/OLevel.context';
import './O-Level-Lond-Stream-Box.css';
import {useContext, useEffect } from 'react';

const OLevelLondStream = ()=>{

    const {setshowOLevelLondStream,setshowOLevelBox,goToOLevelBox} = useContext(OLevelContext);

    useEffect(()=>{
        setshowOLevelLondStream(true);
        setshowOLevelBox(false)
    })

    return(
        <>
        <div className='O-level-London-Category-title-container'>     
                <h2 className='O-level-box-title'>Select London Stream Category from the following</h2>
         </div> 
        <div className='O-level-box'>
  
            <div className='O-level-btn-container'>
            <h2 className='O-level-sub-title'>London Stream Category</h2>

                <button  className='O-level-btn'>Cambridge</button>
                <button  className='O-level-btn'>Pearson</button>
            </div>
            <div className='O-level-box-back-btn'>
                <button onClick={goToOLevelBox} className='nextbtn'>Back</button>
            </div>
            
        </div>
        </>
    )
}

export default OLevelLondStream;