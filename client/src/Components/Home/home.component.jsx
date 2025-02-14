import Image from '../Image/Image.components';
import './home.styles.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ProgressContext } from '../../context/progress.context';

const Home = () => {
    // Accessing context values
    const { setVisitedPages } = useContext(ProgressContext);
    
    // Hook for navigation
    const navigate = useNavigate();

    // useEffect to update visited pages when the component mounts
    useEffect(() => {
        setVisitedPages((prev) => ({
            ...prev,
            home: true,
            assessment: false,
            option: false,
            extraCurricular: false
        }));  
    }, []);

    // Function to navigate to the Assessment page
    const HandleNavigation = () => {
        navigate("/Assesment");
    };

    return (
        <div className="home-container">
            {/* Frog Image Section */}
            <div className='home-page-frog'>
                <Image />
            </div>

            {/* Welcome Title */}
            <div className='welcome-title'>
                <h1>Welcome to Your Personalized Career Journey!<br/>UniversityGuide</h1>
            </div>
            
            {/* Introduction Section */}
            <div className='allp'>
                <p className='intro-text'>
                    Are you ready to unlock your potential and discover the careers that align with your unique abilities?
                    Our platform is designed to guide you through this exciting process, based on your Multiple Intelligence Profile (MIP).
                    Here's how we help:
                </p>

                {/* Steps for career guidance */}
                <div className='step-container'>
                    <div>
                        <p><b>1. Assess Your Strengths:</b> Start by answering a few insightful questions to reveal your intelligence profile.</p>
                    </div>
                    <div>
                        <p><b>2. Enhance Your Results:</b> Want to improve your initial assessment? You have the option to 
                            answer more questions for a refined and accurate score.<br/>
                        </p>
                    </div>
                    <div>
                        <p><b>3. Discover Your Career Match:</b> Based on your customized MIP, we’ll suggest career paths that are aligned with your strengths and passions.</p> 
                    </div>
                    
                    {/* Closing text */}
                    <div className='ending-text'>
                        <p>
                            This journey is all about you, so take your time and explore the best career options 
                            tailored just for you. Let's get started!
                        </p>
                    </div>
                </div> 
            </div>

            {/* Button to start assessment */}
            <div className='take-quiz-btn'>
                <button onClick={HandleNavigation}>Take Assessment</button>
            </div>
        </div>
    );
};

export default Home;
