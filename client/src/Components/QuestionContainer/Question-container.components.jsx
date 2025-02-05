import './Question-container.styles.css'
import { useEffect,useState ,useContext} from 'react';
import axios from 'axios';

import QuestionBox from '../QuestionBox/QuestionBox.component';


const QuestionContainer = () =>{
    // const {csrfToken} = useContext(CsrfContext)
   
    const[IndexOfQuestionShown,setIndexOfQuestionShown] = useState(0)
    const[shufulledQuestions,setShuffledQuestions]= useState([]); 
    const[questionsDividedIntoFive,setquestionsDividedIntoFive]=useState([]);
    const[value,setValue]=useState([]);
    const[questionAndAnswers,setquestionAndAnswers]=useState({});
    const [questions, setquestions] = useState({});

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}/api/Assesment`,
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure minimal headers
                    },
                }
            );
            console.log("Questions received from the backend", response.data);
            setquestions(response.data); // Assuming setquestions is a state setter function
        } catch (error) {
            console.log("URL",process.env.REACT_APP_URL)

            console.error("Error Fetching Questions", error);
        }
    };
    
    useEffect(() => {
        
    
        fetchQuestions();
    }, []); 
   

    // Shuffles the Questions and return a new array
    const shufulledArray =(questions)=>{
        const newArray = Object.keys(questions);
        for( let i= newArray.length-1; i>0 ; i--){
            
            const j = Math.floor(Math.random()*(i+1));
            [newArray[i],newArray[j]] = [newArray[j],newArray[i]];
        }
        return newArray;
        }   
        
        

    
    useEffect(()=>{
        const shuffled = shufulledArray(questions);
        setShuffledQuestions(shuffled);
                
    },[questions]) 



    useEffect(()=>{
        const updatedAnswers = { ...questionAndAnswers };

        Object.keys(questions).forEach((key) => {
            if (!updatedAnswers.hasOwnProperty(key)) {
              updatedAnswers[key] = {
                question: questions[key],
                answer: 1, // Default answer value
              };
            }
          });
          
           // Return the updated object to set state
          setquestionAndAnswers(updatedAnswers)
    },[questions])

    console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
    console.log("Environment Variables:", process.env);

    



    const dividingQuestionIntoFive=(ArrayToBeDivided)=>{
        
        const dividedQuestionArray=[];
        let index = 0;

       while(index<ArrayToBeDivided.length){
            const part = ArrayToBeDivided.slice(index,index+4);
            dividedQuestionArray.push(part);
            index = index+4;
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
        try{
            const response = await axios.post(`${process.env.REACT_APP_URL}/api/Assesment`,
                
               {questionAndAnswers},{
                withCredentials:true
               }
               
            
                
            )
            console.log(response.data);
        }catch(error){
            console.log("Error sending data to BE",error)
        }

        

    }






    return(
       <>
       
            <h2 className='question-container-title'>Answer the following questions to Determine your Mip score</h2>
            <div className='question-container'>

               <QuestionBox questions={questions} setquestionAndAnswers={setquestionAndAnswers} questionAndAnswers={questionAndAnswers} value={value} setValue={setValue} shufulledQuestions={shufulledQuestions} IndexOfQuestionShown={IndexOfQuestionShown}  questionsDividedIntoFive={questionsDividedIntoFive}/>

             
            </div>
            <div className='questions-navigation-container'>
               
               <button onClick={BackBtnHandler}className='nextbtn'>Back</button>
               
               {IndexOfQuestionShown<questionsDividedIntoFive.length-1?
                   <button onClick={NextBtnHandler} className='nextbtn'>Next</button>:
                   <button onClick={()=>{answerSubmitHandler();NextBtnHandler()}} className='nextbtn'>Submit</button>
               }  
          </div>

            </>
    )
}

export default QuestionContainer;