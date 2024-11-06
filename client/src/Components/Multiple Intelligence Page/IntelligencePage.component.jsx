import './Intelligence.styles.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useEffect,useContext,useState } from 'react';
import axios from 'axios';

const intelligenceList = [
    "Intelligence 1",
    "Intelligence 2",
    "Intelligence 3",
    "Intelligence 4",
    "Intelligence 5",
    "Intelligence 6",
    "Intelligence 7",
    "Intelligence 8",
    "Intelligence 9",

]

const IntelligencePage = () =>{
    const [MipScore,setMipScore]=useState(null);
    const {setVisitedPages} = useContext(ProgressContext);

    useEffect(()=>{

        setVisitedPages(()=>({
            OLevelPage:true,
            ALevelPage:true,
            extraCurricular:true,
            option:true,
            home:true,
            assessment:true,
            CalculatingPage:true,
            IntelligencePage:true,
            
  
        }));

        getMipScore();
    },[])
  

    const navigate = useNavigate();
     const careerSelectionBtnHandler=()=>{
        navigate("/CareerFields")
     }
    
    const getMipScore = async()=>{
        try{
            const response = await axios.get("http://localhost:3000/IntelligencePage");
            setMipScore(response.data.MIP);
            console.log("MIP SCORE:",MipScore)
            return MipScore;
        }catch(error){
            console.log("Fetching error ",error)
        }
    } 
    


    return(
        <div className='intelligence-page-container'>
            <Image/>
            <div className='intelligence-box'>
                <h2 className='intelligence-box-container-title'>Your Multiple Intelligence Score</h2>
                 <div className='intelligence-btns-container'>
                {intelligenceList.map((intelligence)=>{
                    
                    return <button className='intelligence-btn'>{intelligence}{<p>{MipScore}</p>}</button>
                    
                })}
                </div>
            </div>
            <div className='intelligence-page-description'>
                <p>Here is your Multiple Intelligence Profile (MIP) Score, 
                  which reflects your strengths across various intelligence areas. 
                  This score helps us understand which skills and abilities stand out in your profile, 
                  allowing us to provide career recommendations that align with your talents.</p>
                  <button onClick={careerSelectionBtnHandler} className='career-selection-btn'>Career Selection</button>
                  <h2>Click the above button to answer questions so we can give career guidance</h2>
            </div>
            
        </div>
    )
}

export default IntelligencePage;