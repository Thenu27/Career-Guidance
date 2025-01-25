import './CurrentQuestions.css';
import axios from 'axios'
import { IntelligenceContext } from '../../../Context/intelligence.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CurrentQuestions =()=>{
    const {AdminQuestions} = useContext(IntelligenceContext);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(AdminQuestions)
    },[]);

    const goToAddQuestionPage = ()=>{
        navigate('/questions/add')
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
                <div className='add-question-container'>
                    <button onClick={goToAddQuestionPage} className='login-btn add-question-btn'>Add Question</button> 
                </div>

            </div>
        </div>
    )
} 

export default CurrentQuestions;