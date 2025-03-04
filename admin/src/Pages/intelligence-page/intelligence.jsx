
import { Outlet, useNavigate } from 'react-router-dom';
import './intelligence.css'
import { useContext, useEffect } from 'react';
import { IntelligenceContext } from '../../Context/intelligence.context';
import axios from 'axios';

const IntelligencePage =()=>{

    const {SelectedIntelligenceAdmin,
           setSelectedIntelligenceAdmin,
           AdminQuestions,
           setAdminQuestions
        
    } =  useContext(IntelligenceContext)


    const storeSelectedValue=(value)=>{
        setSelectedIntelligenceAdmin(value)
        localStorage.setItem("Selected-Intelligence-admin",value)
    }

    useEffect(()=>{
        console.log("SelectedIntelligence",SelectedIntelligenceAdmin)
    },[SelectedIntelligenceAdmin])


    const navigate = useNavigate();

    const goToSelectOptionPage=()=>{
        navigate('/option');
    }

    
    const goToQuestionsPage=()=>{
        navigate('/questions');
    }


    return(
        <div >
            <h1 className='welcome-title intelligence-title'>Select the Question Category you want to Update</h1>
        <div className='intelligence-container'>
            <button onClick={()=>storeSelectedValue(1)} className='login-btn option-intelligence-btn' value={1}>Logical-Mathematical</button>
            <button onClick={()=>storeSelectedValue(2)} className='login-btn option-intelligence-btn' value={2}>Linguistic</button>
            <button onClick={()=>storeSelectedValue(3)} className='login-btn option-intelligence-btn' value={3}>Spatial</button>
            <button onClick={()=>storeSelectedValue(4)} className='login-btn option-intelligence-btn' value={4}>Musical</button>
            <button onClick={()=>storeSelectedValue(9)} className='login-btn option-intelligence-btn' value={9}>Existential</button>
            <button onClick={()=>storeSelectedValue(6)} className='login-btn option-intelligence-btn' value={6}>Interpersonal</button>
            <button onClick={()=>storeSelectedValue(7)} className='login-btn option-intelligence-btn' value={7}>Intrapersonal</button>
            <button onClick={()=>storeSelectedValue(5)} className='login-btn option-intelligence-btn' value={5}>Bodily-kinesthetic</button>
            <button onClick={()=>storeSelectedValue(8)} className='login-btn option-intelligence-btn' value={8}>Naturalistic</button>

        </div>
        <div className='navigation-btn'>
            <button className='login-btn' onClick={goToSelectOptionPage}>Back</button>
            <button className='login-btn' onClick={()=>{goToQuestionsPage()}} >Next</button>
        </div>


        </div>

    )
}

export default IntelligencePage;
