import { useContext, useEffect, useState } from "react";
import { ALevelContext } from "../../../context/ALevel.context";

const ALevelMathsLocalSubjects = () => {
    // Extracting context values
    const { goToStreams, ALSubjectsFromDB, ALResultsArray, setALResultsArray, goToResults } = useContext(ALevelContext);
    
    // State to manage selected subjects
    const [selectedSubject, setselectedSubject] = useState([]);

    // Initialize `selectedSubject` with `ALResultsArray` on component mount
    useEffect(() => {
        setselectedSubject(ALResultsArray);
    }, [ALResultsArray]);

    // Function to handle subject selection/deselection
    const btnHandler = (subject) => {
        if (selectedSubject.includes(subject)) {
            // Remove subject from selectedSubject and ALResultsArray if already selected
            const updatedSelected = selectedSubject.filter((subj) => subj !== subject);
            setselectedSubject(updatedSelected);
            setALResultsArray(updatedSelected);
        } else {
            // Add subject to selectedSubject and ALResultsArray if not selected
            const updatedSelected = [...selectedSubject, subject];
            setselectedSubject(updatedSelected);
            setALResultsArray(updatedSelected);
        }
    };

    // Debugging: Log ALResultsArray whenever it changes
    useEffect(() => {
        console.log("ALResultsArray:", ALResultsArray);
    }, [ALResultsArray]);

    return (
        <>
            {/* Title Section */}
            <div className="O-level-box-title-container">
                <h2 className="O-level-subject-box-title">Select A Level Subjects you have Done</h2>
            </div>

            {/* Subject Selection Container */}
            <div className="O-level-subject-component">
                <div className="O-level-subject-box">
                    <h2 className="O-level-subject-title">Common Subjects</h2>

                    {/* Subject Selection Buttons */}
                    <div className="O-level-subject-btn-container">
                        {ALSubjectsFromDB.map((subject, index) => (
                            <button
                                key={index}
                                onClick={() => btnHandler(subject.subject)}
                                className={`O-subject-level-btn ${
                                    selectedSubject.includes(subject.subject)
                                        ? "OL-subject-btn-selected"
                                        : ""
                                }`}
                            >
                                {subject.subject}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="O-level-common-subjects-back-next-btn">
                        <button onClick={goToStreams} className="nextbtn">
                            Back
                        </button>
                        <button onClick={goToResults} className="nextbtn">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ALevelMathsLocalSubjects;
