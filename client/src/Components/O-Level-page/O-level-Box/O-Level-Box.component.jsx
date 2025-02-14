import './O-Level-Box.styles.css';

// Importing necessary dependencies
import { useNavigate } from 'react-router-dom';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext, useEffect } from 'react';

const OrdinaryLevelBox = () => {
    // Accessing context values and functions
    const {
        goToLocalCommonSubjects, // Function to navigate to local O-Level subjects
        goToLondonStreamBox, // Function to navigate to London O-Level streams
        setshowOLevelBox, // Function to set visibility of O-Level box
        setshowOLevelLondStream, // Function to set visibility of London stream selection
        setshowOLevelSubj // Function to set visibility of O-Level subjects
    } = useContext(OLevelContext);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to navigate to A-Level Page (when O-Levels haven't been done)
    const HaventDoneBtnHandler = () => {
        navigate("/Advancelevelpage");
    };

    // Function to navigate to Extra-Curricular Activities Page
    const goToActivities = () => {
        navigate("/ExtraCurricular");
    };

    // useEffect to initialize component state when it mounts
    useEffect(() => {
        setshowOLevelBox(true); // Show O-Level selection box
        setshowOLevelLondStream(false); // Hide London stream selection
        setshowOLevelSubj(false); // Hide O-Level subjects selection
    }, []);

    return (
        <>
            {/* Title Section */}
            <div className='O-level-box-title-container'>
                <h2 className='O-level-box-title'>Select Ordinary Level Category You did from the following</h2>
            </div>   

            {/* O-Level Selection Box */}
            <div className='O-level-box'>
                <div className='O-level-btn-container'>
                    {/* Buttons for different O-Level categories */}
                    <button onClick={goToLocalCommonSubjects} className='O-level-btn'>Local</button>
                    <button onClick={goToLondonStreamBox} className='O-level-btn'>London</button>
                    <button onClick={HaventDoneBtnHandler} className='O-level-btn'>Haven't Done</button>
                </div>

                {/* Back Button */}
                <div className='O-level-box-back-btn'>
                    <button onClick={() => { goToActivities(); }} className='nextbtn'>Back</button>
                </div>
            </div>
        </>
    );
};

export default OrdinaryLevelBox;
