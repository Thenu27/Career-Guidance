import { useNavigate } from 'react-router-dom';
import './intelligence.css'

const IntelligencePage =()=>{

    const navigate = useNavigate()
    const goToSelectOptionPage=()=>{
        navigate('/option')
    }
    return(
        <div >
            <h1 className='welcome-title intelligence-title'>Select the Question Category you want to Update</h1>
        <div className='intelligence-container'>
            <button className='login-btn option-intelligence-btn' value={1}>Logical-Mathematical</button>
            <button className='login-btn option-intelligence-btn' value={2}>Linguistic</button>
            <button className='login-btn option-intelligence-btn' value={3}>Spatial</button>
            <button className='login-btn option-intelligence-btn' value={4}>Musical</button>
            <button className='login-btn option-intelligence-btn' value={9}>Existential</button>
            <button className='login-btn option-intelligence-btn' value={6}>Interpersonal</button>
            <button className='login-btn option-intelligence-btn' value={7}>Intrapersonal</button>
            <button className='login-btn option-intelligence-btn' value={5}>Bodily-kinesthetic</button>
            <button className='login-btn option-intelligence-btn' value={8}>Naturalistic</button>

        </div>
        <button className='login-btn ' onClick={goToSelectOptionPage}>Back</button>
        </div>

    )
}

export default IntelligencePage;