import './O-Level-Results.css';
import { useContext, useState,useEffect} from 'react';
import { OLevelContext } from '../../../context/OLevel.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OLevelResults = () => {



  const { OLevelResultsArray, goToBasketPage } = useContext(OLevelContext);
  const navigate = useNavigate();




  const goToALevelPage = () => {
    navigate("/Advancelevelpage");
  };





  // State to store grades for each result individually
  const [grades, setGrades] = useState(Array(OLevelResultsArray.length).fill("Select Grade"));
  const [OLevelResultsAndGrades,setOLevelResultsAndGrades] = useState({});




  const selectGradeHandler = (value, index) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);

    setOLevelResultsAndGrades((prev)=>({
      ...prev,
      [OLevelResultsArray[index]]:value
    }))
  };






const sendToBackend =async()=>{
  try{ 
  const response = await axios.post("http://localhost:3000/api/Ordinarylevelpage",{
    OLevelResultsAndGrades
  });
  if(response.status===200){
    console.log("OLevelResultsArray Sent to back end")
  }else{
    console.log("Results Not sent")
  }
}catch(error){
  console.log(error,"results sending faled")
}
}



  

  return (
    <>

        <div className='O-level-box-title-container'>
        <h2 className='O-level-box-title'>Choose you have O-Level results</h2>
        </div>
    <div className='O-level-subject-component'>
    <div className='O-level-subject-box'>
    <h2 className='O-level-subject-title'>Your results</h2>


        <div className='O-level-subject-btn-container'>
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



        <div className='O-level-common-subjects-back-next-btn'>
          <button onClick={goToBasketPage} className='nextbtn'>Back</button>
          <button onClick={() => { goToALevelPage(); sendToBackend(); }} className='nextbtn'>Submit</button>
          </div>



      </div>
    </div>
    </>
  );
};

export default OLevelResults;
