import React, { useEffect, useContext } from 'react';
import './SubActivites.css';
import { ActivitiesContext } from '../../../Context/Activities.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubActivities = () => {
  const { SelectedMainActivity, SubActivities, setSubActivities,SelectedSubActivity,setSelectedSubActivity } = useContext(ActivitiesContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SelectedActivity in sub', SelectedMainActivity);
  }, [SelectedMainActivity]); // Track changes to SelectedMainActivity

  const fetchSubActivities = async () => {
    if (!SelectedMainActivity) {
      console.log('No selected main activity to fetch sub-activities');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/admin/subactivities`,
        { SelectedMainActivity }
      );
      console.log(response.data);
      setSubActivities(response.data);
    } catch (error) {
      console.error('Error fetching sub-activities:', error);
    }
  };

  useEffect(() => {
    fetchSubActivities(); // Fetch whenever SelectedMainActivity changes
  }, [SelectedMainActivity]); // Fix dependency issue

  useEffect(() => {
    console.log('SelectedSubActivity',SelectedSubActivity);
  }, [SelectedSubActivity]);

  const goToUpdateSubActivity=()=>{
    navigate('/activities/sub-activity-update')
  }

  const handleClick=(value)=>{
    setSelectedSubActivity(value)
  }

  const goToSubActivityAdd=()=>{
    navigate('/activities/sub-activity-add')
  }

  return (
    <>
      <div className='sub-acitvities-title-container'>
        <h1 className='sub-acitvities-title'>Sub Activities</h1>
      </div>
      <div className='sub-activities-container'>
        {SubActivities.length === 0 ? (
          <p>No sub-activities available. Please select a main activity or add new ones.</p>
        ) : (
          <div className='sub-activities-inner-container'>
            {SubActivities.map((activity) => (
              <button onClick={()=>{goToUpdateSubActivity();handleClick(activity.sub_activity)}} key={activity.id} className='sub-activity-btn'>
                {activity.sub_activity}
              </button>
            ))}
          </div>
        )}
        <div className='add-activity-btn-container'>
          <button onClick={goToSubActivityAdd} className='login-btn add-activity-btn'>Add Sub Activity</button>
        </div>
      </div>
    </>
  );
};

export default SubActivities;
