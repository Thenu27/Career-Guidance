import './A-Level-page.styles.css';

// Importing necessary components
import AdvanceLevelBox from './A-Level-Box/A-Level-box.component';
import Image from '../Image/Image.components';
import { useEffect, useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { ALevelContext } from '../../context/ALevel.context';
import ALevelSubject from './A-Level-Subject/A-Level-Subject';

const AdvanceLevelPage = () => {
    // Accessing context values
    const { setVisitedPages } = useContext(ProgressContext);
    const { showALevelSubject, showALevelBox } = useContext(ALevelContext);

    // useEffect to update visited pages when the component mounts
    useEffect(() => {
        setVisitedPages(() => ({
            home: true,
            assessment: true,
            option: true,
            extraCurricular: true,
            OLevelPage: true,
            ALevelPage: true,
            CalculatingPage: false,
            IntelligencePage: false,
            CareerFieldPage: false,
            CareersPage: false    
        }));
    }, []);

    // Function to determine which A-Level component to render
    const renderAlevelBox = () => {
        if (showALevelBox) {
            return <AdvanceLevelBox />; // Show A-Level category selection
        } else if (showALevelSubject) {
            return <ALevelSubject />; // Show A-Level subjects selection
        }
    };

    return (
        <div className='O-level-page-container'>
            {/* Frog Image Section */}
            <div className='O-Level-frog'>
                <Image />
            </div>

            {/* Instructional Message */}
            <div className='frog-comment-A-level-page'>
                <p>Select Option to Choose</p>
            </div>

            {/* Render A-Level selection box or subject selection */}
            {renderAlevelBox()}

            {/* Description about A-Level selection process */}
            <div className='Advance-level-description'>
                <p>
                    Your A-Level results will help us provide more accurate career suggestions. Please select your A-Level status to proceed:
                    <br /><br />
                    <strong>London A-Levels:</strong> If you've completed A-Levels in London, we'll use these results to refine your career options.
                    <br /><br />
                    <strong>Local A-Levels:</strong> If you've completed A-Levels locally, we'll adjust the suggestions accordingly.
                    <br /><br />
                    <strong>I Haven’t Done A-Levels:</strong> If you haven’t completed A-Levels, we'll rely on your MIP score and other information.
                </p>
            </div>
        </div>
    );
};

export default AdvanceLevelPage;
