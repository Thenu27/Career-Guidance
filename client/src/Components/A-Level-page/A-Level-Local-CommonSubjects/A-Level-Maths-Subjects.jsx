import { useContext, useEffect, useState } from "react";
import { ALevelContext } from "../../../context/ALevel.context";

const ALevelMathsLocalSubjects = () => {
    const { goToStreams, ALSubjectsFromDB, ALResultsArray, setALResultsArray, goToResults } = useContext(ALevelContext);
    const [selectedSubject, setselectedSubject] = useState([]);

    // Initialize `selectedSubject` with `ALResultsArray` on mount
    useEffect(() => {
        setselectedSubject(ALResultsArray);
    }, [ALResultsArray]);

    // Button click handler
    const btnHandler = (subject) => {
        if (selectedSubject.includes(subject)) {
            // Remove subject from selectedSubject and ALResultsArray
            const updatedSelected = selectedSubject.filter((subj) => subj !== subject);
            setselectedSubject(updatedSelected);
            setALResultsArray(updatedSelected);
        } else {
            // Add subject to selectedSubject and ALResultsArray
            const updatedSelected = [...selectedSubject, subject];
            setselectedSubject(updatedSelected);
            setALResultsArray(updatedSelected);
        }
    };

    useEffect(() => {
        console.log("ALResultsArray:", ALResultsArray);
    }, [ALResultsArray]);

    return (
        <>
            <div className="O-level-box-title-container">
                <h2 className="O-level-subject-box-title">Select A Level Subjects you have Done</h2>
            </div>
            <div className="O-level-subject-component">
                <div className="O-level-subject-box">
                    <h2 className="O-level-subject-title">Common Subjects</h2>

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
