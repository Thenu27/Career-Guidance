import './Intelligence.styles.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useEffect,useContext,useState } from 'react';
import axios from 'axios';

const intelligenceList = [
    "Existential Intelligence",
    "Intelligence 2",
    "Intelligence 3",
    "Intelligence 4",
    "Intelligence 5",
    "Intelligence 6",
    "Intelligence 7",
    "Intelligence 8",
    "Naturalistic Intelligence",

]

const IntelligencePage = () =>{



    const [MipScore,setMipScore]=useState(null);
    const {setVisitedPages} = useContext(ProgressContext);
    const [IsLoading,setisLoading] = useState(true)




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



    useEffect(()=>{
        if(MipScore===null){
            console.log("MipScore is ",MipScore )
        }
    },[MipScore])




  

    const navigate = useNavigate();
    const careerSelectionBtnHandler=()=>{
        navigate("/CareerFields")
     }





    
    const getMipScore = async()=>{
        try{
            const response = await axios.get("http://localhost:3000/api/IntelligencePage");
            setMipScore(response.data.MIP);
            setisLoading(false)
            console.log("MIP SCORE:",MipScore)
        }catch(error){
            console.log("Fetching error ",error)
        }
    } 


    


    return(
        <div className='intelligence-page-container'>
            <div className='O-Level-frog'>
                <Image/>
           </div>

           <div className='intelligence-title-container'>
            <h2 className='intelligence-page-title'>Here is Your MIP Score generated from your answers</h2>
             </div>

            <div className='intelligence-box-container'>
                 <div className='intelligence-btns-container'>
                {intelligenceList.map((intelligence)=>{
                    
                    return(
                        
                        <div className='intelligence-btn tooltip'>
                            <p className='intelligence'> {`${intelligence} is ${MipScore}%`} </p>
                             <span class="tooltiptext">Information about Intelligence</span>
                        </div>                        
                    ) 
                    
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
            <div className='intelligence-page-navigation'>
                <button className='nextbtn'>Back</button>
                <button className='nextbtn' onClick={careerSelectionBtnHandler}>Carreer Selection</button>
            </div>
            
        </div>
    )
}

export default IntelligencePage;