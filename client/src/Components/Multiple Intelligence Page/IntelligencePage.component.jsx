import './Intelligence.styles.css';

// Importing necessary dependencies
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useEffect, useContext, useState } from 'react';

const IntelligencePage = () => {
    // Accessing context values
    const { setVisitedPages, intelligenceScore,intelligenceObject } = useContext(ProgressContext);

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

    const IdentifyIntelligence = (value) => {
        switch (value) {
            case 1: return 'Logical-Mathematical';
            case 2: return 'Linguistic';
            case 3: return 'Spatial';
            case 4: return 'Musical';
            case 5: return 'Bodily-Kinesthetic';
            case 6: return 'Interpersonal';
            case 7: return 'Intrapersonal';
            case 8: return 'Naturalistic';
            case 9: return 'Existential';
            default: return 'Unknown';
        }
    };
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
                    {intelligenceObject.map(intelligence => {
                        return (
                        <div className='intelligence-btn tooltip' key={intelligence}>
                            <div className='intelligence'>
                                {`${IdentifyIntelligence(Number(intelligence[0]))} is ${intelligence[1].intelligence_percentage.toFixed(0)}%`}
                            </div>
                            <div className='tooltip-container'>
                                <span className='tooltiptext'>Information about Intelligence</span> 
                            </div>
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
