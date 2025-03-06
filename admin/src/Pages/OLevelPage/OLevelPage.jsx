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
       if(location.pathname ==='/admin/ordinarylevel'){
        navigate('/admin/option')
       }else if(location.pathname ==='/admin/ordinarylevel/update'){
        navigate('/admin/ordinarylevel/subjects')
       }else if(location.pathname==='/admin/ordinarylevel/subjects'){
        navigate('/admin/ordinarylevel')
       }else if(location.pathname==='/admin/ordinarylevel/add'){
        navigate('/admin/ordinarylevel/subjects')
       }
    }


    return(
        <div className='home-container'>
            <Outlet/>
            <div className='navigation-btn'>
                <button onClick={backNavigation} className='login-btn back-btn'>Back</button>
            </div>

        </div>
    )
}

export default OLevelPage