import './QuestionUpdate.css';

const QuestionUpdate=()=>{
    return(
        <div className='questions-container'>
            <h3 className='welcome-title olevel-title enter-question-title'>Enter the Question You want to add to the System</h3>
                <input className='input-question' type='text' placeholder='Enter question'/>

            <button className='login-btn add-question-btn'>Add</button>    
        </div>
    )
}

export default QuestionUpdate