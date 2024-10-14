import './QuestionBox.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';

const QuestionBox =({allQuestionsArray,index})=>{
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

export default QuestionBox;