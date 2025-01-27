import { Outlet } from 'react-router-dom';
import './ALevelPage.css';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const ALevelPage =()=>{

    const navigate = useNavigate();
    const location =useLocation();
    const backNavigation=()=>{
        if(location.pathname ==='/advancedlevel'){
         navigate('/option')
        }else if(location.pathname ==='/advancedlevel/update'){
         navigate('/advancedlevel/subjects')
        }else if(location.pathname==='/advancedlevel/subjects'){
         navigate('/advancedlevel')
        }else if(location.pathname==='/advancedlevel/add'){
         navigate('/advancedlevel/subjects')
        }
     }
    return(
        <div>
            <Outlet/>

            <div className='navigation-btn'>
                <button onClick={backNavigation} className='login-btn'>Back</button>
            </div>
        </div>
    )
}

export default ALevelPage;