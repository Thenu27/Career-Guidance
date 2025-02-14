import './Intelligence.styles.css';

// Importing necessary dependencies
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useEffect, useContext } from 'react';

const IntelligencePage = () => {
    // Accessing context values
    const { setVisitedPages, intelligenceScore } = useContext(ProgressContext);

    // useEffect to update visited pages when the component mounts
    useEffect(() => {
        setVisitedPages(() => ({
            OLevelPage: true,
            ALevelPage: true,
            extraCurricular: true,
            option: true,
            home: true,
            assessment: true,
            CalculatingPage: true,
            IntelligencePage: true,
        }));
        console.log('Newly updated', intelligenceScore); // Log intelligence scores for debugging
    }, []);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to navigate to A-Level Page
    const goToAlevelPage = () => {
        navigate("/Advancelevelpage");
    };

    // Function to navigate to Career Selection Page
    const careerSelectionBtnHandler = () => {
        navigate("/Careers");
    };

    return (
        <div className='intelligence-page-container'>
            {/* Frog Image Section */}
            <div className='O-Level-frog'>
                <Image />
            </div> 

            {/* Page Title */}
            <div className='intelligence-title-container'>
                <h2 className='intelligence-page-title'>Here is Your MIP Score generated from your answers</h2>
            </div>

            {/* Intelligence Scores Display */}
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
                                    <span className='tooltiptext'>Information about Intelligence</span> {/* Tooltip info */}
                                </div>
                            );
                        })}
                </div>
            </div>

            {/* Page Description */}
            <div className='intelligence-page-description'>
                <p>
                    Here is your Multiple Intelligence Profile (MIP) Score, 
                    which reflects your strengths across various intelligence areas. 
                    This score helps us understand which skills and abilities stand out in your profile, 
                    allowing us to provide career recommendations that align with your talents.
                </p>

                {/* Button for Career Selection */}
                <button onClick={careerSelectionBtnHandler} className='career-selection-btn'>Career Selection</button>
                <h2>Click the above button to answer questions so we can give career guidance</h2>
            </div>

            {/* Navigation Buttons */}
            <div className='intelligence-page-navigation'>
                <button onClick={goToAlevelPage} className='nextbtn'>Back</button>
                <button className='nextbtn' onClick={careerSelectionBtnHandler}>Career Selection</button>
            </div>
        </div>
    );
};

export default IntelligencePage;
