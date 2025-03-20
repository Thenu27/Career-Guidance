import { ALevelContext } from '../../../context/ALevel.context';
import './A-Level-Results.css';

// Importing necessary dependencies
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ALevelResults = () => {
    // Accessing context values
    const { ALResultsArray, goToALevelLocalMaths } = useContext(ALevelContext);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to navigate to the Calculating Page
    const goToCalculatingPage = () => {
        navigate("/CalculatePage"); 
    };

    // State to store selected grades for each subject
    const [grades, setGrades] = useState(Array(ALResultsArray.length).fill("Select Grade"));
    
    // State to store selected results and grades
    const [ALevelResultsAndGrades, setALevelResultsAndGrades] = useState({});

    // Function to handle grade selection
    const selectGradeHandler = (value, index) => {
        // Updating grades array with the selected value
        const newGrades = [...grades];
        newGrades[index] = value;
        setGrades(newGrades);

        // Updating the results and grades state object
        setALevelResultsAndGrades((prev) => ({
            ...prev,
            [ALResultsArray[index]]: value
        }));
    };

    // Log updated results and grades when changes occur (for debugging)
    // useEffect(() => {
    //     console.log(ALevelResultsAndGrades);
    // }, [ALevelResultsAndGrades]);

    // Function to send results to backend
    const sendToBackend = async () => {
        try { 
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/api/AdvanceLevelPage`,
                { ALevelResultsAndGrades }, // Data payload
                {
                    withCredentials: true, // Ensure cookies are sent
                }
            );

            // Clearing stored data after sending to backend
            ALevelResultsAndGrades = {};
            // console.log("New", response.data);

            // if (response.status === 200) {
            //     console.log("ALevelResultsArray Sent to backend");
            // } else {
            //     console.log("ALevel Results Not sent");
            // }
        } catch (error) {
            console.log(error, "A Level results sending failed");
        }
    };

    return (
        <>
            {/* Page Title */}
            <div className='O-level-box-title-container'>
                <h2 className='O-level-box-title'>Choose your A-Level results</h2>
            </div>

            {/* Results Selection Box */}
            <div className='O-level-subject-component'>
                <div className='O-level-subject-box'>
                    <h2 className='O-level-subject-title'>Your results</h2>

                    {/* Buttons for selecting grades */}
                    <div className='O-level-subject-btn-container'>
                        {ALResultsArray.map((result, index) => (
                            <div key={index} className='O-level-result-btn'>
                                <p className="O-level-result-name">{result}</p>
                                <div className="dropdown">
                                    {/* Dropdown button showing selected grade */}
                                    <button className="dropbtn">{grades[index]} ▼</button>
                                    <div className="dropdown-content">
                                        <a onClick={() => selectGradeHandler("A", index)}>A - Distinction</a>
                                        <a onClick={() => selectGradeHandler("B", index)}>B - Very Good Pass</a>
                                        <a onClick={() => selectGradeHandler("C", index)}>C - Credit Pass</a>
                                        <a onClick={() => selectGradeHandler("S", index)}>S - Ordinary Pass</a>
                                        <a onClick={() => selectGradeHandler("W", index)}>W - Weak Pass</a>
                                        <a onClick={() => selectGradeHandler("F", index)}>F - Fail</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className='O-level-common-subjects-back-next-btn'>
                        <button onClick={goToALevelLocalMaths} className='nextbtn'>Back</button>

                        {/* Submit button sends data to backend and navigates to the next page */}
                        <button
                            onClick={async () => {
                                await sendToBackend(); // Wait for backend call to complete
                                goToCalculatingPage(); // Navigate after sending data
                            }}
                            className="nextbtn"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ALevelResults;
