import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './HigherEducationPage.css'


const HigherEducationPage=()=>{

    const navigate = useNavigate();
    const location = useLocation()

    const backNavigationCareer=()=>{
        if(location.pathname==='/admin/higher-education'){
            navigate('/admin/option')
        }
        if(location.pathname==='/admin/higher-education/courses'){
            navigate('/admin/higher-education')
        }
        if(location.pathname==='/admin/higher-education/courses/update'){
            navigate('/admin/higher-education/courses')
        }
        if(location.pathname==='/admin/higher-education/courses/'){
            navigate('/admin/higher-education')
        }
        if(location.pathname==='/admin/higher-education/courses/add'){
            navigate('/admin/higher-education/courses')
        }
        if(location.pathname==='/admin/higher-education/course-field-add'){
            navigate('/admin/higher-education/')
        }
        if(location.pathname==='/admin/higher-education/'){
            navigate('/admin/option')
        }
        if(location.pathname ==='/admin/higher-education/institutes/'){
            navigate('/admin/higher-education/')
        }
        if(location.pathname ==='/admin/higher-education/institutes/add'){
            navigate('/admin/higher-education/institutes/')
        }
        if(location.pathname ==='/admin/higher-education/institutes/edit'){
            navigate('/admin/higher-education/institutes/')
        }
        if(location.pathname ==='/admin/higher-education/coursefield/edit'){
            navigate('/admin/higher-education/')
        }

    }

    return(
        <div className='home-container'>
            <Outlet/>
            <div className='navigation-btn'>
                <button onClick={backNavigationCareer} className='login-btn nav-btn'>Back</button>
            </div>
        </div>
    )
}

export default HigherEducationPage;


