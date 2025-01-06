import './Extra-Curricular-Box.styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';

const ExtraCurricularBox=()=>{

    const {
        SelectedExtraActivities,
        setSelectedExtraActivities,
        ActivitiesObj,
        ActivitiesWithSub,
        showSubActivities,
        SubActivities,
        setSubActivities,
        goToExtraLevelsPage,
        setshowSubActivities,
        currentSubjectIndex,
        setCurrentSubjectIndex,
        ShowActivitiesSub,
        setShowActivitiesSub,
        selectedButtons,
        setselectedButtons,
        SelectedSubActivities,
        setSelectedSubActivities
} =useContext(ActivitiesContext);


    const [MainActivities, setMainActivities] = useState([]); // Track MainActivities with useState
      // State to track the current subject index and completed status


    useEffect(()=>{
        setSelectedSubActivities([]);
        setSelectedExtraActivities([]);

    },[])
    
    useEffect(()=>{
        setselectedButtons(SelectedExtraActivities)
    },[SelectedExtraActivities])

    // useEffect(()=>{
    //     setSelectedExtraActivities(selectedButtons)
    // },[selectedButtons])
    
   const btnSelectedHandler = (activity)=>{ 

        if(selectedButtons.includes(activity)){
            setselectedButtons(selectedButtons.filter(item=>item!==activity));
            setSelectedExtraActivities(selectedButtons.filter(item=>item!==activity));
        }else{
            setselectedButtons([...selectedButtons,activity])
            setSelectedExtraActivities([...selectedButtons,activity]);

        }

}







useEffect(()=>{
    console.log(ShowActivitiesSub)
},[ShowActivitiesSub])



useEffect(()=>{
    console.log(selectedButtons)

},[selectedButtons])







useEffect(()=>{
    console.log("SubActivities",SubActivities)
},[SubActivities])







    return(
    <>
    
        <div className='extra-curricular-title-container'>
        <h2 className='extra-curricular-title'>Select the Extra Curricular Activities you have done from the following</h2>
    </div>
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container'>
                
                    {MainActivities.map((activity,index)=>{
                        return <button 
                                    key={index} 
                                    onClick={()=>btnSelectedHandler(activity)}
                                    className={`extra-curricular-btn ${selectedButtons.includes(activity)? "extra-curricular-btn-selected":""}`}>
                                    {activity}
                                </button>
                    })}

                </div>
            </div>

            
            </>
    )
}

export default ExtraCurricularBox;