import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home=()=>{
    const navigate = useNavigate();

    const goToLogin=()=>{
        navigate('/login')
    }
    return(
        <div className='home-container'>
            <div className='login-container'>
                <h1 className='welcome-title'>Welcome to the University Guide Admin Page</h1>
                <div className='login-btn-container'>
                    <button onClick={goToLogin} className='login-btn home-login-btn'>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Home