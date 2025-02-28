import './CurrentQuestions.css';
import axios from 'axios';
import { IntelligenceContext } from '../../../Context/intelligence.context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../../assets/icon.svg';

const CurrentQuestions = () => {
    const { AdminQuestions,setAdminQuestions} = useContext(IntelligenceContext);

    // Store updated questions dynamically using question_id as the key
    const [updatedQuestions, setUpdatedQuestions] = useState({});

    const navigate = useNavigate();

    useEffect(()=>{
        const selectedIntelligenceValue = localStorage.getItem("Selected-Intelligence-admin")
        if(selectedIntelligenceValue){
            sendIntelligenceToBE(selectedIntelligenceValue)
        }
    },[])

    useEffect(() => {
        // Initialize updatedQuestions with current questions
        const initialQuestions = AdminQuestions.reduce((acc, item) => {
            acc[item.question_id] = item.question;
            return acc;
        }, {});
        setUpdatedQuestions(initialQuestions);
    }, [AdminQuestions]);

    const goToAddQuestionPage = () => {
        navigate('/questions/add');
    };

    const sendQuestionToDelete = async (question,questionId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_URL}/api/admin/question/delete`,
                {question,questionId }
            );

            if (response.status === 200 && response.data === 'Question Deleted') {
                alert('Question deleted successfully');
            } else {
                alert('Failed to delete question. Please try again.');
            }
        } catch (error) {
            console.error('Error when deleting question', error);
            alert('An error occurred while deleting the question. Please try again later.');
        }
    };

    const handleDelete = async (question,questionId) => {
        if (
            window.confirm(
                `Are you sure you want to delete this question?\n\n"${question}"\n\nThis action cannot be undone.`
            )
        ) {
            await sendQuestionToDelete(question,questionId);
        }
    };
    

    const handleChange = (question_id, value) => {
        // Dynamically update the corresponding question
        setUpdatedQuestions((prev) => ({
            ...prev,
            [question_id]: value,
        }));
    };

    const handleUpdate = async (question_id) => {
        const updatedQuestion = updatedQuestions[question_id];
        const originalQuestion = AdminQuestions.find(item => item.question_id === question_id)?.question;

        if (updatedQuestion === originalQuestion){
            alert('You haven’t changed the original question. Please make changes before updating.');
            return
        }
        if(window.confirm(`Do you want to update the question \n "${originalQuestion}" \n into \n "${updatedQuestion}"
            This Action cannot be undone`)){

                try {
                   


                    const response =await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/question/update`, {
                        questionId: question_id,
                        updatedQuestion,
                    });
                    if (response.data==='Question updated successfully'){
                        alert('Question updated successfully!');
                    }else{
                        alert('Error Updating the Question Please try Again');
                    }
                } catch (error) {
                    console.error('Error updating question', error);
                    alert('Failed to update the question. Please try again.');
                }
            }

    };

    const sendIntelligenceToBE=async(value)=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/intelligence`,{
                value
            });
            console.log(response.data);;
           setAdminQuestions(response.data)
        }catch(error){
            console.error("Error sending intelligence type to backend",error)
        }

        

    }


    return (
        <div>
            <div className='questions-container'>
                <h1>Questions currently in Database</h1>
                <div className='questions'>
                    {AdminQuestions.map((item, index) => (
                        <>
                        <div key={index} className='question-inner-container'>
                            <img
                                onClick={() => handleDelete(item.question,item.question_id)}
                                src={DeleteIcon}
                                alt='delete-icon'
                                className='delete-icon'
                            />
                            <input
                                type='text'
                                className='question-btn'
                                value={updatedQuestions[item.question_id] || ''}
                                onChange={(e) => handleChange(item.question_id, e.target.value)}
                            />

                        </div>
                                                    <div className='question-update-btn-container'>
                                                    <button
                                                        className='question-update-btn'
                                                        onClick={() => handleUpdate(item.question_id)}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                        </>
                        
                    ))}
                </div>
                <div className='add-question-container'>
                    <button
                        onClick={goToAddQuestionPage}
                        className='login-btn add-question-btn'
                    >
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CurrentQuestions;