import './Question-container.styles.css';
// Importing necessary dependencies
import { useEffect, useState } from 'react';
import QuestionBox from '../QuestionBox/QuestionBox.component';
import { useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
// import { CareerContext } from '../../context/Career.context';
import { API } from '../API/Api';

import leftArrow from '../../assets/Arrow.svg'
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const QuestionContainer = () => {

    const navigate = useNavigate()

    const {setintelligenceObject} = useContext(ProgressContext);
    // const {Careers,setCareers} = useContext(CareerContext)
    // State to track the index of the question set currently displayed
    const [IndexOfQuestionShown, setIndexOfQuestionShown] = useState(0);

    // State to store shuffled questions
    const [shufulledQuestions, setShuffledQuestions] = useState([]);

    // State to store questions divided into groups of five
    const [questionsDividedIntoFive, setquestionsDividedIntoFive] = useState([]);

    // State to store answer values for questions
    const [value, setValue] = useState([]);

    // State to store question-answer mappings
    const [questionAndAnswers, setquestionAndAnswers] = useState({});

    // State to store fetched questions
    const [questions, setquestions] = useState({});

    const [loading,setLoading] = useState(false)

    // Function to fetch questions from the backend
    const fetchQuestions = async () => {
        try {
            setLoading(true)
            const response = await API.get(
                `${process.env.REACT_APP_URL}/api/Assesment`,
            );
            // console.log("Questions received from the backend", response.data);
            if(response.status===200){
                setquestions(response.data);
                setLoading(false)
            }
        } catch (error) {
            // console.log("URL", process.env.REACT_APP_URL);
            console.error("Error Fetching Questions", error);
            setLoading(false);
        }
    };

    // useEffect to fetch questions on component mount
    useEffect(() => {
        fetchQuestions();
    }, []);

    // Function to shuffle questions randomly
    const shufulledArray = (questions) => {
        const newArray = Object.keys(questions);
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // useEffect to shuffle questions when they are fetched
    useEffect(() => {
        const shuffled = shufulledArray(questions);
        setShuffledQuestions(shuffled);
    }, [questions]);

    // useEffect to initialize answers with default values if not already present
    useEffect(() => {
        const updatedAnswers = { ...questionAndAnswers };

        Object.keys(questions).forEach((key) => {
            if (!updatedAnswers.hasOwnProperty(key)) {
                updatedAnswers[key] = {
                    question: questions[key],
                    answer: 1, // Default answer value
                };
            }
        });

        // Set the updated state
        setquestionAndAnswers(updatedAnswers);
    }, [questions]);


    // Function to divide shuffled questions into groups of five
    const dividingQuestionIntoFive = (ArrayToBeDivided) => {
        const dividedQuestionArray = [];
        let index = 0;

        while (index < ArrayToBeDivided.length) {
            const part = ArrayToBeDivided.slice(index, index + 4);
            dividedQuestionArray.push(part);
            index = index + 4;
        }

        return dividedQuestionArray;
    };

    // useEffect to divide questions into groups when shuffled questions change
    useEffect(() => {
        const questionsDivided = dividingQuestionIntoFive(shufulledQuestions);
        setquestionsDividedIntoFive(questionsDivided);
    }, [shufulledQuestions]);

    // Function to handle "Next" button click
    const NextBtnHandler = () => {
        setIndexOfQuestionShown(IndexOfQuestionShown + 1);
    };

    // Function to handle "Back" button click
    const BackBtnHandler = () => {
        if (IndexOfQuestionShown > 0) {
            setIndexOfQuestionShown(IndexOfQuestionShown - 1);
        }
    };

    // Function to submit answers to the backend
    const answerSubmitHandler = async () => {
        try {
            const response = await API.post(
                `${process.env.REACT_APP_URL}/api/Assesment`,
                { questionAndAnswers }
                
            );
            if(response.status===200){
                  
                    setTimeout(() => {
                        setintelligenceObject(response.data.intelligence_object);
                        localStorage.setItem("intelligenceObject",JSON.stringify(response.data.intelligence_object));
                        localStorage.setItem("careerData", JSON.stringify(response.data.final_career_object));
                        }, 500)
           }



        } catch (error) {
            console.log("Error sending data to BE", error);
        }
    };

  if(loading){
    return(
        <div className='spinner-container'>
            <Spinner/>
        </div>
    
    )

  }
    

    return (
        <div className='assesment-page'>
            {/* Title Section */}
            <h2 className='question-container-title'>Answer the following questions to determine your MIP score</h2>
            
            {/* Question Display Section */}
            <div className='question-container'>
                <QuestionBox    
                    questions={questions} 
                    setquestionAndAnswers={setquestionAndAnswers}  
                    questionAndAnswers={questionAndAnswers} 
                    value={value} 
                    setValue={setValue} 
                    shufulledQuestions={shufulledQuestions} 
                    IndexOfQuestionShown={IndexOfQuestionShown}  
                    questionsDividedIntoFive={questionsDividedIntoFive}
                />


                <div className='question-container-btns'>

                {IndexOfQuestionShown < questionsDividedIntoFive.length-1 ? (
                  <div className='left-arrow-container'>
                    <img onClick={NextBtnHandler} className='left-arrow' alt="left-arrow" src={leftArrow}/>
                   </div>  
                ):(
                    <button onClick={() => { answerSubmitHandler(); NextBtnHandler(); }} className='submit-btn'>Submit</button>

                )}

      
                <div className='right-arrow-container'>
                    <img  onClick={BackBtnHandler} className='right-arrow' alt="right-arrow" src={leftArrow}/>
                </div>        
                </div>


            </div>

        </div>
    );
};

export default QuestionContainer;
