import './Options.css'
import { useNavigate } from 'react-router-dom'

const Options=()=>{
    const navigate = useNavigate();

    const goToIntelligence=()=>{
        navigate('/intelligence')
    }
    return(
        <div className='options-page'>
            <h1 className='welcome-title'>What do you want to do</h1>
            <div className='options-container'>
                <button onClick={ goToIntelligence} className='login-btn'>Update Questions</button>
                <button className='login-btn'>Update O/Level Subjects</button>
                <button className='login-btn'>Update A/L Subjects</button>
                <button className='login-btn'>Update Extra Curricular Activities</button>
                <button className='login-btn'>Update Careers</button>


            </div>

        </div>
    )
}

export default Options