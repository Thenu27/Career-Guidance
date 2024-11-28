import './Question-container.styles.css'
import { Question } from '../../Question-Data';
import { useEffect,useState } from 'react';

import QuestionBox from '../QuestionBox/QuestionBox.component';



const QuestionContainer = () =>{
   
    const[IndexOfQuestionShown,setIndexOfQuestionShown] = useState(0)
    const[shufulledQuestions,setShuffledQuestions]= useState([]); 
    const[questionsDividedIntoFive,setquestionsDividedIntoFive]=useState([]);
    const[value,setValue]=useState([]);
    const[questionAndAnswers,setquestionAndAnswers]=useState({});
 
   

    // Shuffles the Questions and return a new array
    const shufulledArray =(Question)=>{
        const newArray = Object.keys(Question);
        for( let i= newArray.length-1; i>0 ; i--){
            
            const j = Math.floor(Math.random()*(i+1));
            [newArray[i],newArray[j]] = [newArray[j],newArray[i]];
        }
        return newArray;
        }   
        
        

    
    useEffect(()=>{
        
        const shuffled = shufulledArray(Question);
        setShuffledQuestions(shuffled);
                
    },[]) 



    useEffect(()=>{
        const updatedAnswers = { ...questionAndAnswers };

        Object.keys(Question).forEach((key) => {
            if (!updatedAnswers.hasOwnProperty(key)) {
              updatedAnswers[key] = {
                question: Question[key],
                answer: 1, // Default answer value
              };
            }
          });
          
           // Return the updated object to set state
          setquestionAndAnswers(updatedAnswers)
    },[questionAndAnswers])






    const dividingQuestionIntoFive=(ArrayToBeDivided)=>{
        
        const dividedQuestionArray=[];
        let index = 0;

       while(index<ArrayToBeDivided.length){
            const part = ArrayToBeDivided.slice(index,index+5);
            dividedQuestionArray.push(part);
            index = index+5;
         }

        return dividedQuestionArray;
        } 






    useEffect(()=>{
        
        const questionsDivided = dividingQuestionIntoFive(shufulledQuestions);
        setquestionsDividedIntoFive(questionsDivided);
              
    },[shufulledQuestions]) 





    
    const NextBtnHandler = ()=>{
        setIndexOfQuestionShown(IndexOfQuestionShown+1)
        }   





        
    const BackBtnHandler = ()=>{
            if(IndexOfQuestionShown>0){
            setIndexOfQuestionShown(IndexOfQuestionShown-1);
        } 
     }








      
     const answerSubmitHandler=async()=>{
        console.log("Completes Array",questionAndAnswers)
        const response = await fetch("http://localhost:3000/api/Assesment",{
            method:"post",
            headers:{
                "Content-Type":'application/json'
            },

            body:JSON.stringify({questionAndAnswers})
        })
        const data = await response.json()
        console.log(data)
     }

    return(
       <>
       
            <h2 className='question-container-title'>Answer the following questions to Determine your Mip score</h2>
            <div className='question-container'>

               <QuestionBox setquestionAndAnswers={setquestionAndAnswers} questionAndAnswers={questionAndAnswers} value={value} setValue={setValue} shufulledQuestions={shufulledQuestions} IndexOfQuestionShown={IndexOfQuestionShown}  questionsDividedIntoFive={questionsDividedIntoFive}/>
            <div className='questions-navigation-container'>
               
               <button onClick={BackBtnHandler}className='nextbtn'>Back</button>
               
               {IndexOfQuestionShown<questionsDividedIntoFive.length-1?
                   <button onClick={NextBtnHandler} className='nextbtn'>Next</button>:
                   <button onClick={()=>{answerSubmitHandler();NextBtnHandler()}} className='nextbtn'>Submit</button>
               }  
          </div>
             
            </div>

            </>
    )
}

export default QuestionContainer;