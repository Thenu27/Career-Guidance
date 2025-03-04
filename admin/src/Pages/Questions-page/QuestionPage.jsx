import'./QuestionPage.css'

import { Outlet, useNavigate ,useLocation} from 'react-router-dom'

const QuestionPage =()=>{
const navigate = useNavigate();    
const location =useLocation();
    const goToIntlligencePage=()=>{
       if(location.pathname==='/questions'){
        navigate('/intelligence');
       }else if(location.pathname==='/questions/add'){
        navigate('/questions')
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