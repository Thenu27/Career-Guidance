import './Calculating-page.styles.css';

// Importing dependencies
import Image from '../Image/Image.components';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../../context/progress.context';
// import { CareerContext } from '../../context/Career.context';
import { API } from '../API/Api';
import Spinner from '../Spinner/Spinner';

const CalculatingPage = () => {
    // Accessing context values
    const { setVisitedPages} = useContext(ProgressContext);
    // const {Careers,setCareers} = useContext(CareerContext)

    // // Function to fetch intelligence scores from the backend
    // const getIntelligenceScores = async () => {
    //     try {
    //         const response = await API.get(`${process.env.REACT_APP_URL}/api/calculation`); // Backend endpoint
    //         setintelligenceScore(response.data); // Store fetched intelligence scores in context
    //     } catch (err) {
    //         console.error('Error fetching intelligence scores:', err);
    //     }
    // };




    // // Fetch intelligence scores when the component mounts
    // useEffect(() => {
    //     getIntelligenceScores();
    // }, []);

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
        <div className='spinner-container'>
        <   Spinner/>
        </div>
    );
};

export default CalculatingPage;
