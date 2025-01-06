import './Extra-Curricular-page.css';
import ExtraCurricularBox from './Extra-Curricular-Box/Extra-Curricular-Box.components';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { ActivitiesContext } from '../../context/Activities.context';
import axios from 'axios';
import ExtraCurricularResults from './Extra-Curricular-results/Extra-Curricular-Results';
import SubActivitiesPage from './Extra-Curricula-Sub_activities/subActivities';

const ExtraCurricularPage = () => {
  const { setVisitedPages } = useContext(ProgressContext);
  const {
    showExtraLevelsPage,
    setshowExtraLevelsPage,
    goToECListPage,
    goToExtraLevelsPage,
    goToSubActivities,
    SelectedExtraActivities,
    ActivitiesObj,
    setActivitiesObj,
    setShowActivitiesSub,
    ShowActivitiesSub,
    setSubActivities,
    currentSubjectIndex,
    setCurrentSubjectIndex,
    SubActivities,
    ActivitiesToSendBE,
    SelectedSubActivities,
    ActivitiesWithoutSub,
    setMainActivities
  } = useContext(ActivitiesContext);

  useEffect(() => {
    setVisitedPages(() => ({
      home: true,
      assessment: true,
      option: true,
      extraCurricular: true,
      OLevelPage: false,
      ALevelPage: false,
      CalculatingPage: false,
      IntelligencePage: false,
      CareerFieldPage: false,
      CareersPage: false,
    }));
  }, []);

  const navigate = useNavigate();

  const goToOLPage = ()=>{
    navigate("/Ordinarylevelpage")
  }



  const fetchMainActivities = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/Activities");
        const activities = response.data.map(activity => activity.main_activity);
        setMainActivities(activities);
    } catch (error) {
        console.error("Error fetching main activities:", error.message);
    }
};




useEffect(()=>{
   const fetchData=async()=>{
        await fetchMainActivities();
    }
    fetchData();

},[])

  // Send the selected activities to the backend
  const sendToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/Activities', {
        SelectedExtraActivities,
      });

      if (response.status === 200) {
        console.log('Activities Sent Successfully');
      } else {
        console.log('Activities Not Sent Successfully');
      }

      setActivitiesObj(response.data);
      setShowActivitiesSub(true);
    } catch (error) {
      console.log(error, 'Error sending Extra Curricular activities to backend');
    }
  };

  // Increment the current subject index to show the next sub-activity
const indexIncrement = () => {
  setCurrentSubjectIndex((prevIndex) => {
    if (prevIndex < SubActivities.length - 1) {
      // Increment index to show next sub-activity
      return prevIndex + 1;
    } else {
      // If we're at the last index, navigate to the OLevelPage
      goToExtraLevelsPage();
      return prevIndex; // Do nothing further with the index
    }
  });
};

  


  const indexDecrement = () => {
    if(currentSubjectIndex>0){
         setCurrentSubjectIndex((prevIndex) => prevIndex - 1);
    }else{
      goToECListPage()
    }
  };

  const renderBox = () => {
    if (ShowActivitiesSub === true) {
      return <SubActivitiesPage />;
    }else if(showExtraLevelsPage){
      return <ExtraCurricularResults/>
    } else {
      return <ExtraCurricularBox />;
    }
  };

  const renderNavigationBtn = () => {
    if (ShowActivitiesSub === true) {
      return (
        <div className="extra-curricular-back-next-btn">
          <button onClick={() => {indexDecrement()}} className="nextbtn">
            Back
          </button>

          <button onClick={indexIncrement} className="nextbtn">
            Next
          </button>
        </div>
      );
    }else if(showExtraLevelsPage===true){
      return(
      <div className="extra-curricular-back-next-btn">
          <button onClick={()=>goToSubActivities()} className="nextbtn">
            Back
          </button>

          
            <button onClick={()=>{goToOLPage();sendFinalResultsToBE()}} className="nextbtn">
              Submit
            </button>
        </div>
      )

      
    } else {
      return (
        <div className="extra-curricular-back-next-btn">
          <button onClick={() => goToECListPage()} className="nextbtn">
            Back
          </button>

          {SelectedExtraActivities.length > 0 ? (
            <button onClick={async () => await sendToBackend()} className="nextbtn">
              Next
            </button>
          ) : (
            <button onClick={() => { sendToBackend(); goToOLPage(); }} className="nextbtn">
              Skip
            </button>
          )}
        </div> 
      )
    } 
  };


  const sendFinalResultsToBE=()=>{
    try{
      const results = axios.post("http://localhost:3000/api/Activities/results",{
        ActivitiesToSendBE,
        SelectedSubActivities,
        ActivitiesWithoutSub
      })
    }catch(error){
      console.log(error)
    }

  }




  return (
    <div className="extra-curricular-page">
      <div className="extra-curricular-image">
        <Image />
      </div>

      {renderBox()}

      {renderNavigationBtn()}
    </div>
  );
};

export default ExtraCurricularPage;
