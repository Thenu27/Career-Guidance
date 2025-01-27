import './ALevelSubjects.css';
import { ALevelContext } from '../../../Context/ALevel.context';
import { useContext, useEffect, useState } from 'react';

const ALevelSubjects =()=>{

    const {ALevelLocalSubjects} =useContext(ALevelContext);

    useEffect(()=>{
        console.log("ALevelLocalSubjects",ALevelLocalSubjects)
    },[])

    return(
        <>
        <div className='ol-header'>
            <p className='welcome-title olevel-title '>This is the Alevel subjects</p>
                {/* <div  className='switch-container'>
                  <button className='login-btn switch-btn'></button>

                </div> */}
        </div>

       


        <div className='subject-container ol-subject-container'>
            <div className='subject-inner-container'>
                {/* {ShowSubjects().map((subj,index)=>{
                    return<button onClick={()=>{goToUpdatePage();SelectedButton(index);}} className='subject' key={index}>{subj.subjects}</button>
                })} */}
            </div>
            <div className='add-ol-subject-container'>
                <button className=' login-btn add-ol-subject-btn'> Add subject</button>
            </div>

        </div> 
        </>
    )
}

export default ALevelSubjects