import './A-Level-page.styles.css';
import AdvanceLevelBox from './A-Level-box.component';
import Image from '../Image/Image.components';

const AdvanceLevelPage=()=>{
    return(
        <div className='Advance-level-page'>
            <Image/>
            <div className='frog-comment-A-level-page'>
                <p>Select Option to Chose</p>
            </div>
            <AdvanceLevelBox/>
            <div className='Advance-level-description'>
                <p>Your A-Level results will help us provide more accurate career suggestions. Please select your A-Level status to proceed:
                    London A-Levels If you've completed A-Levels in London, we'll use these results to refine your career options.
                    Local A-Levels If you've completed A-Levels locally, we'll adjust the suggestions accordingly.
                    I Haven’t Done A-Levels If you haven’t completed A-Levels, we'll rely on your MIP score and other information</p>
            </div>
        </div>
    )
}

export default AdvanceLevelPage;