import './Questions.css'
import axios from 'axios'
import { IntelligenceContext } from '../../Context/intelligence.context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Questions =()=>{

    const {AdminQuestions} = useContext(IntelligenceContext);

    const navigate = useNavigate();
    useEffect(()=>{
        console.log(AdminQuestions)
    },[])

    const goToIntlligencePage=()=>{
        navigate('/intelligence')
    }


    return(
        <div>
            <div className='questions-container'>
                <h1>Question currently in Database</h1>
                <div className='questions'>
                    {AdminQuestions.map(item=>{
                        return <button className='question-btn'>{item.question}</button>
                    })}
                </div>

            </div>
            <button onClick={ goToIntlligencePage}className='login-btn'>Back</button>
        </div>

    )
}

export default Questions