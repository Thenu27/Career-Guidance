import './OLevelPage.css'
import { useContext, useState } from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import { OLevelContext } from '../../Context/OLevel.context'
import { useNavigate } from 'react-router-dom'
import OLevelStream from '../../components/OLevel/OLevelStream/OLevelStream'

const OLevelPage = ()=>{

    const navigate = useNavigate();
    const location =useLocation();
    const {ShowOLStream} = useContext(OLevelContext)


    const backNavigation=()=>{
       if(location.pathname ==='/ordinarylevel'){
        navigate('/option')
       }else if(location.pathname ==='/ordinarylevel/update'){
        navigate('/ordinarylevel/subjects')
       }else if(location.pathname==='/ordinarylevel/subjects'){
        navigate('/ordinarylevel')
       }else if(location.pathname==='/ordinarylevel/add'){
        navigate('/ordinarylevel/subjects')
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

export default OLevelPage