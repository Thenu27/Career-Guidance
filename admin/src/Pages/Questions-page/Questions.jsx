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
                        return <input type='text' className='question-btn' value={item.question}/>
                    })}
                </div>

            </div>
            <div className='navigation-btn'>
                <button onClick={ goToIntlligencePage}className='login-btn'>Back</button>
            </div>
        </div>

    )
}

export default Questions