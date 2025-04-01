import './CareerPage.css';

// Importing dependencies
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext} from 'react';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';
// import axios from 'axios';

const CareerPage = () => {
    // Accessing context values
    const { setVisitedPages } = useContext(ProgressContext);
    const { setCareers, Careers } = useContext(CareerContext);

    useEffect(() => {
        const storedCareers = localStorage.getItem("careerData");
    
        if (storedCareers) { // ✅ Check if data exists
            try {
                const parsedCareers = JSON.parse(storedCareers); // ✅ Parse safely
                setCareers(parsedCareers);
                // console.log("Careers loaded from localStorage:", parsedCareers);
            } catch (error) {
                console.error("Error parsing careerData:", error);
            }
        } else {
            // console.warn("No careerData found in localStorage.");
            setCareers("No Careers Found"); // ✅ Corrected this check
        }
    }, []);

    useEffect(()=>{
        console.log("Careers",Careers)
    },[Careers])

    useEffect(() => {
        setVisitedPages(() => ({
            home: true,
            assessment: true,
            option: true,
            extraCurricular: true,
            OLevelPage: true,
            ALevelPage: true,
            CalculatingPage: true,
            IntelligencePage: true,
            CareerFieldPage: true,
            CareersPage: true,
        }));
    }, [setVisitedPages]);

    // Hook for navigation
    const navigate = useNavigate();

    // Navigation handlers
    const goToIntelligencePage = () => {
        navigate("/IntelligencePage"); // Navigate back to Intelligence Page
    };

    const goToSendResultPage = () => {
        navigate("/SendResults"); // Navigate to Send Results Page
    };

    // Function to render Top Careers
    const renderTopCareers = () => {
        if (Careers && Careers.bestCareers && Careers.bestCareers.length > 0) {
            return Careers.bestCareers.map((career) => (
                <button className="mapped-career-btn" key={career}>
                    {career}
                </button>
            ));
        } else {
            return <p>No Top Careers Found</p>;
        }
    };

    // Function to render Moderate Careers
    const renderModerateCareers = () => {
        if (Careers && Careers.GoodCareers && Careers.GoodCareers.length > 0) {
            return Careers.GoodCareers.map((career) => (
                <button className="mapped-career-btn" key={career}>
                    {career}
                </button>
            ));
        } else {
            return <p>No Moderate Careers Found</p>;
        }
    };

        // Function to render Moderate Careers
        const renderSuitableCareers = () => {
            if (Careers && Careers.SuitableCareers && Careers.SuitableCareers.length > 0) {
                return Careers.SuitableCareers.map((career) => (
                    <button className="mapped-career-btn" key={career}>
                        {career}
                    </button>
                ));
            } else {
                return <p>No Suitable Careers Found</p>;
            }
        };

    return (
        <div className="career-page">
            {/* Page Title */}
            <div className="career-field-box-title-container career-page-title">
                <h2 className="career-field-box-title">Congrats! We've matched careers to your top strengths.</h2>
            </div>

            {/* Career Boxes Container */}
            <div className="career-box-container">
                {/* Top Career Section */}
                <div className="career-box">
                    <h2 className="career-type">Top Career</h2>
                    <div className="chosen-career-box">{renderTopCareers()}</div>
                </div>

                {/* Moderate Career Section */}
                <div className="career-box">
                <h2 className="career-type">Moderate Career</h2>
                    <div className="chosen-career-box">{renderModerateCareers()}</div>
                </div>

                {/* Satisfactory Career Section */}
                <div className="career-box">
                    <h2 className="career-type">Satisfactory Career</h2>
                    <div className="chosen-career-box">
                    {renderSuitableCareers()}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="career-fieldBox-navigation career-page-navigation">
                <button onClick={goToIntelligencePage} className="carrer-nextbtn">
                    Back
                </button>
                <button onClick={goToSendResultPage} className="carrer-nextbtn career-submit-btn">
                    Send Results
                </button>
            </div>
        </div>
    );
};

export default CareerPage;
