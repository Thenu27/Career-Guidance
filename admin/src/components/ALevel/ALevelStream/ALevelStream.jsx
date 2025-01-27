import './ALevelStream.css';
import { useNavigate,useLocation } from 'react-router-dom';


const ALevelStream=()=>{
    const navigate = useNavigate();

    const location =useLocation();


    const nextNavigation = () =>{
        if(location.pathname==='/advancedlevel'){
            navigate('/advancedlevel/subjects');
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

export default ALevelStream;