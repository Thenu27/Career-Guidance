import './Options.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ALevelContext } from '../../Context/ALevel.context';
import { useContext, useEffect } from 'react';

const Options=()=>{

    const {ALevelLocalSubjects,setALevelLocalSubjects} = useContext(ALevelContext)

    const navigate = useNavigate();

    const goToIntelligence=()=>{
        navigate('/intelligence')
    }

    const goToOLevelPage=()=>{
        navigate('/ordinarylevel')
    }

    const goToActivitiesPage =()=>{
        navigate('/activities')
    }

    const goToALevelPage =()=>{
        navigate('/advancedlevel')
    }

    const goToCareerPage=()=>{
        navigate('/admin/careerfield')
    }


    return(
        <div className='options-page'>
            <h1 className='welcome-title'>What do you want to do</h1>
            <div className='options-container'>
                <button onClick={ goToIntelligence} className='login-btn'>Update Questions</button>
                <button onClick={goToOLevelPage} className='login-btn'>Update O/Level Subjects</button>
                <button onClick={goToALevelPage} className='login-btn'>Update A/L Subjects</button>
                <button onClick={goToActivitiesPage} className='login-btn'>Update Extra Curricular Activities</button>
                <button onClick={goToCareerPage} className='login-btn'>Update Careers</button>


            </div>

        </div>
    )
}

export default Options