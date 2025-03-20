import './O-Level-Results.css';

// Importing necessary dependencies
import { useContext, useState } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OLevelResults = () => {
  // Accessing CSRF token from context

  // Accessing O-Level results and navigation functions from context
  const { OLevelResultsArray, goToBasketLocal } = useContext(OLevelContext);
  
  // Hook for navigation
  const navigate = useNavigate();

  // Function to navigate to A-Level Page
  const goToALevelPage = () => {
    navigate("/Advancelevelpage");
  };

  // State to store selected grades for each subject
  const [grades, setGrades] = useState(Array(OLevelResultsArray.length).fill("Select Grade"));

  // State to store selected O-Level results along with their grades
  const [OLevelResultsAndGrades, setOLevelResultsAndGrades] = useState({});

  // Function to handle grade selection for each subject
  const selectGradeHandler = (value, index) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);

    // Update the selected grades in state
    setOLevelResultsAndGrades((prev) => ({
      ...prev,
      [OLevelResultsArray[index]]: value
    }));
  };

  // Function to send O-Level results and grades to the backend
  const sendToBackend = async () => {
    try { 
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/Ordinarylevelpage`,
        { OLevelResultsAndGrades },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );

      // console.log("New", response.data);

      // if (response.status === 200) {
      //   console.log("OLevelResultsArray Sent to back end");
      // } else {
      //   console.log("Results Not sent");
      // }
    } catch (error) {
      console.log(error, "results sending failed");
    }
  };

  return (
    <>
      {/* Title Section */}
      <div className='O-level-box-title-container'>
        <h2 className='O-level-box-title'>Select O-Level result for each Subject you have Selected</h2>
      </div>

      {/* Results Selection Box */}
      <div className='O-level-subject-component'>
        <div className='O-level-subject-box'>
          <h2 className='O-level-subject-title'>Your results</h2>

          {/* Subject Buttons with Dropdown Selection */}
          <div className='O-level-subject-btn-container OL-result-container'>
            {OLevelResultsArray.map((result, index) => (
              <div key={index} className='O-level-result-btn'>
                <p className="O-level-result-name">{result}</p>
                <div className="dropdown">
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
            <button onClick={goToBasketLocal} className='nextbtn'>Back</button>
            <button onClick={() => { goToALevelPage(); sendToBackend(); }} className='nextbtn'>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OLevelResults;
