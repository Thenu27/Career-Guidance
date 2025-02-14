import axios from 'axios';
import './SubActivityEdit.css'
import React, { useContext, useEffect, useState } from 'react';
import { ActivitiesContext } from '../../../Context/Activities.context';
import DeleteIcon from '../../../assets/icon.svg'

const SubActivityEdit = () => {

    const {SelectedSubActivity,setSelectedSubActivity,setSubActivityData,SubActivityData} = useContext(ActivitiesContext);

    const [Edit,setEdit] = useState(false);

    const [Score1,setScore1] = useState('Loading')
    const [Score2,setScore2] = useState('Loading')
    const [Score3,setScore3] = useState('Loading')

    const [SubActivityName,setSubActivityName] = useState()

 


    const IdentifyIntelligence = (value) => {
        switch (value) {
            case 1: return 'Logical-Mathematical';
            case 2: return 'Linguistic';
            case 3: return 'Spatial';
            case 4: return 'Musical';
            case 5: return 'Bodily-Kinesthetic';
            case 6: return 'Interpersonal';
            case 7: return 'Intrapersonal';
            case 8: return 'Naturalistic';
            case 9: return 'Existential';
            default: return 'Unknown';
        }
    };

    const [Intelligence1,setIntelligence1] = useState('Loading')    
    const [Intelligence2,setIntelligence2] = useState('Loading')
    const [Intelligence3,setIntelligence3] = useState('Loading')


    useEffect(()=>{
        if(SubActivityData[0]){
        setIntelligence1(IdentifyIntelligence(SubActivityData[0].mi_1))
        setIntelligence2(IdentifyIntelligence(SubActivityData[0].mi_2))
        setIntelligence3(IdentifyIntelligence(SubActivityData[0].mi_3))
    
        setScore1((SubActivityData[0].mi_percentage1))
        setScore2((SubActivityData[0].mi_percentage2))
        setScore3((SubActivityData[0].mi_percentage3))
    
        setSubActivityName(SubActivityData?(SubActivityData[0].sub_activity):'No Data selected')
        }
    
    },[SubActivityData])

    const fetchSubActivityDetails = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_URL}/api/admin/subactivity/details`, 
                { SelectedSubActivity }
            );
            setSubActivityData(response.data);
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 2xx
                console.error('Server Error:', err.response.data);
                alert(`Error: ${err.response.data.error || 'Something went wrong on the server'}`);
            } else if (err.request) {
                // Request was made but no response received
                console.error('No Response:', err.request);
                alert('No response from the server. Please check your connection or try again later.');
            } else {
                // Something happened in setting up the request
                console.error('Request Setup Error:', err.message);
                alert('An error occurred while setting up the request.');
            }
        }
    };

    const sendSubjectToDelete = async (activity_id) => {
        try {
            // Make the POST request to delete the subject using subject_id and subject name
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/sub-activity/delete`, {
                activity_id
            });

            // Check if the deletion was successful and notify the user
            if (response.status === 200 && response.data === 'Sub Activity Deleted') {
                alert('Subject deleted successfully');
                console.log('Response:', response.data);
            } else {
                alert('Failed to delete subject. Please try again.');
            }
        } catch (error) {
            // Handle errors, displaying server-provided messages if available
            if (error.response && error.response.data) {
                console.error('Server Error:', error.response.data);
                alert(`Error: ${error.response.data}`);
            } else {
                console.error('Error when deleting subject:', error);
                alert('An error occurred while deleting the subject. Please try again later.');
            }
        }
    };

    // Handle the delete confirmation and trigger the delete request
    const handleDelete = async (activity_id) => {
        // Ask for user confirmation before proceeding with deletion
        if (window.confirm('Do you want to delete this subject?\n\nThis action cannot be undone.')) {
            await sendSubjectToDelete(activity_id);
        }
    };

    
    useEffect(()=>{
        fetchSubActivityDetails();
    },[])

    useEffect(() => {
        console.log('SubActivityData', SubActivityData);
      }, [SubActivityData]);
      if (!SubActivityData || SubActivityData.length === 0) {
        return <p>Loading sub-activity data...</p>;
    }

    useEffect(()=>{
        console.log('Intelligence 01',Intelligence1)
    },[Intelligence1])

    const dropdownData=(index)=>{
        return(
            <ul className="dd-menu">
                <li onClick={()=>handleIntelligenceChange('Logical-Mathematical Intelligence',index)}>Logical-Mathematical Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Linguistic Intelligence',index)}>Linguistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Spatial Intelligence',index)}>Spatial Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Musical Intelligence',index)}>Musical Intelligence</li>                                     
                <li onClick={()=>handleIntelligenceChange('Bodily-Kinesthetic Intelligence',index)}>Bodily-Kinesthetic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Interpersonal Intelligence',index)}>Interpersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Intrapersonal Intelligence',index)}>Intrapersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Naturalistic Intelligence',index)}>Naturalistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Existential Intelligence',index)}>Existential Intelligence</li>

            </ul>
        )
    }

    const handleEditClick = ()=>{
        setEdit(true);
    }

    const handleIntelligenceChange=(value,index)=>{
        if(index===1){
           setIntelligence1(value)
           return
        }
        if(index===2){
           setIntelligence2(value)
           return
        }
        if(index===3){
           setIntelligence3(value)
           return
        }
   }
    
   const handleOnChange=(value,scoreIndex)=>{
    if(scoreIndex===1){
        setScore1(value)
        return
    }
    if(scoreIndex===2){
        setScore2(value)
        return
    }
    if(scoreIndex===3){
        setScore3(value)
        return
    }
    if(scoreIndex===0){
        setSubActivityName(value)
    }
}

const sendToBackEnd=async()=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/sub-activity/update`,{
            Intelligence1,
            Intelligence2,
            Intelligence3,
            Score1,
            Score2,
            Score3,
            SubActivityName
        });
        if(response.data==='Sub-Activity Updated Succesfully'){
            alert('Sub-Activity Updated Succesfully')
        }
    }catch(error){
        console.log(error)
    }

}

const updateSubject=async()=>{
    if(SubActivityName===''){
        alert('Please Enter A Valid Sub-Activity Name');
        return
    }
    if(Score1===''){
        alert('Please Enter A Valid MI Score 1');
        return
    }
    if(Score2===''){
        alert('Please Enter A Valid MI Score 2');
        return
    }
    if(Score3===''){
        alert('Please Enter A Valid MI Score 3');
        return
    }
    if(window.confirm('Are you sure you want to update the subject \n This Action Cannot Be Undone')){
        await sendToBackEnd();
        return
    }
    return
}

    return (
        <>

        <div className='add-sub-activity-title-container'>
            <h1 className='add-sub-activity-title'>Update Acitvity </h1>
        </div>
          <div className='sub-activity-add-container'>
                <div className='add-sub-activity-input-container'>
                    <label className='add-sub-activity-label'>Sub Acitvity</label>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,0)} type='text' value={SubActivityName}  className='alevel-update-input-subject'/>:
                        <button className='alevel-update-intelligene'>{SubActivityName}</button>}
                          </div>

                <div className='add-sub-activity-input-container'>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence1}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(1)}

                                </label>: 
                                <button className='add-sub-activity-intelligence'>{Intelligence1}</button> }
                    
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)} type='number' value={Score1} className='alevel-update-score'/>:
                     <button className='add-sub-activity-score'>{Score1}</button>}

                </div>

                <div className='add-sub-activity-input-container'>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence2}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(2)}

                                </label>: 
                                <button className='add-sub-activity-intelligence'>{Intelligence2}</button> }
                    
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,2)} type='number' value={Score2} className='alevel-update-score'/>:
                     <button className='add-sub-activity-score'>{Score2}</button>}

                </div>

                <div className='add-sub-activity-input-container'>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence3}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(3)}

                                </label>: 
                                <button className='add-sub-activity-intelligence'>{Intelligence3}</button> }
                    
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,3)} type='number' value={Score3} className='alevel-update-score'/>:
                     <button className='add-sub-activity-score'>{Score3}</button>}

                </div>

                <div className='sub-activities-btn-container'>

                 <div className='sub-activities-edit-btn-container'>
                    {Edit?<button onClick={updateSubject} className='sub-activities-edit-btn'>Update</button>:
                    <button onClick={handleEditClick} className='sub-activities-edit-btn'>Edit</button>}
                 </div>   

                <div className='ol-delete-container sub-activities-delete-container'>
                    <button
                        className='login-btn ol-delete-btn'
                        onClick={()=>handleDelete(SubActivityData[0]?.sub_activity_id)}
                    >
                        Delete
                    </button>
                    <img
                        onClick={()=>handleDelete(SubActivityData[0]?.sub_activity_id)}

                        className='ol-delete-icon'
                        src={DeleteIcon}
                        alt="Delete icon"
                    />
                </div>
                </div>

          </div>
        </>

    );
};

export default SubActivityEdit;