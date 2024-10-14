import './Question-container.styles.css'
import { Question } from '../../Question-Data';
import { useEffect,useState } from 'react';
import QuestionBox from '../QuestionBox/QuestionBox.component';

const QuestionContainer = () =>{
    const[shufulledQuestions,setShuffledQuestions]= useState([]);
    const[index,setIndex]=useState(0);

    const shufulledArray =(Question)=>{;
        const newArray = [...Question];
        for( let i= newArray.length-1; i>0 ; i--){
            
            const j = Math.floor(Math.random()*i+1);
            [newArray[i],newArray[j]] = [newArray[j],newArray[i]];
        }
        return newArray;
        }

    useEffect(()=>{
        const shuffled = shufulledArray(Question);
        setShuffledQuestions(shuffled);
        
    },[]) 
    
    const oneToFourElements = shufulledQuestions.slice(0,4); 
    const fiveToEigthElements =   shufulledQuestions.slice(4,8)
    const nineToTwelveElements =shufulledQuestions.slice(8,11);

    const allQuestionsArray = [oneToFourElements,fiveToEigthElements,nineToTwelveElements];

    
    const NextBtnHandler = ()=>{
       if(index<allQuestionsArray.length-1){
       setIndex(index+1);
       } 
    }

    const BackBtnHandler = ()=>{
        if(index>0){
        setIndex(index-1);
        } 
     }

    return(
       <div> 
        
         <h2 className='title'>Answer the following questions to Determine your Mip score</h2>
            <div className='Question-Container'>

               <QuestionBox index={index} allQuestionsArray={allQuestionsArray}/>
               <div className='NextAndBackbtn'>
                    <button onClick={BackBtnHandler}className='backbtn'>Back</button>
                    <button onClick={NextBtnHandler} className='nextbtn'>Next</button>
               </div>
             
            </div>
            
       </div>
    )
}

export default QuestionContainer;