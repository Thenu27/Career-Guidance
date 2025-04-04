import React from 'react';
import './CareerModal.css'; // You'll need to create this CSS file

const CareerModal = ({ showModal, setShowModal, selectedCareer, onSelectCareer }) => {
    if (!showModal || !selectedCareer) return null;
    
    // Career details - Mock data (you would replace with actual career data)
    const careerDetails = {
        "Software Developer": {
            description: "Designs, builds, and maintains software applications and systems.",
            skills: ["Programming", "Problem Solving", "Logical Thinking"],
            education: "Bachelor's degree in Computer Science or related field",
            outlook: "High demand with excellent growth potential",
            salary: "$70,000 - $150,000"
        },
        "Data Scientist": {
            description: "Analyzes complex data to help organizations make better decisions.",
            skills: ["Statistics", "Machine Learning", "Data Visualization"],
            education: "Master's or PhD in Statistics, Computer Science, or related field",
            outlook: "Growing field with strong demand",
            salary: "$90,000 - $160,000"
        },
        "Mechanical Engineer": {
            description: "Designs, develops, and tests mechanical devices and systems.",
            skills: ["Technical Drawing", "Mathematics", "Problem Solving"],
            education: "Bachelor's degree in Mechanical Engineering",
            outlook: "Stable demand with steady growth",
            salary: "$65,000 - $120,000"
        },
        "Marketing Manager": {
            description: "Plans and oversees marketing campaigns to promote products or services.",
            skills: ["Communication", "Creativity", "Strategic Thinking"],
            education: "Bachelor's degree in Marketing or Business",
            outlook: "Good prospects particularly with digital marketing experience",
            salary: "$60,000 - $130,000"
        },
        "Healthcare Administrator": {
            description: "Manages healthcare facilities, departments, or clinical areas.",
            skills: ["Leadership", "Organization", "Communication"],
            education: "Bachelor's or Master's degree in Healthcare Administration",
            outlook: "Excellent growth as healthcare sector expands",
            salary: "$65,000 - $110,000"
        }
        // Add more career details as needed
    };
    
    // Get default career details for careers not in the mock data
    const getDefaultCareerDetails = (careerName) => {
        return {
            description: `Career in ${careerName} involves specialized work in this field.`,
            skills: ["Critical Thinking", "Communication", "Problem Solving"],
            education: "Bachelor's degree or higher in related field",
            outlook: "Varies by location and market conditions",
            salary: "Varies based on experience and location"
        };
    };
    
    // Get career details, fallback to default if not found
    const details = careerDetails[selectedCareer] || getDefaultCareerDetails(selectedCareer);
    
    // Handle selecting a career
    const handleSelectCareer = () => {
        onSelectCareer(selectedCareer);
        setShowModal(false);
    };
    
    return (
        <div className="career-modal-overlay">
            <div className="career-modal">
                <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
                <h2 className="modal-title">{selectedCareer}</h2>
                <div className="modal-content">
                    <div className="modal-section">
                        <h3>Description</h3>
                        <p>{details.description}</p>
                    </div>
                    
                    <div className="modal-section">
                        <h3>Key Skills</h3>
                        <ul>
                            {details.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="modal-section">
                        <h3>Education Required</h3>
                        <p>{details.education}</p>
                    </div>
                    
                    <div className="modal-section">
                        <h3>Job Outlook</h3>
                        <p>{details.outlook}</p>
                    </div>
                    
                    <div className="modal-section">
                        <h3>Salary Range</h3>
                        <p>{details.salary}</p>
                    </div>
                </div>
                
                <div className="modal-actions">
                    <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                    <button className="modal-select-btn" onClick={handleSelectCareer}>
                        Select This Career
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CareerModal;