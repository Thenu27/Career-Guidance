import './Option.components.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';

const Option = () =>{
    const navigate = useNavigate();
    const ImprovebtnHandler = ()=>{
        navigate("/ExtraCurricular");
    }
    return(
       <div className='option-page'>
            <div className='option-container'>
                <h2>Enhance Your MIP Score</h2>
                <p>You’ve completed the initial set of questions! Your current MIP score is ready,
                    but you have the option to improve your result by answering a few additional questions.</p>
                <p>Improve Your Score: By answering a few more questions, you can get a more refined result and better career recommendations.
                Skip for Now: You can also choose to proceed without answering more questions.
                    Your current MIP score will be used to suggest suitable careers.</p>     
                <button className='skip-btn'>Skip</button>
                <button  onClick={ImprovebtnHandler} className='imporve-btn'>Improve</button>
                
            </div>
            <Image/>
        </div>  
    )
}

export default Option;