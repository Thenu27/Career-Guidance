import './A-Level-page.styles.css';
import AdvanceLevelBox from './A-Level-Box/A-Level-box.component';
import Image from '../Image/Image.components';
import { useState,useEffect,useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { ALevelContext } from '../../context/ALevel.context';
import ALevelSubject from './A-Level-Subject/A-Level-Subject';

const AdvanceLevelPage=()=>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext);
    const {showALevelSubject,showALevelBox} = useContext(ALevelContext);

    useEffect(()=>{
 
       setVisitedPages(()=>({
        home: true,
        assessment: true,
        option:true,
        extraCurricular:true,
        OLevelPage:true,
        ALevelPage:true,
        CalculatingPage:false,
        IntelligencePage:false,
        CareerFieldPage:false,
        CareersPage:false    
           
 
       }))
   },[])

    const renderAlevelBox = () =>{
        if(showALevelBox){
            return <AdvanceLevelBox/>
        }else if(showALevelSubject){
            return <ALevelSubject/>
        }
    }
    return(
        <div className='Advance-level-page'>
            <Image/>
            <div className='frog-comment-A-level-page'>
                <p>Select Option to Chose</p>
            </div>
            {renderAlevelBox()}
            
            <div className='Advance-level-description'>
                <p>Your A-Level results will help us provide more accurate career suggestions. Please select your A-Level status to proceed:
                    London A-Levels If you've completed A-Levels in London, we'll use these results to refine your career options.
                    Local A-Levels If you've completed A-Levels locally, we'll adjust the suggestions accordingly.
                    I Haven’t Done A-Levels If you haven’t completed A-Levels, we'll rely on your MIP score and other information</p>
            </div>

            
        </div>
    )
}

export default AdvanceLevelPage;