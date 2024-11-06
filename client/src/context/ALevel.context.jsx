import { createContext, useState } from "react"

export const ALevelContext = createContext({
    showALevelBox:null,
    setALevelBox:()=>{},
    showALevelStreamBox:null,
    setshowALevelStreamBox:()=>{},
    showALevelLocalCommonSubject:null,
    setshowALevelLocalCommonSubject:()=>{},
    showALevelBasketSubject:null,
    setshowALevelBasketSubject:()=>{},
    showALevelCategory:null,
    setshowALevelCategory:()=>{},
    goToStreams:()=>{},
    goToALevelCategory:()=>{},
    goToALevelLondonCategory:()=>{},
    showLondonALevelCategory:null,
    setshowLondonALevelCategory:()=>{}


})

export const ALevelProvider=({children})=>{

    const [showALevelBox,setALevelBox] = useState(true);
    const [showALevelStreamBox,setshowALevelStreamBox] = useState(false);
    const [showALevelLocalCommonSubject,setshowALevelLocalCommonSubject] = useState(false);
    const [showALevelBasketSubject,setshowALevelBasketSubject] = useState(false);
    const [showALevelCategory,setshowALevelCategory] = useState(true);
    const [showLondonALevelCategory,setshowLondonALevelCategory] = useState(false)
    

    const goToALevelCategory=()=>{
        setshowALevelCategory(true);
        setshowALevelStreamBox(false)
    }

    const goToALevelLondonCategory=()=>{
       setshowLondonALevelCategory(true);
       setshowALevelStreamBox(false);
       setshowALevelCategory(false)
    }

    const goToStreams = ()=>{
        setshowALevelStreamBox(true);
        setshowALevelCategory(false)
    }

    const goToCommonSubjects = ()=>{
        setshowALevelLocalCommonSubject(true);
        setshowALevelStreamBox(false);
    }
    
   const value={
        showALevelBox,
        setALevelBox,
        showALevelStreamBox,
        setshowALevelStreamBox,
        showALevelLocalCommonSubject,
        setshowALevelLocalCommonSubject,
        showALevelBasketSubject,
        setshowALevelBasketSubject,
        showALevelCategory,
        setshowALevelCategory,
        showLondonALevelCategory,
        setshowLondonALevelCategory,
        goToCommonSubjects,
        goToStreams,
        goToALevelCategory,
        goToALevelLondonCategory

    }


    return(
        <ALevelContext.Provider value={value}>
            {children}
        </ALevelContext.Provider>
    )
}