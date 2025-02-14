import { useState } from 'react';
import './user-infor.styles.css';

// List of available districts
const districtList = [
    "Gampaha",
    "Kalutara",
    "Galle"
];

// List of available education levels
const educationList = [
    "School",
    "Ordinary-Level",
    "Advanced-Level",
    "University"
];

const UserInformation = () => {
    // State to store selected district
    const [district, setDistrict] = useState("Select District");

    // State to store selected education level
    const [education, setEducation] = useState("Select Education Level");

    // State to toggle district dropdown visibility
    const [isDistrictDropdownOpen, setDistrictDropdownOpen] = useState(false);

    // State to toggle education dropdown visibility
    const [isEducationDropdownOpen, setEducationDropdownOpen] = useState(false);

    // Function to handle district selection
    const handleDistrictChange = (value) => {
        setDistrict(value);
        setDistrictDropdownOpen(false); // Collapse dropdown after selection
    };

    // Function to handle education level selection
    const handleEducationChange = (value) => {
        setEducation(value);
        setEducationDropdownOpen(false); // Collapse dropdown after selection
    };

    return (
        <div className="dropdown-wrapper">
            <div className='inner-wrapper'>
                {/* District Dropdown */}
                <div className="custom-dropdown">
                    <div 
                        className="dropdown-toggle" 
                        onClick={() => setDistrictDropdownOpen(!isDistrictDropdownOpen)}
                    >
                        {district}
                    </div>
                    {isDistrictDropdownOpen && (
                        <ul className="dropdown-list">
                            {districtList.map((dist, index) => (
                                <li key={index} onClick={() => handleDistrictChange(dist)}>
                                    {dist}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Education Dropdown */}
                <div className="custom-dropdown">
                    <div 
                        className="dropdown-toggle" 
                        onClick={() => setEducationDropdownOpen(!isEducationDropdownOpen)}
                    >
                        {education}
                    </div>
                    {isEducationDropdownOpen && (
                        <ul className="dropdown-list">
                            {educationList.map((level, index) => (
                                <li key={index} onClick={() => handleEducationChange(level)}>
                                    {level}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Age Input Field */}
                <input className='age-field' type="number" placeholder='Enter Age'/>
            </div>
        </div>
    );
};

export default UserInformation;
