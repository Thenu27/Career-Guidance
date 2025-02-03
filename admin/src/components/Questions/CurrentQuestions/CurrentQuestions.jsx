import './CurrentQuestions.css';
import axios from 'axios'
import { IntelligenceContext } from '../../../Context/intelligence.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../../assets/icon.svg'

const CurrentQuestions =()=>{
    const {AdminQuestions} = useContext(IntelligenceContext);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(AdminQuestions)
    },[]);

    const goToAddQuestionPage = ()=>{
        navigate('/questions/add')
    }
    const sendQuestionToDelete = async (question) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/question/delete`, {
                question
            });
    
            // Check response status or message for success
            if (response.status === 200 && response.data === 'Question Deleted') {
                alert('Question deleted successfully');
            } else {
                alert('Failed to delete question. Please try again.');
            }
    
            console.log(response.data);
        } catch (error) {
            console.error('Error when deleting question', error);
            alert('An error occurred while deleting the question. Please try again later.');
        }
    };
    

    const handleDelete = async(question)=>{
        if (window.confirm('Do you want to delete this question?\n\n This action cannot be undone.')){
           await sendQuestionToDelete(question);
        }else{
            return
        }
    }


    return(
        <div>
           <div className='questions-container'>
                <h1>Question currently in Database</h1>
                <div className='questions'>
                    {AdminQuestions.map((item,index)=>{
                                    

                        return (
                            <div key={index} className='question-inner-container'>
                                <img onClick={() => handleDelete(item.question)} src={DeleteIcon} alt='delete-icon' className='delete-icon'/>
                                <input type='text' className='question-btn' value={item.question}/>
                            </div>    
                        )
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