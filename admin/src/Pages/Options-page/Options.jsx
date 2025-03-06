import './Options.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALevelContext } from '../../Context/ALevel.context';
import { useContext, useEffect } from 'react';

const Options=()=>{

    const {ALevelLocalSubjects,setALevelLocalSubjects} = useContext(ALevelContext)

    const navigate = useNavigate();

    const goToIntelligence=()=>{
        navigate('/admin/intelligence')
    }

    const goToOLevelPage=()=>{
        navigate('/admin/ordinarylevel')
    }

    const goToActivitiesPage =()=>{
        navigate('/admin/activities')
    }

    const goToALevelPage =()=>{
        navigate('/admin/advancedlevel')
    }

    const goToCareerPage=()=>{
        navigate('/admin/careerfield')
    }


    return(
        <div className='home-container'>
            <div className='login-container options-container'>
                <div className='options-title-container'>
                     <h1 className='options-title'>Want to Update?</h1>
                </div>
                <div className='options-btn-container'>
                    <button onClick={ goToIntelligence} className='login-btn options-btn'> Questions</button>
                    <button onClick={goToOLevelPage} className='login-btn options-btn'> O/Level Subjects</button>
                    <button onClick={goToALevelPage} className='login-btn options-btn'> A/L Subjects</button>
                    <button onClick={goToActivitiesPage} className='login-btn options-btn'>Activities</button>
                    <button onClick={goToCareerPage} className='login-btn options-btn'>Careers</button>
                </div>


            </div>

        </div>
    )
}

export default Options