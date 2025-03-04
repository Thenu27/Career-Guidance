import './Extra-Curricular-page.css';

// Importing necessary dependencies
import ExtraCurricularBox from './Extra-Curricular-Box/Extra-Curricular-Box.components';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { ActivitiesContext } from '../../context/Activities.context';
import axios from 'axios';
import ExtraCurricularResults from './Extra-Curricular-results/Extra-Curricular-Results';
import SubActivitiesPage from './Extra-Curricula-Sub_activities/subActivities';

const ExtraCurricularPage = () => {
  // Accessing context values
  const { setVisitedPages } = useContext(ProgressContext);

  const {
    showExtraLevelsPage, // Boolean to show the Extra Levels page
    goToECListPage, // Function to navigate to extra-curricular list page
    goToExtraLevelsPage, // Function to navigate to extra-curricular levels page
    goToSubActivities, // Function to navigate to sub-activities page
    SelectedExtraActivities, // Selected extra-curricular activities
    setActivitiesObj, // Function to update activities object
    setShowActivitiesSub, // Function to show sub-activities section
    ShowActivitiesSub, // Boolean flag to determine if sub-activities should be shown
    currentSubjectIndex, // Index for managing selected sub-activities
    setCurrentSubjectIndex, // Function to update subject index
    SubActivities, // Stores sub-activities
    ActivitiesToSendBE, // Stores activities to be sent to backend
    SelectedSubActivities, // Stores selected sub-activities
    ActivitiesWithoutSub, // Stores activities without sub-activities
    setMainActivities, // Function to set main activities
  } = useContext(ActivitiesContext);

  // Mark pages as visited when this page loads
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

  // Hook for navigation
  const navigate = useNavigate();

  // Navigation functions
  const goToOptionsPage = () => {
    navigate("/Option");
  };

  const goToOLPage = () => {
    navigate("/Ordinarylevelpage");
  };

  // Function to fetch main activities from backend
  const fetchMainActivities = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/Activities`);
      const activities = response.data.map((activity) => activity.main_activity);
      setMainActivities(activities);
    } catch (error) {
      console.error("Error fetching main activities:", error.message);
    }
  };

  // Fetch main activities when component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchMainActivities();
    };
    fetchData();
  }, []);

  // Function to send selected extra-curricular activities to backend
  const sendToBackend = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/Activities`,
        { SelectedExtraActivities }
        
      );

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

  // Function to increment subject index or navigate to extra levels page
  const indexIncrement = () => {
    setCurrentSubjectIndex((prevIndex) => {
      if (prevIndex < SubActivities.length - 1) {
        return prevIndex + 1;
      } else {
        goToExtraLevelsPage();
        return prevIndex;
      }
    });
  };

  // Function to decrement subject index or navigate to extra-curricular list page
  const indexDecrement = () => {
    if (currentSubjectIndex > 0) {
      setCurrentSubjectIndex((prevIndex) => prevIndex - 1);
    } else {
      goToECListPage();
    }
  };

  // Function to determine which component to render
  const renderBox = () => {
    if (ShowActivitiesSub) {
      return <SubActivitiesPage />;
    } else if (showExtraLevelsPage) {
      return <ExtraCurricularResults />;
    } else {
      return <ExtraCurricularBox />;
    }
  };

  // Function to render navigation buttons
  const renderNavigationBtn = () => {
    if (ShowActivitiesSub) {
      return (
        <div className="extra-curricular-back-next-btn">
          <button onClick={() => indexDecrement()} className="nextbtn">Back</button>
          <button onClick={indexIncrement} className="nextbtn">Next</button>
        </div>
      );
    } else if (showExtraLevelsPage) {
      return (
        <div className="extra-curricular-back-next-btn">
          <button onClick={() => goToSubActivities()} className="nextbtn">Back</button>
          <button onClick={() => { goToOLPage(); sendFinalResultsToBE(); }} className="nextbtn">Submit</button>
        </div>
      );
    } else {
      return (
        <div className="extra-curricular-back-next-btn">
          <button onClick={() => goToOptionsPage()} className="nextbtn">Back</button>
          {SelectedExtraActivities.length > 0 ? (
            <button onClick={async () => await sendToBackend()} className="nextbtn">Next</button>
          ) : (
            <button onClick={() => { sendToBackend(); goToOLPage(); }} className="nextbtn">Skip</button>
          )}
        </div>
      );
    }
  };

  // Function to send final results to backend
  const sendFinalResultsToBE = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/api/Activities/results`,
        {
          ActivitiesToSendBE,
          SelectedSubActivities,
          ActivitiesWithoutSub,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="extra-curricular-page">
      {/* Image Section */}
      <div className="extra-curricular-image">
        <Image />
      </div>

      {/* Render different components based on state */}
      {renderBox()}

      {/* Render navigation buttons */}
      {renderNavigationBtn()}
    </div>
  );
};

export default ExtraCurricularPage;
