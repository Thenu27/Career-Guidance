import './QuestionBox.styles.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuestionBox =({questions,setquestionAndAnswers,value,setValue,questionsDividedIntoFive,IndexOfQuestionShown,shufulledQuestions})=>{

    const navigate = useNavigate();


    
    useEffect(() => {
        if (shufulledQuestions.length > 0) {
          setValue(Array(shufulledQuestions.length).fill(1));
          
        }
      }, [shufulledQuestions]);






    useEffect(() => {
        if (questionsDividedIntoFive.length > 0 &&  IndexOfQuestionShown >= questionsDividedIntoFive.length) {
          navigate('/Option');
        }
      }, [IndexOfQuestionShown, navigate, questionsDividedIntoFive.length]);


 


    
    const valueHandler=(globalIndex,event,quesId)=>{
        const newValues=[...value];
        newValues[globalIndex]=event.target.value;
        setValue(newValues);
    setquestionAndAnswers((prev)=>({
        ...prev,
        [quesId]:{
          question:questions[quesId],
          answer:event.target.value
        }
      }))

    }





    
    if(!questionsDividedIntoFive.length ){
        return null
    }    





    if(IndexOfQuestionShown<questionsDividedIntoFive.length){
    
    return(
       
        <div className='question-box-container'>
             {questionsDividedIntoFive[IndexOfQuestionShown].map((quesId,index)=>{
                const globalIndex = (IndexOfQuestionShown*5)+index;

                     
                return   <div key={index} className='question-box-side-box-container'>
                              
                               <div  className='question-box'>   
                                     <p className='question'>{questions[quesId]}</p><br/>                                       
                                      <div className='answer'>
                                            <input  onChange={(event)=>valueHandler(globalIndex,event,quesId)} type="range" value={value[globalIndex]}  name="vol" min="1" max="10"/>
                                      </div>
                                </div>
                                  <div className='side-box'>
                                    <p className='answer-value'>{value[globalIndex]}</p> 
                                </div>
                               
                          </div>
               
                })} 
            
        </div>
        
        )
     }
    }

export default QuestionBox;