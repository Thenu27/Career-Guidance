import { createContext, useState } from "react";

// Creating ALevelContext with default values
export const ALevelContext = createContext({
    showALevelBox: null,
    setALevelBox: () => {},
    showALevelStreamBox: null,
    setshowALevelStreamBox: () => {},    
    showALevelBasketSubject: null,
    setshowALevelBasketSubject: () => {},
    showALevelCategory: null,
    setshowALevelCategory: () => {},
    goToStreams: () => {},
    goToALevelCategory: () => {},
    goToALevelLondonCategory: () => {},
    showLondonALevelCategory: null,
    setshowLondonALevelCategory: () => {},
    showALevelMathsLocal: null,
    setshowALevelMathsLocal: () => {},
    goToALevelLocalMaths: () => {},
    showALevelSubject: null,
    setshowALevelSubject: () => {},
    ALSubjectsFromDB: null,
    setALSubjectsFromDB: () => {},
    ALResultsArray: null,
    setALResultsArray: () => {},
    goToResults: () => {},
    showALResults: null,
    setshowALResults: () => {},
});

// ALevelProvider component to manage and provide context values
export const ALevelProvider = ({ children }) => {
    // State to track visibility of various components
    const [showALevelBox, setALevelBox] = useState(true);
    const [showALevelStreamBox, setshowALevelStreamBox] = useState(false);
    const [showALevelBasketSubject, setshowALevelBasketSubject] = useState(false);
    const [showALevelCategory, setshowALevelCategory] = useState(true);
    const [showLondonALevelCategory, setshowLondonALevelCategory] = useState(false);
    const [showALevelMathsLocal, setshowALevelMathsLocal] = useState(false);
    const [showALevelSubject, setshowALevelSubject] = useState(false);
    const [showALResults, setshowALResults] = useState(false);
    
    // State for storing subjects and results
    const [ALSubjectsFromDB, setALSubjectsFromDB] = useState();
    const [ALResultsArray, setALResultsArray] = useState([]);

    // Function to navigate to A-Level category
    const goToALevelCategory = () => {
        setshowALevelCategory(true);
        setshowALevelStreamBox(false);
    };

    // Function to navigate to London A-Level category
    const goToALevelLondonCategory = () => {
        setshowLondonALevelCategory(true);
        setshowALevelStreamBox(false);
        setshowALevelCategory(false);
    };

    // Function to navigate to Streams section
    const goToStreams = () => {
        setshowALevelStreamBox(true);
        setshowALevelCategory(false);
        setshowALevelMathsLocal(false);
        setALevelBox(true);
    };

    // Function to navigate to Local Maths A-Level subjects
    const goToALevelLocalMaths = () => {    
        setshowALevelSubject(true);
        setshowALevelMathsLocal(true);
        setALevelBox(false);
    };

    // Function to navigate to A-Level Results page
    const goToResults = () => {
        setshowALevelCategory(false);
        setshowALevelStreamBox(false);
        setshowALevelMathsLocal(false);
        setshowALResults(true);
        setALevelBox(true);
    };

    // Defining the values to be provided by the context
    const value = {
        showALevelBox,
        setALevelBox,
        showALevelStreamBox,
        setshowALevelStreamBox,
        showALevelBasketSubject,
        setshowALevelBasketSubject,
        showALevelCategory,
        setshowALevelCategory,
        showLondonALevelCategory,
        setshowLondonALevelCategory,
        goToStreams,
        goToALevelCategory,
        goToALevelLondonCategory,
        showALevelMathsLocal,
        setshowALevelMathsLocal,
        goToALevelLocalMaths,
        showALevelSubject,
        setshowALevelSubject,
        ALSubjectsFromDB,
        setALSubjectsFromDB,
        ALResultsArray,
        setALResultsArray,
        goToResults,
        showALResults,
        setshowALResults,
    };

    return (
        <ALevelContext.Provider value={value}>
            {children}
        </ALevelContext.Provider>
    );
};
