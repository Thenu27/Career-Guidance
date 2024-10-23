import './Calculating-page.styles.css';
import Image from '../Image/Image.components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatingPage = () =>{

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
                <h1>Calculating Multiple Intelligence Sscore</h1>
            </div>
        </div>
    )
}

export default CalculatingPage;