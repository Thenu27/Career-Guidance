import './O-Level-page.css';
import OrdinaryLevelBox from './O-level-Box/O-Level-Box.component';
import OLevelMainLocalSubjects from './O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import OLevelBasketLocal from './O-Level-Basket-Local/O-Level-Bakset-Local';
import Image from '../Image/Image.components';

import { useState} from 'react';

const OrdinaryLevelPage= ()=>{  

    const [showOLevelBox,setshowOLevelBox] = useState(true);
    const [showOLevelSubjectsLocal,setshowOLevelSubjectsLocal] = useState(false);
    const [showBasketSubjects,setshowBasketSubjects] = useState(false);
    
    const renderOLevelBox=()=>{
        if(showOLevelBox){
           return <OrdinaryLevelBox setshowOLevelBox={setshowOLevelBox} setshowOLevelSubjectsLocal={setshowOLevelSubjectsLocal} />
        }else if(showOLevelSubjectsLocal){
            return <OLevelMainLocalSubjects setshowOLevelSubjectsLocal={setshowOLevelSubjectsLocal} setshowBasketSubjects={setshowBasketSubjects}/>
        }else if(showBasketSubjects){
           return <OLevelBasketLocal/>
        }
    }
    return(
        <div className='O-level-page-container'>
            <div className='frog-img-comment-container'>
                <Image/>
                
                    <div className='frog-comment'>
                        <p>Please select your A-Level status:</p>
                        <p>London O-LevelsWe'll refine career options based on your London O-Level results.
                        Local O-LevelsWe'll adjust suggestions according to your local O-Level results.
                        I Haven’t Done O-LevelsWe'll rely on your MIP score and other information. </p>
                    </div>
            </div>
            {renderOLevelBox()}

        </div>
    )
}

export default OrdinaryLevelPage;