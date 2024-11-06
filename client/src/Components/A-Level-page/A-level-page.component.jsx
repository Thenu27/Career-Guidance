import './A-Level-page.styles.css';
import AdvanceLevelBox from './A-Level-Box/A-Level-box.component';
import ALevelStreamBox from './A-Level-Streams/A-Level-StreamBox';
import ALevelMainLocalSubjects from './A-Level-Subjects/A-Level-Subjects';
import ALevelBasketSubjects from './A-Level-Basket/A-Level-Basket';
import Image from '../Image/Image.components';
import { useState,useEffect,useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { ALevelContext } from '../../context/ALevel.context';


const AdvanceLevelPage=()=>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext);
    const {showALevelBox,
        showALevelStreamBox,
        showALevelLocalCommonSubject,
        showALevelBasketSubject
    } = useContext(ALevelContext);

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
        // if(showALevelBox){
        //     return <AdvanceLevelBox/>
        // }else if(showALevelStreamBox){
        //     return <ALevelStreamBox/>
        // }else if(showALevelLocalCommonSubject){
        //     return  <ALevelMainLocalSubjects/>
        // }else if(showALevelBasketSubject){
        //     return <ALevelBasketSubjects/>
        // }

        if(showALevelBox){
            return <AdvanceLevelBox/>
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