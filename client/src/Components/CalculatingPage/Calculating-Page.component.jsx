import './Calculating-page.styles.css';

// Importing dependencies
import Image from '../Image/Image.components';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
// import { CareerContext } from '../../context/Career.context';
import axios from 'axios';

const CalculatingPage = () => {
    // Accessing context values
    const { setVisitedPages, setintelligenceScore, intelligenceScore} = useContext(ProgressContext);
    // const {Careers,setCareers} = useContext(CareerContext)

    // Function to fetch intelligence scores from the backend
    const getIntelligenceScores = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/calculation`); // Backend endpoint
            setintelligenceScore(response.data); // Store fetched intelligence scores in context
        } catch (err) {
            console.error('Error fetching intelligence scores:', err);
        }
    };




    // Fetch intelligence scores when the component mounts
    useEffect(() => {
        getIntelligenceScores();
    }, []);

    // Log the received intelligence score for debugging
    // useEffect(() => {
    //     console.log('Frontend received:', intelligenceScore);
    // }, [intelligenceScore]);

    // Mark pages as visited in the context when this page loads
    useEffect(() => {
        setVisitedPages(() => ({
            home: true,
            assessment: true,
            option: true,
            extraCurricular: true,
            OLevelPage: true,
            ALevelPage: true,
            CalculatingPage: true,
            IntelligencePage: false,
            CareerFieldPage: false,
            CareersPage: false
        }));
    }, []);

    // Hook for navigation
    const navigate = useNavigate();

    // Automatically navigate to Intelligence Page after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/IntelligencePage");
        }, 2000);

        return () => {
            clearTimeout(timer); // Clear timeout if the component unmounts before time completes
        };
    }, [navigate]);

    return (
        <div className='calculating-page-container'>
            {/* Frog image display */}
            <div className='calculating-frog'>
                <Image />
            </div>

            {/* Title section */}
            <div className='calculating-title-container'>
                <h1 className='calculating-title'>Calculating Multiple Intelligence Score</h1>
            </div>
        </div>
    );
};

export default CalculatingPage;
