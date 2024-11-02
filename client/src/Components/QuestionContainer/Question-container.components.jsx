import './Question-container.styles.css'
import { Question } from '../../Question-Data';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionBox from '../QuestionBox/QuestionBox.component';



const QuestionContainer = () =>{
   
    const[IndexOfQuestionShown,setIndexOfQuestionShown] = useState(0)
    const[shufulledQuestions,setShuffledQuestions]= useState([]); 
    const[questionsDividedIntoFive,setquestionsDividedIntoFive]=useState([]);

    const shufulledArray =(Question)=>{
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
        console.log(questionsDivided)
        
        
    },[shufulledQuestions]) 
    

    const NextBtnHandler = ()=>{
        setIndexOfQuestionShown(IndexOfQuestionShown+1)
        }   
       

    const BackBtnHandler = ()=>{
            if(IndexOfQuestionShown>0){
            setIndexOfQuestionShown(IndexOfQuestionShown-1);
        } 
     }

    return(
       <div> 
        
         <h2 className='title'>Answer the following questions to Determine your Mip score</h2>
            <div className='Question-Container'>

               <QuestionBox shufulledQuestions={shufulledQuestions} IndexOfQuestionShown={IndexOfQuestionShown}  questionsDividedIntoFive={questionsDividedIntoFive}/>
               <div className='NextAndBackbtn'>
                    <button onClick={BackBtnHandler}className='backbtn'>Back</button>
                    <button onClick={NextBtnHandler} className='nextbtn'>Next</button>
               </div>
             
            </div>
            
       </div>
    )
}

export default QuestionContainer;