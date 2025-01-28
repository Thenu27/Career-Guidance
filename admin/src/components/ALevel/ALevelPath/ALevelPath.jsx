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
        <div> 
            <h1 className='stream-title'>Select Category</h1>
            <div className='options-container stream-container'>
                    <button  className='login-btn' onClick={nextNavigation}>Local</button>
                    <button className='login-btn'> London</button>

            </div>
        </div>
    )
}

export default ALevelPath;