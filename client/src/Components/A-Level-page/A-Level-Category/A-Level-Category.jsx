import './A-Level-Category.css';
import { useContext,useEffect } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ALevelCategory=()=>{
    const {setALSubjectsFromDB,ALSubjectsFromDB} = useContext(ALevelContext);

    
 
    

    useEffect(()=>{
        console.log(ALSubjectsFromDB)
    },[ALSubjectsFromDB])
    
    const navigate = useNavigate();

    const goToOLevelPage = ()=>{
        navigate("/Ordinarylevelpage")
    }

    const goToCalculatingPage=()=>{
        navigate("/CalculatePage")
    }

    const {goToStreams,goToALevelLondonCategory} = useContext(ALevelContext);

    return(
        <>  
        <div className='O-level-box-title-container'>
            <h2 className='O-level-box-title'>Select Advanced Level Category ftom the foloowing</h2>
        </div>
        <div className='O-level-box'>
           <div className='O-level-btn-container'>

                <button onClick={goToStreams} className='O-level-btn'>Local</button>
                <button onClick={goToALevelLondonCategory} className='O-level-btn'>London</button>
                <button onClick={goToCalculatingPage} className='O-level-btn'>Havent Done</button>
            </div>
            <div className='O-level-box-back-btn'>
                    <button onClick={goToOLevelPage} className='nextbtn'>Back</button>
            </div>

        </div>
        


        </>
    )
}

export default ALevelCategory;