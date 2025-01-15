import { ALevelContext } from '../../../context/ALevel.context';
import './A-Level-Results.css';
import { useContext,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CsrfContext } from '../../../context/csrf.context';

const ALevelResults = ()=>{
    const {ALResultsArray,goToALevelLocalMaths} = useContext(ALevelContext);
    const {csrfToken} = useContext(CsrfContext)
  
  
     const navigate = useNavigate();
  
     const goToCalculatingPage = () => {
      navigate("/CalculatePage"); 
    };
  
  
  
  
  
    // State to store grades for each result individually
    const [grades, setGrades] = useState(Array(ALResultsArray.length).fill("Select Grade"));
    const [ALevelResultsAndGrades,setALevelResultsAndGrades] = useState({});
  
  
  
  
    const selectGradeHandler = (value, index) => {
      const newGrades = [...grades];
      newGrades[index] = value;
      setGrades(newGrades);
  
      setALevelResultsAndGrades((prev)=>({
        ...prev,
        [ALResultsArray[index]]:value
      }))
    };
  
  useEffect(()=>{
    console.log(ALevelResultsAndGrades)
  },[ALevelResultsAndGrades])
  
  
  
  
  const sendToBackend =async()=>{
    try{ 
    const response = await axios.post(`${process.env.REACT_APP_URL}/api/AdvanceLevelPage`,{
      ALevelResultsAndGrades
    },{
      headers: { 'X-XSRF-TOKEN': csrfToken }, // Include CSRF token
      withCredentials: true, // Ensure cookies are sent
  });
    ALevelResultsAndGrades={};
    console.log("New",response.data)
    if(response.status===200){
      console.log("ALevelResultsArray Sent to back end")
    }else{
      console.log("ALevel Results Not sent")
    }
  }catch(error){
    console.log(error,"A Level results sending failed")
  }
  }
  
  
  
    
  
    return (
      <>
  
          <div className='O-level-box-title-container'>
          <h2 className='O-level-box-title'>Choose you have A-Level results</h2>
          </div>
      <div className='O-level-subject-component'>
      <div className='O-level-subject-box'>
      <h2 className='O-level-subject-title'>Your results</h2>
  
  
          <div className='O-level-subject-btn-container'>
            {ALResultsArray.map((result, index) => (
  
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
  
  
  
        <div className='O-level-common-subjects-back-next-btn'>
            <button onClick={goToALevelLocalMaths}  className='nextbtn'>Back</button>
            <button
  onClick={async () => {
    await sendToBackend(); // Wait for the backend call to finish
    goToCalculatingPage(); // Navigate after the backend call
  }}
  className="nextbtn"
>
  Submit
</button>         </div>
  
  
  
        </div>
      </div>
      </>)
}

export default ALevelResults;