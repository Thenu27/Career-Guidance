import './QuestionBox.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';
import { useNavigate } from 'react-router-dom';

const QuestionBox =({allQuestionsArray,index})=>{
    const navigate = useNavigate();
    if(index==allQuestionsArray.length){
        navigate('/Option');
    }else{
    return(
        
        <div className='Question-box-container'>
            
             {allQuestionsArray[index].map(ques=>{
                    return <div className='Question-box'>
                                <p className='question'>{ques}</p>
                            </div>
                })}
        </div>
        )
    }
}

export default QuestionBox;