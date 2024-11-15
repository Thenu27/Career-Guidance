import './Option.components.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useContext,useEffect } from 'react';
const Option = () =>{

    const {setVisitedPages,vistedPages} = useContext(ProgressContext);

    useEffect(()=>{
        
        setVisitedPages(()=>({
            home: true,
            assessment: true,
            option:true,
            extraCurricular:false,
            OLevelPage:false,
            ALevelPage:false,
            CalculatingPage:false,
            IntelligencePage:false,
            CareerFieldPage:false,
            CareersPage:false
            
        }))        
    },[])

    const navigate = useNavigate();
    const ImprovebtnHandler = ()=>{
        navigate("/ExtraCurricular");
    }
    return(
       <div className='option-page'>
            <div className='option-container'>
                <div className='option-container-content'>
                    <h2>Enhance Your MIP Score</h2>
                    <p>You’ve completed the initial set of questions! Your current MIP score is ready,
                        but you have the option to improve your result by answering a few additional questions.</p>
                    <p>Improve Your Score: By answering a few more questions, you can get a more refined result and better career recommendations.
                    Skip for Now: You can also choose to proceed without answering more questions.
                        Your current MIP score will be used to suggest suitable careers.</p>     
                    <div className='option-btn-container'>   
                        <button className='backbtn'>Skip</button>
                        <button  onClick={ImprovebtnHandler} className='backbtn'>Improve</button>
                    </div> 
                </div>
            </div>
            <Image/>
        </div>  
    )
}

export default Option;