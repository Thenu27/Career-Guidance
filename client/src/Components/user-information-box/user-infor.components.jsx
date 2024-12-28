import { useState } from 'react';
import './user-infor.styles.css';

const districtList = [
    "Gampaha",
    "Kalutara",
    "Galle"
];

const educationList = [
    "School",
    "Ordinary-Level",
    "Advanced-Level",
    "University"
];

const UserInformation = () => {
    const [district, setDistrict] = useState("Select District");
    const [education, setEducation] = useState("Select Education Level");

    const [isDistrictDropdownOpen, setDistrictDropdownOpen] = useState(false);
    const [isEducationDropdownOpen, setEducationDropdownOpen] = useState(false);

    const handleDistrictChange = (value) => {
        setDistrict(value);
        setDistrictDropdownOpen(false); // Collapse dropdown
    };

    const handleEducationChange = (value) => {
        setEducation(value);
        setEducationDropdownOpen(false); // Collapse dropdown
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

            <input className='age-field' type="number" placeholder='Enter Age'/>
            </div>
        </div>
    );
};

export default UserInformation;
