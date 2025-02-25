import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './CareerPage.css';


const CareerPage=()=>{

    const navigate = useNavigate();
    const location = useLocation()

    const backNavigationCareer=()=>{
        if(location.pathname==='/admin/career'){
            navigate('/option')
        }
        if(location.pathname==='/admin/careerfield/career'){
            navigate('/admin/careerfield')
        }
        if(location.pathname==='/admin/careerfield'){
            navigate('/option')
        }
        if(location.pathname==='/admin/careerfield/add'){
            navigate('/admin/careerfield/career')
        }
        if(location.pathname==='/admin/careerfield/update'){
            navigate('/admin/careerfield/career')
        }
        if(location.pathname==='/admin/careerfield/career-field-add'){
            navigate('/admin/careerfield')
        }

    }
    return(
        <div>
            <Outlet/>
            <div className='navigation-btn'>
                <button onClick={backNavigationCareer} className='login-btn'>Back</button>
            </div>
        </div>
    )
}

export default CareerPage;