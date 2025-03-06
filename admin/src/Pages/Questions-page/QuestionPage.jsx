import'./QuestionPage.css'

import { Outlet, useNavigate ,useLocation} from 'react-router-dom'

const QuestionPage =()=>{
const navigate = useNavigate();    
const location =useLocation();
    const goToIntlligencePage=()=>{
       if(location.pathname==='/admin/questions'){
        navigate('/admin/intelligence');
       }else if(location.pathname==='/admin/questions/add'){
        navigate('/admin/questions')
       }
    }


    return(
        <div className='home-container'>
            <Outlet/>
            <div className='navigation-btn'>
                <button onClick={ goToIntlligencePage}className='login-btn nav-back-btn'>Back</button>
            </div>
        </div>

    )
}

export default QuestionPage