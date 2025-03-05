import React, { useEffect, useContext } from 'react';
import './SubActivites.css';
import { ActivitiesContext } from '../../../Context/Activities.context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../../assets/icon.svg';

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

  
  const sendSubjectToDelete = async (activity) => {
    try {
        // Make the POST request to delete the subject using subject_id and subject name
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/main-activity/delete`, {
            activity
        });

        // Check if the deletion was successful and notify the user
        if (response.status === 200 && response.data === 'Main Activity Deleted') {
            alert(`${activity} - Activity deleted successfully`);
            console.log('Response:', response.data);
        } else {
            alert('Failed to delete Main Activity. Please try again.');
        }
    } catch (error) {
        // Handle errors, displaying server-provided messages if available
        if (error.response && error.response.data) {
            console.error('Server Error:', error.response.data);
            alert(`Error: ${error.response.data}`);
        } else {
            console.error('Error when deleting Main Activity:', error);
            alert('An error occurred while deleting Main Activity. Please try again later.');
        }
    }
};

  const handleDelete=async(activity)=>{
    if(window.confirm(`Do You want to Delete - ${activity}\n This cannot be undone`)){
      await sendSubjectToDelete(activity);
    }else{
      return
    }
  }

  return (
    <>

      <div className='login-container sub-activities-container'>

      <div className='sub-acitvities-title-container'>
        <h1 className='sub-acitvities-title'>Sub Activities</h1>
      </div>
        {SubActivities.length === 0 ? (
          <p>No sub-activities available. Please select a main activity or add new ones.</p>
        ) : (
          <div className='sub-activities-inner-container'>
            {SubActivities.map((activity) => (
              <button onClick={()=>{goToUpdateSubActivity();handleClick(activity.sub_activity)}} key={activity.id} className='login-btn sub-activity-btn'>
                {activity.sub_activity}
              </button>
            ))}
          </div>
        )}

        <div className='add-activity-add-delete-container'>
            <div className='add-sub-acitvity-btn-container'>
              <button onClick={goToSubActivityAdd} className='add-sub-activity-btn'>Add Sub Activity</button>
            </div>
            <div className='add-sub-acitvity-btn-container'>
              <button className='login-btn ol-delete-btn sub-activity-delete-btn' onClick={()=>{handleDelete(SelectedMainActivity)}}>Delete </button>

            </div>
       </div>
        </div>

    </>
  );
};

export default SubActivities;
