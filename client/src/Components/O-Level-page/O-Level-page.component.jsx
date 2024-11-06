import './O-Level-page.css';
import OrdinaryLevelBox from './O-level-Box/O-Level-Box.component';
import OLevelLondStream from './O-Level-Lond-Stream-Box/O-Level-Lond-Stream-Box';
import OLevelSubj from './O-Level-Subject/O-Level-Subj';
import Image from '../Image/Image.components';
import { ProgressContext } from '../../context/progress.context';
import { useEffect,useContext } from 'react';
import { OLevelContext } from '../../context/OLevel.context';

const OrdinaryLevelPage= ()=>{  

    const {setVisitedPages} = useContext(ProgressContext);
    const {showOLevelBox,showOLevelLondStream,showOLevelSubj} = useContext(OLevelContext);

   useEffect(()=>{

      setVisitedPages(()=>({
        home: true,
        assessment: true,
        option:true,
        extraCurricular:true,
        OLevelPage:true,
        ALevelPage:false,
        CalculatingPage:false,
        IntelligencePage:false,
        CareerFieldPage:false,
        CareersPage:false    

      }))
  },[])
    
    const renderOLevelBox=()=>{
        if(showOLevelBox){
           return <OrdinaryLevelBox/>
        }else if(showOLevelSubj){
           return <OLevelSubj/>;
        }else if(showOLevelLondStream){
            return <OLevelLondStream/>
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