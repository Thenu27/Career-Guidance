import './Calculating-page.styles.css';
import Image from '../Image/Image.components';
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import axios from 'axios';

const CalculatingPage = () =>{

    const {setVisitedPages,setintelligenceScore,intelligenceScore} = useContext(ProgressContext);


        
        const getIntelligenceScores = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/api/calculation`); // Backend endpoint
                setintelligenceScore(response.data);
            } catch (err) {
                console.error('Error fetching intelligence scores:', err);
            }
        };    
        // useEffect to call the function when the component loads
        useEffect(() => {
            getIntelligenceScores();
        }, []); 
    
        
        useEffect(()=>{
            console.log('Frontend received:', intelligenceScore); // Log the data

        },[intelligenceScore])



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
 
       }));

       
   },[])




    const navigate = useNavigate();

   useEffect(()=>{
    const timer = setTimeout(()=>{
        navigate("/IntelligencePage");
    },2000);

    return ()=>{
        clearTimeout(timer);
    }
   },[navigate]);






    return(
        <div className='calculating-page-container'>
            <div className='calculating-frog'>
                <Image/>
            </div>
            <div className='calculating-title-container'>
                <h1 className='calculating-title'>Calculating Multiple Intelligence Score</h1>
            </div>
        </div>
    )
}

export default CalculatingPage;