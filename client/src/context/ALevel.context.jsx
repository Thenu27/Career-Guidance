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
    showALevelLocalScience:null,
    setshowALevelLocalScience:()=>{},
    goToALevelScience:()=>{},
    showALevelLocalCommerce:null,
    setALevelLocalCommerce:()=>{},
    goToALevelLocalCommerce:()=>{}

})

export const ALevelProvider=({children})=>{

    const [showALevelBox,setALevelBox] = useState(true);
    const [showALevelStreamBox,setshowALevelStreamBox] = useState(false);
    const [showALevelBasketSubject,setshowALevelBasketSubject] = useState(false);
    const [showALevelCategory,setshowALevelCategory] = useState(true);
    const [showLondonALevelCategory,setshowLondonALevelCategory] = useState(false);
    const [showALevelMathsLocal,setshowALevelMathsLocal] = useState(false);
    const [showALevelSubject,setshowALevelSubject] = useState(false);
    const [showALevelLocalScience,setshowALevelLocalScience] = useState(false);
    const [showALevelLocalCommerce,setALevelLocalCommerce]=useState(false);

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

    const goToALevelScience=()=>{
        setshowALevelSubject(true);
        setshowALevelLocalScience(true);
        setALevelBox(false);

    }

    const  goToALevelLocalCommerce=()=>{
        setshowALevelSubject(true);
        setALevelLocalCommerce(true);
        setALevelBox(false);
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
        showALevelLocalScience,
        setshowALevelLocalScience,
        goToALevelScience,
        goToALevelLocalCommerce,
        showALevelLocalCommerce

    }


    return(
        <ALevelContext.Provider value={value}>
            {children}
        </ALevelContext.Provider>
    )
}