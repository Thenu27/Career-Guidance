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
        <div className='O-level-box'>

            <h2 className='O-level-box-title'>Select London Stream Category</h2>

            <div className='O-level-btn-container'>

                <button  className='O-level-btn'>Cambridge</button>
                <button  className='O-level-btn'>Pearson</button>
                <button  onClick={goToOLevelBox} className='backbtn'>Back</button>

            </div>
        </div>
    )
}

export default OLevelLondStream;