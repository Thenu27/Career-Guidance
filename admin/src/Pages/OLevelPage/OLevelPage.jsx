import './OLevelPage.css'
import { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { OLevelContext } from '../../Context/OLevel.context'
import { useNavigate } from 'react-router-dom'
import OLevelStream from '../../components/OLevel/OLevelStream/OLevelStream'

const OLevelPage = ()=>{

    const navigate = useNavigate();

    const {ShowOLStream} = useContext(OLevelContext)


    const backNavigation=()=>{
       if(ShowOLStream){
        navigate('/option')
       }
    }

    const nextNavigation = () =>{
        if(ShowOLStream){
            navigate('/ordinarylevel/subjects')
        }
    }
    return(
        <div>
            <Outlet/>
            <div className='navigation-btn'>
                <button onClick={backNavigation} className='login-btn'>Back</button>
                <button onClick={nextNavigation} className='login-btn'>Next</button>
            </div>

        </div>
    )
}

export default OLevelPage