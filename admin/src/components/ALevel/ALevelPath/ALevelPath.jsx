import './ALevelPath.css';
import { useNavigate,useLocation } from 'react-router-dom';


const ALevelPath=()=>{
    const navigate = useNavigate();

    const location =useLocation();


    const nextNavigation = () =>{
        if(location.pathname==='/advancedlevel'){
            navigate('/advancedlevel/stream');
        }

    }


        return(
        <div className='login-container'> 
            <h1 className='stream-title'>Select Category</h1>
            <div className='options-container stream-container'>
                <div>
                    <button className='login-btn o-level-stream-btn' onClick={nextNavigation}>Local</button>
                </div>
                <div>
                    <button className='login-btn o-level-stream-btn'> London</button>
                </div>

            </div>
        </div>
    )
}

export default ALevelPath;