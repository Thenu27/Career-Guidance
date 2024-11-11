import './O-Level-Results.css';
import { useContext, useState } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';
import { useNavigate } from 'react-router-dom';

const OLevelResults = () => {
  const { OLevelResultsArray, goToBasketPage } = useContext(OLevelContext);
  const navigate = useNavigate();

  const goToALevelPage = () => {
    navigate("/Advancelevelpage");
  };

  // State to store grades for each result individually
  const [grades, setGrades] = useState(Array(OLevelResultsArray.length).fill("Select Grade"));

  const selectGradeHandler = (value, index) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  return (
    <div>
      <div className='O-Level-result-container'>
        <h2>O Level Results</h2>
        <div className='O-Level-result-btn-container'>
          {OLevelResultsArray.map((result, index) => (
            <div key={index} className='O-level-result-btn'>
              <h4 className="O-level-result-name">{result}</h4>
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
        <div className='O-Level-result-NextAndBackbtn-container'>
          <button onClick={goToBasketPage} className='backbtn'>Back</button>
          <button onClick={goToALevelPage} className='nextbtn'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default OLevelResults;
