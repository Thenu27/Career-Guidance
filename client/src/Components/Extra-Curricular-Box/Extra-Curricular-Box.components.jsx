import './Extra-Curricular-Box.styles.css';
import { ExtraCurricularList } from '../../Extra-Curricular-List';
import { useState } from 'react';

const ExtraCurricularBox=({setSelectedExtraActivities,SelectedExtraActivities})=>{

    const[selectedButtons,setselectedButtons] = useState([]);
    
   const btnSelectedHandler = (activity)=>{ 

        if(selectedButtons.includes(activity)){
            setselectedButtons(selectedButtons.filter(item=>item!==activity));
            setSelectedExtraActivities(selectedButtons.filter(item=>item!==activity));
        }else{
            setselectedButtons([...selectedButtons,activity])
            setSelectedExtraActivities([...selectedButtons,activity]);

        }

}




    return(
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container'>

                    {ExtraCurricularList.map((activity,index)=>{
                        return <button 
                                    key={index} 
                                    onClick={()=>btnSelectedHandler(activity)}
                                    className={`extra-curricular-btn ${selectedButtons.includes(activity)? "extra-curricular-btn-selected":""}`}>
                                    {activity}
                                </button>
                    })}

                </div>
            </div>
    )
}

export default ExtraCurricularBox;