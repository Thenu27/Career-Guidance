import './Option.components.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
import { useContext, useEffect } from 'react';

const Option = () => {
    // Access the ProgressContext to update visited pages
    const { setVisitedPages } = useContext(ProgressContext);

    useEffect(() => {
        // Set the visited pages state when the component mounts
        setVisitedPages(() => ({
            home: true,
            assessment: true,
            option: true,
            extraCurricular: false,
            OLevelPage: false,
            ALevelPage: false,
            CalculatingPage: false,
            IntelligencePage: false,
            CareerFieldPage: false,
            CareersPage: false,
        }));
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Initialize the navigation hook
    const navigate = useNavigate();

    // Handler for the "Improve" button
    const ImprovebtnHandler = () => {
        navigate("/ExtraCurricular"); // Navigate to the ExtraCurricular page
    };

    // Handler for the "Skip" button where it goes to the calculation page
    const goToCalculatePage=()=>{
        navigate("/CalculatePage")
    }

    return (
        <div className="option-page">
            {/* Section for displaying the image */}
            <div className="option-page-image">
                <Image />
            </div>

            {/* Section for the page title */}
            <div className="option-page-title">
                <h2>Enhance Your MIP Score</h2>
            </div>

            {/* Main container for the option content */}
            <div className="option-container">
                <div className="option-content">
                    {/* Instructions and information */}
                    <h4>
                        You’ve completed the initial set of questions! Your current MIP score is ready,
                        but you have the option to improve your result by answering a few additional questions.
                    </h4>
                    <p>
                        <b>Improve Your Score</b>: By answering a few more questions, you can get a more refined 
                        result and better career recommendations.
                        <p />
                        <br />
                        <b>Skip:</b> You can also choose to proceed without answering more questions.
                        Your current MIP score will be used to suggest suitable careers.
                    </p>

                    {/* Buttons for skipping or improving the score */}
                    <div className="option-btn-container">
                        <button onClick={goToCalculatePage} className="backbtn">Skip</button>
                        <button onClick={ImprovebtnHandler} className="backbtn">Improve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Option;
