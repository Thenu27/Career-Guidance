import './CareerPage.css';

// Importing dependencies
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';
import CareerModal from '../CareerModal/CareerModal'; // Import the CareerModal component

const CareerPage = () => {
    // Accessing context values
    const { setVisitedPages } = useContext(ProgressContext);
    const { setCareers, Careers } = useContext(CareerContext);
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [showSelectedCareersModal, setShowSelectedCareersModal] = useState(false);
    const [selectedCareersInModal, setselectedCareersInModal] = useState([]);

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

        // Load any selected careers from localStorage
        const storedSelectedCareers = localStorage.getItem("selectedCareers");
        if (storedSelectedCareers) {
            try {
                setselectedCareersInModal(JSON.parse(storedSelectedCareers));
            } catch (error) {
                console.error("Error parsing selectedCareers:", error);
            }
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
    
    // Handle career click to open modal
    const handleCareerClick = (career) => {
        setSelectedCareer(career);
        setShowModal(true);
    };
    
    // Handle showing selected careers modal
    const handleShowSelectedCareers = () => {
        setShowSelectedCareersModal(true);
    };
    
    // Handle closing selected careers modal
    const handleCloseSelectedCareers = () => {
        setShowSelectedCareersModal(false);
    };
    
    // Handle selecting a career from modal
    const handleSelectCareer = (career) => {
        // Update the selected careers list
        const updatedSelectedCareers = [...selectedCareersInModal]; 
        if (!updatedSelectedCareers.includes(career)) {
            updatedSelectedCareers.push(career);
            setselectedCareersInModal(updatedSelectedCareers);
            
            // Save to localStorage
            localStorage.setItem("selectedCareers", JSON.stringify(updatedSelectedCareers));
            alert(`You have selected ${career} as one of your preferred careers!`);
        } else {
            alert(`${career} is already in your selected careers list!`);
        }
    };
    
    // Handle removing a career from selected list
    const handleRemoveCareer = (careerToRemove) => {
        const updatedSelectedCareers = selectedCareersInModal.filter(career => career !== careerToRemove);
        setselectedCareersInModal(updatedSelectedCareers);
        localStorage.setItem("selectedCareers", JSON.stringify(updatedSelectedCareers));
    };

    // Function to render Top Careers
    const renderTopCareers = () => {
        if (Careers && Careers.bestCareers && Careers.bestCareers.length > 0) {
            return Careers.bestCareers.map((career) => (
                <button 
                    className="mapped-career-btn" 
                    key={career}
                    onClick={() => handleCareerClick(career)}
                >
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
                <button 
                    className="mapped-career-btn" 
                    key={career}
                    onClick={() => handleCareerClick(career)}
                >
                    {career}
                </button>
            ));
        } else {
            return <p>No Moderate Careers Found</p>;
        }
    };

    // Function to render Suitable Careers
    const renderSuitableCareers = () => {
        if (Careers && Careers.SuitableCareers && Careers.SuitableCareers.length > 0) {
            return Careers.SuitableCareers.map((career) => (
                <button 
                    className="mapped-career-btn" 
                    key={career}
                    onClick={() => handleCareerClick(career)}
                >
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

            {/* Show Selected Careers Button - placed above the navigation buttons */}
            <div className="sc-selected-careers-container">
                <button 
                    onClick={handleShowSelectedCareers} 
                    className="sc-selected-careers-btn"
                >
                    Show Selected Careers
                </button>
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
            
            {/* Career Modal */}
            <CareerModal 
                showModal={showModal}
                setShowModal={setShowModal}
                selectedCareer={selectedCareer}
                onSelectCareer={handleSelectCareer}
                selectedCareersInModal={selectedCareersInModal}
            />
            
            {/* Selected Careers Modal */}
            {showSelectedCareersModal && (
                <div className="sc-modal-backdrop">
                    <div className="sc-modal-content">
                        <div className="sc-modal-header">
                            <h2>Your Selected Careers</h2>
                            <button 
                                onClick={handleCloseSelectedCareers}
                                className="sc-modal-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="sc-modal-body">
                            {selectedCareersInModal.length > 0 ? (
                                <ul className="sc-careers-list">
                                    {selectedCareersInModal.map((career, index) => (
                                        <li key={index} className="sc-career-item">
                                            <span>{career}</span>
                                            <button 
                                                onClick={() => handleRemoveCareer(career)}
                                                className="sc-remove-btn"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You haven't selected any careers yet. Click on any career to select it.</p>
                            )}
                        </div>
                        <div className="sc-modal-footer">
                            <button 
                                onClick={handleCloseSelectedCareers}
                                className="sc-modal-btn"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerPage;