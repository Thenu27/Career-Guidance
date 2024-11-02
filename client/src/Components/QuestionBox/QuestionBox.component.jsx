import './QuestionBox.styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuestionBox =({questionsDividedIntoFive,IndexOfQuestionShown,shufulledQuestions})=>{
    const navigate = useNavigate();

    const[value,setValue]=useState(Array(shufulledQuestions.length).fill(1));
    

    const valueHandler=(index,event)=>{
        const newValues=[...value];
        newValues[index]=event.target.value;
        setValue(newValues)

    }
    


    if(!questionsDividedIntoFive.length ){
        return
    
    }

    if(IndexOfQuestionShown<questionsDividedIntoFive.length){
    return(
       
        <div className='Question-box-container'>
             {questionsDividedIntoFive[IndexOfQuestionShown].map((ques,index)=>{
                
                    return <div key={index} className='question-box-side-box-container'>
                                <div  className='Question-box'>
                                        <p className='question'>{ques}</p><br/>
                                        <input className='answer' onChange={(event)=>valueHandler(index,event)} type="range" value={value[index]}  name="vol" min="1" max="10"></input>
                                </div>
                                <div className='side-box'>
                                   <p className='answer-value'>{value[index]}</p> 
                                </div>
                           </div>
                
                })}
        </div>
        )
     }else{
        navigate("/Option")
     }
    }
// }

export default QuestionBox;