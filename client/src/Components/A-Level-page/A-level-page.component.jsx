import './A-Level-page.styles.css';
import AdvanceLevelBox from './A-Level-Box/A-Level-box.component';
import ALevelStreamBox from './A-Level-Streams/A-Level-StreamBox';
import ALevelMainLocalSubjects from './A-Level-Subjects/A-Level-Subjects';
import ALevelBasketSubjects from './A-Level-Basket/A-Level-Basket';
import Image from '../Image/Image.components';
import { useState,useEffect,useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';


const AdvanceLevelPage=()=>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext)

    useEffect(()=>{
 
       setVisitedPages((prev)=>({
           ...prev,
           ALevelPage:true,
           OLevelPage:true,
           extraCurricular:true,
           option:true,
           home:true,
           assessment:true
           
 
       }))
   },[])

    const [showALevelBox,setALevelBox] = useState(true);
    const [showALevelStreamBox,setshowALevelStreamBox] = useState(false);
    const [showALevelLocalCommonSubject,setshowALevelLocalCommonSubject] = useState(false);
    const [showALevelBasketSubject,setshowALevelBasketSubject] = useState(false)

    const renderAlevelBox = () =>{
        if(showALevelBox){
            return <AdvanceLevelBox setALevelBox={setALevelBox} setshowALevelStreamBox={setshowALevelStreamBox} />
        }else if(showALevelStreamBox){
            return <ALevelStreamBox setshowALevelStreamBox={setshowALevelStreamBox} setshowALevelLocalCommonSubject={setshowALevelLocalCommonSubject} />
        }else if(showALevelLocalCommonSubject){
            return  <ALevelMainLocalSubjects setshowALevelBasketSubject={setshowALevelBasketSubject} setshowALevelLocalCommonSubject={setshowALevelLocalCommonSubject}/>
        }else if(showALevelBasketSubject){
            return <ALevelBasketSubjects/>
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