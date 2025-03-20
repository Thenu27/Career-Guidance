import './O-Level-Local-MainSubjects.css';

// Importing necessary dependencies
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext, useEffect, useState } from 'react';

const OLevelMainLocalSubjects = ({ OLevelLocalCoreSubj, OLevelBasketSubj }) => {
    // Accessing context values
    const {
        setshowOLevelBox, // Function to toggle visibility of O-Level box
        setshowOLevelLocalSubj, // Function to toggle visibility of O-Level local subjects
        setOLevelResultsArray, // Function to update selected O-Level results
        OLevelResultsArray, // Array storing selected O-Level subjects
        goToOLevelResults, // Function to navigate to O-Level results page
        goToBasketLocal, // Function to navigate to O-Level basket subjects
        showOLLocalBakset, // Boolean flag to determine which subjects to show
        goToOLevelBox // Function to navigate back to O-Level selection box
    } = useContext(OLevelContext);

    // State to manage selected buttons (selected subjects)
    const [selectedButtons, setselectedButtons] = useState([]);

    // Initialize `selectedButtons` with `OLevelResultsArray` on mount
    useEffect(() => {
        setselectedButtons(OLevelResultsArray);
    }, [OLevelResultsArray]);

    // Function to handle subject selection
    const btnSelectHandler = (subject) => {
        if (selectedButtons.includes(subject)) {
            // Remove the subject from selectedButtons and context array
            const updatedSelected = selectedButtons.filter((subj) => subj !== subject);
            setselectedButtons(updatedSelected);
            setOLevelResultsArray(updatedSelected);
        } else {
            // Add the subject to selectedButtons and context array
            const updatedSelected = [...selectedButtons, subject];
            setselectedButtons(updatedSelected);
            setOLevelResultsArray(updatedSelected);
        }
    };

    // Set the visibility of O-Level sections on component mount
    useEffect(() => {
        setshowOLevelBox(false); // Hide O-Level selection box
        setshowOLevelLocalSubj(true); // Show local subjects selection
    }, []);

    return (
        <>
            {/* Title Section */}
            <div className="O-level-box-title-container">   
                <h2 className="O-level-box-title">
                    Select the Common Subjects you have Done from the following
                </h2>
            </div>

            {/* Subject Selection Box */}
            <div className="O-level-subject-component">
                <div className="O-level-subject-box">
                    <h2 className="O-level-subject-title">Common Subjects</h2>

                    {/* Subject Buttons */}
                    <div className="O-level-subject-btn-container">
                        {(showOLLocalBakset ? OLevelBasketSubj : OLevelLocalCoreSubj).map((subject, index) => (
                            <button
                                key={index}
                                onClick={() => btnSelectHandler(subject.subjects)}
                                className={`O-subject-level-btn ${
                                    selectedButtons.includes(subject.subjects)
                                        ? 'OL-subject-btn-selected'
                                        : ''
                                }`}
                            >
                                {subject.subjects}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="O-level-common-subjects-back-next-btn">
                        <button onClick={goToOLevelBox} className="nextbtn">
                            Back
                        </button>
                        <button onClick={showOLLocalBakset ? goToOLevelResults : goToBasketLocal} className="nextbtn">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OLevelMainLocalSubjects;
