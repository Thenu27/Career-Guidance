import { useEffect, useContext } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';
import './subActivities.css';

const SubActivitiesPage = () => {
  // Accessing context values
  const {
    ActivitiesObj, // Object containing all activities
    SubActivities, // Stores sub-activities filtered from ActivitiesObj
    setSubActivities, // Function to set sub-activities
    currentSubjectIndex, // Index for selecting sub-activities
    ActivitiesWithoutSub, // Activities that have no sub-activities
    setActivitiesWithoutSub, // Function to update activities without sub-activities
    setselectedButtons, // Function to update selected buttons
    selectedButtons, // List of selected activities
    setSelectedSubActivities, // Function to update selected sub-activities
    SelectedSubActivities // List of selected sub-activities
  } = useContext(ActivitiesContext);

  // Log activities without sub-activities for debugging
  // useEffect(() => {
  //   console.log("ActivitiesWithoutSub", ActivitiesWithoutSub);
  // }, [ActivitiesWithoutSub]);

  // Effect to process activities and categorize them into those with and without sub-activities
  useEffect(() => {
    const handleActivity = () => {
      // Filtering activities that have no sub-activities (subActivity === undefined)
      const ActivititesWithUndefinedSubActivity = Object.entries(ActivitiesObj)
        .filter(([key, value]) => value.subActivity === undefined)
        .map(([key]) => key);
      
      setActivitiesWithoutSub(ActivititesWithUndefinedSubActivity); // Store activities without sub-activities
      
      // Filtering activities that have sub-activities
      const filteredActivityWithSub = Object.fromEntries(
        Object.entries(ActivitiesObj).filter(
          ([key, value]) => value && Array.isArray(value.subActivity) && value.subActivity.length > 0
        )
      );

      // Extracting sub-activities from the filtered activities
      const result = Object.values(filteredActivityWithSub)
        .map((item) => item.subActivity)
        .filter((sub) => sub.length > 0);

      setSubActivities(result); // Store sub-activities in state
    };

    handleActivity(); // Call function to categorize activities
  }, [ActivitiesObj, setSubActivities]);

  // Function to render sub-activities based on the current subject index
  const renderSubActivities = () => {
    if (Array.isArray(SubActivities) && SubActivities.length > 0) {
      return SubActivities[currentSubjectIndex]; // Return sub-activities for the current subject index
    } else {
      return []; // Return an empty array if no sub-activities exist
    }
  };

  // Function to handle button selection and update selected sub-activities
  const btnSelectedHandler = (activity) => {
    if (selectedButtons.includes(activity)) {
      // Remove activity from selected buttons and sub-activities if already selected
      setselectedButtons(selectedButtons.filter(item => item !== activity));
      setSelectedSubActivities(SelectedSubActivities.filter(item => item !== activity));
    } else {
      // Add activity to selected buttons and sub-activities if not selected
      setselectedButtons([...selectedButtons, activity]);
      setSelectedSubActivities([...SelectedSubActivities, activity]);
    }
  };

  // Log selected sub-activities for debugging
  // useEffect(() => {
  //   console.log("SelectedMainActivities", SelectedSubActivities);
  // }, [SelectedSubActivities]);

  return (
    <>
      {/* Title Section */}
      <div className="extra-curricular-title-container">
        <h2 className="extra-curricular-title">
          Select the Extra Curricular Activities you have done from the following
        </h2>
      </div>

      {/* Sub-Activities Selection Container */}
      <div className="extra-curricular-container">
        <div className="extra-curricular-btn-container sab-container">
          {renderSubActivities().length > 0 ? (
            renderSubActivities().map((activity, index) => (
              <button 
                key={index} 
                onClick={() => btnSelectedHandler(activity)} 
                className={`extra-curricular-btn sab ${
                  selectedButtons.includes(activity) ? "extra-curricular-btn-selected sab" : ""
                }`}
              >
                {activity}
              </button>
            ))
          ) : (
            <p>No sub-activities available.</p> // Display message if no sub-activities exist
          )}
        </div>
      </div>
    </>
  );
};

export default SubActivitiesPage;
