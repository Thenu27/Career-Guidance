import './Question-container.styles.css';

// Importing necessary dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionBox from '../QuestionBox/QuestionBox.component';
import { useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';

const QuestionContainer = () => {

    const {intelligenceObject,setintelligenceObject} = useContext(ProgressContext);
    const {Careers,setCareers} = useContext(CareerContext)
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

    // Function to fetch questions from the backend
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}/api/Assesment`,
            );
            console.log("Questions received from the backend", response.data);
            setquestions(response.data);
        } catch (error) {
            console.log("URL", process.env.REACT_APP_URL);
            console.error("Error Fetching Questions", error);
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
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/api/Assesment`,
                { questionAndAnswers }
                
            );
            console.log("response",response.data)
            //  setCareers(response.data.final_career_object);

            setTimeout(() => {
                console.log("Saving Careers to localStorage...");
                setintelligenceObject(response.data.intelligence_object);
                localStorage.setItem("careerData", JSON.stringify(response.data.final_career_object));
                }, 500)


        } catch (error) {
            console.log("Error sending data to BE", error);
        }
    };

    // useEffect(() => {
    //     if (Careers && Object.keys(Careers).length > 0) {  // Ensure Careers is not empty
    //         console.log("Careers received:", Careers);
    //         localStorage.setItem("careerData", JSON.stringify(Careers));
    //         console.log("Career Data Stored in Local Storage");
    //     } else {
    //         console.warn("Careers is empty or undefined, not storing in localStorage.");
    //     }
    // }, [Careers]);
    
    

    return (
        <>
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
            </div>

            {/* Navigation Buttons */}
            <div className='questions-navigation-container'>
                <button onClick={BackBtnHandler} className='nextbtn'>Back</button>
               
                {IndexOfQuestionShown < questionsDividedIntoFive.length - 1 ? (
                    <button onClick={NextBtnHandler} className='nextbtn'>Next</button>
                ) : (
                    <button onClick={() => { answerSubmitHandler(); NextBtnHandler(); }} className='nextbtn'>Submit</button>
                )}
            </div>
        </>
    );
};

export default QuestionContainer;
