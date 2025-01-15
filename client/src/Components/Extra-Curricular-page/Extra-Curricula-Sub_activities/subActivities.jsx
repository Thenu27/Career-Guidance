import { useEffect} from 'react';
import { useContext } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';
import './subActivities.css'

const SubActivitiesPage = () => {
  const {
    ActivitiesObj,
    SubActivities,
    setSubActivities,
    currentSubjectIndex,
    ActivitiesWithoutSub,
    setActivitiesWithoutSub,
    setselectedButtons,
    selectedButtons,
    setSelectedSubActivities,
    SelectedSubActivities
    
  } = useContext(ActivitiesContext);






  useEffect(()=>{
    console.log("ActivitiesWithoutSub",ActivitiesWithoutSub)
  },[ActivitiesWithoutSub])







  useEffect(() => {
    const handleActivity = () => {

        const ActivititesWithUndefinedSubActivity = Object.entries(ActivitiesObj)
        .filter(([key, value]) => value.subActivity === undefined)
        .map(([key, value]) => key);
      
        setActivitiesWithoutSub(ActivititesWithUndefinedSubActivity);
        
      const filteredActivityWithSub = Object.fromEntries(
        Object.entries(ActivitiesObj).filter(
          ([key, value]) => value && Array.isArray(value.subActivity) && value.subActivity.length > 0
        )
      );

      const result = Object.values(filteredActivityWithSub)
        .map((item) => item.subActivity)
        .filter((sub) => sub.length > 0);

      setSubActivities(result); // Set the sub-activities
    };
    handleActivity(); // Call the function to set sub-activities
  }, [ActivitiesObj, setSubActivities]);







  // Render the sub-activities based on the current subject index
  const renderSubActivities = () => {
    if (Array.isArray(SubActivities) && SubActivities.length > 0) {
      return SubActivities[currentSubjectIndex]; // Display the sub-activities for the current subject index
    } else {
      return []; // Return an empty array if no sub-activities
    }
  };








const btnSelectedHandler = (activity)=>{ 

    if(selectedButtons.includes(activity)){
        setselectedButtons(selectedButtons.filter(item=>item!==activity));
        setSelectedSubActivities(SelectedSubActivities.filter(item=>item!==activity));
    }else{
        setselectedButtons([...selectedButtons,activity])
        setSelectedSubActivities([...SelectedSubActivities,activity])

    }

}








useEffect(()=>{
    console.log("SelectedMainActivities",SelectedSubActivities)
},[SelectedSubActivities])








  return (
    <>
      <div className="extra-curricular-title-container">
        <h2 className="extra-curricular-title">
          Select the Extra Curricular Activities you have done from the following
        </h2>
      </div>
      <div className="extra-curricular-container">
        <div className="extra-curricular-btn-container sab-container">
          {renderSubActivities().length > 0 ? (
            renderSubActivities().map((activity, index) => (
              <button key={index} onClick={()=>btnSelectedHandler(activity)} 
              className={`extra-curricular-btn sab ${selectedButtons.includes(activity)? "extra-curricular-btn-selected sab":""}`}>
                {activity}
              </button>
            ))
          ) : (
            <p>No sub-activities available.</p> // Fallback message when no sub-activities
          )}
        </div>
      </div>
    </>
  );
};

export default SubActivitiesPage;
