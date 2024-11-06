import './Calculating-page.styles.css';
import Image from '../Image/Image.components';
import { useEffect,useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';

const CalculatingPage = () =>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext)

    useEffect(()=>{
 
       setVisitedPages(()=>({
        home: true,
        assessment: true,
        option:true,
        extraCurricular:true,
        OLevelPage:true,
        ALevelPage:true,
        CalculatingPage:true,
        IntelligencePage:false,
        CareerFieldPage:false,
        CareersPage:false   
 
       }))
   },[])

    const navigate = useNavigate();

   useEffect(()=>{
    const timer = setTimeout(()=>{
        navigate("/IntelligencePage");
    },2000);

    return ()=>{
        clearTimeout(timer);
    }
   },[navigate])

    return(
        <div className='calculationPage-container'>
            <Image/>
            <div className='Calculating-box-container'>
                <h1 className='calculating-title'>Calculating Multiple Intelligence score</h1>
            </div>
        </div>
    )
}

export default CalculatingPage;