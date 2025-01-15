import './CareerPage.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext ,useCallback} from 'react';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';
import axios from 'axios';

const CareerPage = () => {
    const { setVisitedPages } = useContext(ProgressContext);
    const { setCareers, Careers } = useContext(CareerContext);

    // Fetch careers from the backend
     // Memoize the fetchCareers function
     const fetchCareers = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/career`);
            setCareers(response.data);
        } catch (error) {
            console.error("Error receiving careers from backend", error);
        }
    }, [setCareers]); // Dependency array ensures fetchCareers is only recreated if setCareers changes

    // Fetch careers on component mount
    useEffect(() => {
        fetchCareers();
    }, [fetchCareers]); 

    useEffect(() => {
        console.log('Careers:', Careers);
    }, [Careers]);

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

    const navigate = useNavigate();

    // Navigation handlers
    const goToIntelligencePage = () => {
        navigate("/IntelligencePage");
    };

    const goToSendResultPage = () => {
        navigate("/SendResults");
    };

    // const careerOpenBtnHandler = () => {
    //     window.open("http://localhost:3000/", "_blank");
    // };

    // Render top careers
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

    // Render moderate careers
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

            {/* Career Boxes */}
            <div className="career-box-container">
                <div className="career-box">
                    <h2 className="career-type">Top Career</h2>
                    <div className="chosen-career-box">{renderTopCareers()}</div>
                </div>

                <div className="career-box">
                    <div className="chosen-career-box">{renderModerateCareers()}</div>
                    <h2 className="career-type">Moderate Career</h2>
                </div>

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
