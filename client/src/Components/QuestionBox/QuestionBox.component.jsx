import './QuestionBox.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';
import { useNavigate } from 'react-router-dom';

const QuestionBox =({questionsDividedIntoFive,IndexOfQuestionShown,shufulledQuestions})=>{
    const navigate = useNavigate();
    // if(NoOfQuestionShown>shufulledQuestions.length){
    //     navigate('/Option');
    // }else{

    if(!questionsDividedIntoFive.length ){
        return
        <div>
            <p>Loading....</p>
        </div>
    }

    if(IndexOfQuestionShown<questionsDividedIntoFive.length){
    return(

       
        
        <div className='Question-box-container'>
            
            

             {questionsDividedIntoFive[IndexOfQuestionShown].map((ques,index)=>{
                
                    return <div key={index} className='Question-box'>
                                <p className='question'>{ques}</p><br/>
                                <input className='answer' type="range"  name="vol" min="0" max="10"></input>
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