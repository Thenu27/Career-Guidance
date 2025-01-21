import './Signin.css'
import { useNavigate } from 'react-router-dom'

const Signin=()=>{

    const navigate = useNavigate();
    const goToSelectOptionPage =()=>{
        navigate('/option')
    }
    return(
        <div className='Singin-page'>
           <div className='Singin-container'>
            <div className='login-group'>
                <label className='login-label'>Email</label>
                <input className='login-input' type='email'></input>
            </div>
               
            <div className='login-group'>
                <label className='login-label'>Password</label>
                <input className='login-input' type='password'></input>
            </div>

            <button onClick={goToSelectOptionPage} className='signin-btn'>Sign In</button>

            </div>
        </div>
    )
}

export default Signin