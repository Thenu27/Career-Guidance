import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailSuccesPage.css'

const EmailSuccesPage = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
    }

    const goToCareerPage = () => {
        navigate("/Careers");
    }

    return (
        <div className='success-page'>
            <div className='success-container'>
                <div className='success-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                
                <h2 className='success-title'>Results Sent Successfully!</h2>
                
                <p className='success-message'>
                    Your test results have been sent to your email. 
                    Please check your inbox (and spam folder, just in case).
                </p>
                
               
                <div className='success-actions'>
                    <button 
                        onClick={goToHomePage} 
                        className='success-btn success-home-btn'
                    >
                        Go to Home
                    </button>
                    
                    <button 
                        onClick={goToCareerPage} 
                        className='success-btn success-career-btn'
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmailSuccesPage;