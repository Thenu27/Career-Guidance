import './QuestionUpdate.css';
import { QuestionContext } from '../../../Context/Question.context';
import { IntelligenceContext } from '../../../Context/intelligence.context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const QuestionUpdate=()=>{
    const {questionToBeAdded,setquestionToBeAdded} = useContext(QuestionContext);
    const {SelectedIntelligenceAdmin} = useContext(IntelligenceContext);
    const [SelectedIntelligence,setSelectedIntelligence] = useState()

    useEffect(()=>{
        const storedValue = localStorage.getItem("Selected-Intelligence-admin");;
        if(storedValue){
            setSelectedIntelligence(storedValue)
        }
    })
    const handleChange =(event)=>{

        setquestionToBeAdded((prev)=>({
            ...prev,
            question:event.target.value,
            intelligenceId : SelectedIntelligence
        }))
    }

    const sendNewQuestionToBe =async()=>{
        if(questionToBeAdded.question==='')
           return alert('Enter a question to add');

        const isConfirmed = window.confirm(`Are you sure you want to add the following question?\n\n"${questionToBeAdded.question}"`
        )

        if(!isConfirmed){
            return;
        }
        
            try{
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/questions/add`,{
                    questionToBeAdded    
                    })
                if(response.data==='Succesfully Created'){
                    alert("Question Succefully Created")
                }    
            }catch(error){
                console.log('Error Sending New Question to the backend',error)
            }

        
    }

    useEffect(()=>{
        console.log("SelectedIntelligencAdmin",SelectedIntelligenceAdmin)
    },[])

     useEffect(()=>{
        console.log(questionToBeAdded)
     },[questionToBeAdded])   
    return(
        <div className='login-container question-container'>
            <div className='inner-question-container'>
                <h3 className='welcome-title olevel-title enter-question-title'>Enter the Question You want to add to the System</h3>
                    <input className='input-question' onChange={handleChange}type='text' placeholder='Enter question'/>

                <button className='login-btn add-question-btn' onClick={sendNewQuestionToBe}>Add Question</button>    
            </div>

        </div>
    )
}

export default QuestionUpdate