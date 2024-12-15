import { createContext, useState } from "react"

export const ALevelContext = createContext({
    showALevelBox:null,
    setALevelBox:()=>{},
    showALevelStreamBox:null,
    setshowALevelStreamBox:()=>{},    
    showALevelBasketSubject:null,
    setshowALevelBasketSubject:()=>{},
    showALevelCategory:null,
    setshowALevelCategory:()=>{},
    goToStreams:()=>{},
    goToALevelCategory:()=>{},
    goToALevelLondonCategory:()=>{},
    showLondonALevelCategory:null,
    setshowLondonALevelCategory:()=>{},
    showALevelMathsLocal:null,
    setshowALevelMathsLocal:()=>{},
    goToALevelLocalMaths:()=>{},
    showALevelSubject:null,
    setshowALevelSubject:()=>{},
    ALSubjectsFromDB:null,
    setALSubjectsFromDB:()=>{},
    ALResultsArray:null,
    setALResultsArray:()=>{},
    goToResults:()=>{},
    showALResults:null,
    setshowALResults:()=>{}
})

export const ALevelProvider=({children})=>{

    const [showALevelBox,setALevelBox] = useState(true);
    const [showALevelStreamBox,setshowALevelStreamBox] = useState(false);
    const [showALevelBasketSubject,setshowALevelBasketSubject] = useState(false);
    const [showALevelCategory,setshowALevelCategory] = useState(true);
    const [showLondonALevelCategory,setshowLondonALevelCategory] = useState(false);
    const [showALevelMathsLocal,setshowALevelMathsLocal] = useState(false);
    const [showALevelSubject,setshowALevelSubject] = useState(false);
    const [showALResults,setshowALResults] = useState(false)
    const [ALSubjectsFromDB,setALSubjectsFromDB] = useState();
    const [ALResultsArray,setALResultsArray] = useState([]);


    const goToALevelCategory=()=>{
        setshowALevelCategory(true);
        setshowALevelStreamBox(false);
    }

    const goToALevelLondonCategory=()=>{
       setshowLondonALevelCategory(true);
       setshowALevelStreamBox(false);
       setshowALevelCategory(false);
    }

    const goToStreams = ()=>{
        setshowALevelStreamBox(true);
        setshowALevelCategory(false);
        setshowALevelMathsLocal(false);
        setALevelBox(true);
    }

    const goToALevelLocalMaths=()=>{    
        setshowALevelSubject(true);
        setshowALevelMathsLocal(true);
        setALevelBox(false);
    }

    const goToResults=()=>{
        setshowALevelCategory(false);
        setshowALevelStreamBox(false);
        setshowALevelMathsLocal(false);
        setshowALResults(true);
        setALevelBox(true);

    }




    
   const value={

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
        showALResults,setshowALResults

    }


    return(
        <ALevelContext.Provider value={value}>
            {children}
        </ALevelContext.Provider>
    )
}