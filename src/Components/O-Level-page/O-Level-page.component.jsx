import './O-Level-page.css';
import OrdinaryLevelBox from './O-Level-Box.component';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';

const OrdinaryLevelPage= ()=>{  

    
    return(
        <div className='O-level-page-container'>
            <div className='frog-img-comment-container'>
                <Image/>
                
                    <div className='frog-comment'>
                        <p>Please select your A-Level status:</p>
                        <p>London O-LevelsWe'll refine career options based on your London O-Level results.
                        Local O-LevelsWe'll adjust suggestions according to your local O-Level results.
                        I Haven’t Done O-LevelsWe'll rely on your MIP score and other information. </p>
                    </div>
            </div>
            <OrdinaryLevelBox/>

        </div>
    )
}

export default OrdinaryLevelPage;