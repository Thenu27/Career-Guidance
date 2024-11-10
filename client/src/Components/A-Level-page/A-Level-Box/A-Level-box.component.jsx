import './A-Level-box.styles.css';
import { useNavigate } from 'react-router-dom';
import ALevelCategory from '../A-Level-Category/A-Level-Category';
import ALevelStreamBox from '../A-Level-Streams/A-Level-StreamBox';
import ALevelLondonCategory from '../A-Level-London-Category/A-Level-London-Category';
import { useContext, useEffect } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';


const AdvanceLevelBox=()=>{

   const {showALevelMathsLocal,showALevelCategory,setshowALevelCategory,showALevelStreamBox,showLondonALevelCategory} = useContext(ALevelContext)

    const navigate = useNavigate();

    

    const renderALevelBox = ()=>{
        if(showALevelCategory){
            return <ALevelCategory/>
        }else if(showALevelStreamBox){
            return <ALevelStreamBox/>
        }else if(showLondonALevelCategory){
            return <ALevelLondonCategory/>
        }
                
    }


    return(
        <div className='Advance-level-box'>            
            {renderALevelBox()}
        </div>
    )
}

export default AdvanceLevelBox;