import './OLevelStream.css';
import { useNavigate,useLocation } from 'react-router-dom';


const OLevelStream=()=>{
    const navigate = useNavigate();

    const location =useLocation();


    const nextNavigation = () =>{
        if(location.pathname==='/admin/ordinarylevel'){
            navigate('/admin/ordinarylevel/subjects');
        }
    }


        return(
        <div className='login-container'> 
            <h1 className='stream-title'>Select Category</h1>
            <div className='options-container stream-container'>
                <div>
                    <button  className='login-btn o-level-stream-btn' onClick={nextNavigation}>Local</button>
                </div>
                <div>
                    <button className='login-btn o-level-stream-btn'> London</button>
                </div>

            </div>
        </div>
    )
}

export default OLevelStream;