import './Extra-Curricular-Box.styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';

const ExtraCurricularBox=()=>{

    const {SelectedExtraActivities,
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
setselectedButtons
} =useContext(ActivitiesContext);


    const [MainActivities, setMainActivities] = useState([]); // Track MainActivities with useState
      // State to track the current subject index and completed status



    
    useEffect(()=>{
        setselectedButtons(SelectedExtraActivities)
    },[SelectedExtraActivities])


    
   const btnSelectedHandler = (activity)=>{ 

        if(selectedButtons.includes(activity)){
            setselectedButtons(selectedButtons.filter(item=>item!==activity));
            setSelectedExtraActivities(selectedButtons.filter(item=>item!==activity));
        }else{
            setselectedButtons([...selectedButtons,activity])
            setSelectedExtraActivities([...selectedButtons,activity]);

        }

}




const fetchMainActivities = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/Activities");
        const activities = response.data.map(activity => activity.main_activity);
        setMainActivities(activities);
    } catch (error) {
        console.error("Error fetching main activities:", error.message);
    }
};



// useEffect(()=>{
//     SubjectTobeShown();
// },[SubActivities])




useEffect(()=>{
   const fetchData=async()=>{
        await fetchMainActivities();
    }
    fetchData();

},[])


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