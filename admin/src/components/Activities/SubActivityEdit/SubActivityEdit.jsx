import axios from 'axios';
import './SubActivityEdit.css'
import React, { useContext, useEffect, useState } from 'react';
import { ActivitiesContext } from '../../../Context/Activities.context';

const SubActivityEdit = () => {

    const {SelectedSubActivity,setSelectedSubActivity,setSubActivityData,SubActivityData} = useContext(ActivitiesContext);


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
    
    useEffect(()=>{
        fetchSubActivityDetails();
    },[])

    useEffect(() => {
        console.log('SubActivityData', SubActivityData);
      }, [SubActivityData]);
      if (!SubActivityData || SubActivityData.length === 0) {
        return <p>Loading sub-activity data...</p>;
    }
    return (
        <>
        <div className='add-sub-activity-title-container'>
            <h1 className='add-sub-activity-title'>Update Acitvity </h1>
        </div>
          <div className='sub-activity-add-container'>
                <div className='add-sub-activity-input-container'>
                    <label className='add-sub-activity-label'>Sub Acitvity</label>
                    <button className='add-sub-activity-intelligence'>{SubActivityData[0]?.sub_activity}</button>
                </div>

                <div className='add-sub-activity-input-container'>
                    <button className='add-sub-activity-intelligence'>{IdentifyIntelligence(SubActivityData[0]?.mi_1)}</button>
                    <button className='add-sub-activity-score'>{SubActivityData[0]?.mi_percentage1}</button>
                </div>

                <div className='add-sub-activity-input-container'>
                    <button className='add-sub-activity-intelligence'>{IdentifyIntelligence(SubActivityData[0]?.mi_2)}</button>
                    <button className='add-sub-activity-score'>{SubActivityData[0]?.mi_percentage2}</button>
                </div>

                <div className='add-sub-activity-input-container'>
                    <button className='add-sub-activity-intelligence'>{IdentifyIntelligence(SubActivityData[0]?.mi_3)}</button>
                    <button className='add-sub-activity-score'>{SubActivityData[0]?.mi_percentage3}</button>
                </div>
          </div>
        </>

    );
};

export default SubActivityEdit;