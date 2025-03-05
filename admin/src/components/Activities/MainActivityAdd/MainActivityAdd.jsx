import React from 'react';
import './MainActivityAdd.css';

const MainActivityAdd = () => {
    return (
        <>

        <div className='login-container add-main-activity-container'>
        <div className='add-main-activity-title-container'>
             <h1 className='add-main-activity-title'>Main Activity Add</h1>
        </div>
           <div className='add-main-activity-input-container'>
                <label className='ol-input-label'>Enter New Main Activity</label>
                <input className='add-main-activity-input' type='text'placeholder='Activity Name' />
           </div>
           <div className='add-main-activity-btn-container'>
            <button className='login-btn add-question-btn'>Add Main Activity</button>
           </div>
        </div>
        </>

    );
};

export default MainActivityAdd;