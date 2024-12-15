import './O-Level-page.css';
import OrdinaryLevelBox from './O-level-Box/O-Level-Box.component';
import OLevelLondStream from './O-Level-Lond-Stream-Box/O-Level-Lond-Stream-Box';
import OLevelSubj from './O-Level-Subject/O-Level-Subj';
import Image from '../Image/Image.components';
import { ProgressContext } from '../../context/progress.context';
import { useEffect,useContext } from 'react';
import { OLevelContext } from '../../context/OLevel.context';
import OLevelResults from './O-Level-Results/O-Level-Results';

const OrdinaryLevelPage= ()=>{  

    const {setVisitedPages} = useContext(ProgressContext);
    const {showOLevelBox,showOLevelLondStream,showOLevelSubj,showOLevelResults}   = useContext(OLevelContext);

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
        }else if(showOLevelResults){
            return <OLevelResults/>
        }
    }
    
    return(
        <div className='O-level-page-container'>
                 <div className='O-Level-frog'>
                    <Image/>
                </div>
                
                    <div className='frog-comment'>
                       <div className='frog-comment-content'>
                            <p>Please select your A-Level status:</p>
                            <p>London O-LevelsWe'll refine career options based on your London O-Level results.
                            Local O-LevelsWe'll adjust suggestions according to your local O-Level results.
                            I Haven’t Done O-Levels We'll rely on your MIP score and other information. </p>
                       </div> 
                    </div>
                    
            {renderOLevelBox()}

        </div>
    )
}

export default OrdinaryLevelPage;