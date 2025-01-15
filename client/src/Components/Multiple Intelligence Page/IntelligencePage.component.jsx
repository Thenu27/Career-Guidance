import './Intelligence.styles.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useEffect,useContext} from 'react';


const IntelligencePage = () =>{
 

    const {setVisitedPages,intelligenceScore} = useContext(ProgressContext);

   
       

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
        console.log('Newly updated',intelligenceScore)

    },[])





  

    const navigate = useNavigate();

    const goToAlevelPage=()=>{
        navigate("/Advancelevelpage")
    }
    const careerSelectionBtnHandler=()=>{
        navigate("/Careers")
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
                {Object.keys(intelligenceScore)
                .sort((a, b) => intelligenceScore[b].Percentage - intelligenceScore[a].Percentage) // Sort keys in descending order
                .map((intelligence) => {
                    return (
                    <div className='intelligence-btn tooltip' key={intelligence}>
                        <p className='intelligence'>
                        {`${intelligence} is ${intelligenceScore[intelligence].Percentage.toFixed()}%`}
                        </p>
                        <span className='tooltiptext'>Information about Intelligence</span>
                    </div>
                    );
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
                <button onClick={goToAlevelPage} className='nextbtn'>Back</button>
                <button className='nextbtn'   onClick={careerSelectionBtnHandler }>Carreer Selection</button>
            </div>
            
        </div>
    )
}

export default IntelligencePage;