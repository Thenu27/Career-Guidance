import './CareerPage.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useEffect,useContext} from 'react';
import { ProgressContext } from '../../context/progress.context';

const CareerPage=()=>{

    const {setVisitedPages} = useContext(ProgressContext) 

    useEffect(()=>{
        setVisitedPages(()=>({
            home: true,
            assessment: true,
            option:true,
            extraCurricular:true,
            OLevelPage:true,
            ALevelPage:true,
            CalculatingPage:true,
            IntelligencePage:true,
            CareerFieldPage:true,
            CareersPage:true   
        }));
        })
    

    const navigate = useNavigate();

    const goToSendResultPage=()=>{
        navigate("/SendResults")
    }

    const careerOpenBtnHandler=()=>{
        window.open("http://localhost:3000/","_blank")
    }

    return(
        <div className='career-page'>
            <div className='career-field-box-title-container career-page-title'>
                  <h2 className='career-field-box-title'>Congratulations! Based on your MIP Score,we’ve curated careers that align with your strengths.</h2> 
            </div>

            <div className='career-box-container'>

                <div className='career-box'>
                    <h2 className='career-type'>Top Career</h2>
                    <div className='chosen-career-box'>
                        <button onClick={careerOpenBtnHandler}>Career 1</button>
                        <button>Career 2</button>
                        <button>Career 3</button>
                    </div>
                </div>
                <div className='career-box'>
                <div className='chosen-career-box'>
                        <button>Career 1</button>
                        <button>Career 2</button>
                        <button>Career 3</button>
                    </div>
                    <h2 className='career-type'>Moderate Career</h2>
 
                </div>
                <div className='career-box'>
                    <h2 className='career-type'>Satisfactory Career</h2>
                    <div className='chosen-career-box'>
                        <button>Career 1</button>
                        <button>Career 2</button>
                        <button>Career 3</button>
                    </div>
                </div>

            </div>

            <div className='career-fieldBox-navigation career-page-navigation'>
                    <button className='nextbtn '>Back</button>
                    <button onClick={ goToSendResultPage} className='nextbtn '>Send Results</button>
                </div>
                               

                <div className='career-page-frog'>
                 <Image/>
                </div>
            </div>

    )
}

export default CareerPage;