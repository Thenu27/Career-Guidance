import './CareerPage.css';

// Importing dependencies
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useCallback } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';
import axios from 'axios';

const CareerPage = () => {
    // Accessing context values
    const { setVisitedPages } = useContext(ProgressContext);
    const { setCareers, Careers } = useContext(CareerContext);

    // Function to fetch careers from the backend (memoized to prevent unnecessary recreation)
    const fetchCareers = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/career`); // API call to fetch careers
            setCareers(response.data); // Update careers state in context
        } catch (error) {
            console.error("Error receiving careers from backend", error);
        }
    }, [setCareers]); // Dependency array ensures fetchCareers is only recreated if setCareers changes

    // Fetch careers when the component mounts
    useEffect(() => {
        fetchCareers();
    }, [fetchCareers]);

    // Log fetched careers for debugging
    useEffect(() => {
        console.log('Careers:', Careers);
    }, [Careers]);

    // Mark pages as visited when this page loads
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
        if (Careers && Careers.topCareers && Careers.topCareers.length > 0) {
            return Careers.topCareers.map((career) => (
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
        if (Careers && Careers.moderateCareers && Careers.moderateCareers.length > 0) {
            return Careers.moderateCareers.map((career) => (
                <button className="mapped-career-btn" key={career}>
                    {career}
                </button>
            ));
        } else {
            return <p>No Moderate Careers Found</p>;
        }
    };

    return (
        <div className="career-page">
            {/* Page Title */}
            <div className="career-field-box-title-container career-page-title">
                <h2 className="career-field-box-title">
                    Congratulations! Based on your MIP Score, we’ve curated careers that align with your strengths.
                </h2>
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
                    <div className="chosen-career-box">{renderModerateCareers()}</div>
                    <h2 className="career-type">Moderate Career</h2>
                </div>

                {/* Satisfactory Career Section */}
                <div className="career-box">
                    <h2 className="career-type">Satisfactory Career</h2>
                    <div className="chosen-career-box">
                        <button>Career 1</button>
                        <button>Career 2</button>
                        <button>Career 3</button>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="career-fieldBox-navigation career-page-navigation">
                <button onClick={goToIntelligencePage} className="nextbtn">
                    Back
                </button>
                <button onClick={goToSendResultPage} className="nextbtn">
                    Send Results
                </button>
            </div>

            {/* Frog Image */}
            <div className="career-page-frog">
                <Image />
            </div>
        </div>
    );
};

export default CareerPage;
