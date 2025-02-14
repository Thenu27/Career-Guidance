import './QuestionBox.styles.css';

// Importing necessary dependencies
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuestionBox = ({ 
    questions, 
    setquestionAndAnswers, 
    value, 
    setValue, 
    questionsDividedIntoFive, 
    IndexOfQuestionShown, 
    shufulledQuestions 
}) => {
    // Hook for navigation
    const navigate = useNavigate();

    // useEffect to initialize `value` state when shuffled questions are available
    useEffect(() => {
        if (shufulledQuestions.length > 0) {
            setValue(Array(shufulledQuestions.length).fill(1)); // Initialize all values to 1
        }
    }, [shufulledQuestions]);

    // useEffect to navigate to 'Option' page when all question sets are completed
    useEffect(() => {
        if (questionsDividedIntoFive.length > 0 && IndexOfQuestionShown >= questionsDividedIntoFive.length) {
            navigate('/Option');
        }
    }, [IndexOfQuestionShown, navigate, questionsDividedIntoFive.length]);

    // Function to handle value selection for each question
    const valueHandler = (globalIndex, event, quesId) => {
        const newValues = [...value];
        newValues[globalIndex] = event.target.value; // Update the selected value
        setValue(newValues);

        // Store the selected answer along with the question
        setquestionAndAnswers((prev) => ({
            ...prev,
            [quesId]: {
                question: questions[quesId],
                answer: event.target.value,
            },
        }));
    };

    // Return null if there are no questions available
    if (!questionsDividedIntoFive.length) {
        return null;
    }

    // Render the question box only if the index is within range
    if (IndexOfQuestionShown < questionsDividedIntoFive.length) {
        return (
            <div className='question-box-container'>
                {questionsDividedIntoFive[IndexOfQuestionShown].map((quesId, index) => {
                    const globalIndex = (IndexOfQuestionShown * 4) + index; // Calculate global index for value tracking
                    
                    return (
                        <div key={index} className='question-box-side-box-container'>
                            {/* Question Box */}
                            <div className='question-box'>
                                <p className='question'>{questions[quesId]}</p><br/>
                                <div className='answer'>
                                    <input 
                                        onChange={(event) => valueHandler(globalIndex, event, quesId)} 
                                        type="range" 
                                        value={value[globalIndex]}  
                                        name="vol" 
                                        min="1" 
                                        max="10"
                                    />
                                </div>
                            </div>

                            {/* Side Box to Display Answer Value */}
                            <div className='side-box'>
                                <p className='answer-value'>{value[globalIndex]}</p> 
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default QuestionBox;
