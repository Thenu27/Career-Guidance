const { createContext, useState } = require("react");

export const OLevelContext = createContext({

    showOLevelBox:null,
    setshowOLevelBox:()=>{},
    showOLevelLondStream:null,
    setshowOLevelLondStream:()=>{},
    showOLevelLocalSubj:null,
    setshowOLevelLocalSubj:()=>{},
    showOLevelSubj:null,
    setshowOLevelSubj:()=>{},
    showOLevelBasketSubjects:null,
    setshowOLevelBasketSubjects:()=>{},
    goToLocalBasket:()=>{},
    goToLocalCommonSubjects:()=>{},
    goToLondonStreamBox:()=>{},
    goToOLevelBox:()=>{},
    showOLevelResults:null,
    setshowOLevelResults:()=>{},
    goToOLevelResults:()=>{},
    OLevelResultsArray:null,
    setOLevelResultsArray:()=>{},
    goToBasketPage:()=>{}


})

export const OLevelProvider = ({children})=>{

    const [OLevelResultsArray,setOLevelResultsArray] = useState([]);
    const [showOLevelBox,setshowOLevelBox] = useState(true);
    const [showOLevelLondStream,setshowOLevelLondStream]=useState(false);
    const [showOLevelLocalSubj,setshowOLevelLocalSubj]=useState(false);
    const [showOLevelBasketSubjects,setshowOLevelBasketSubjects] = useState(false);
    const [showOLevelSubj,setshowOLevelSubj]=useState(false);
    const [showOLevelResults,setshowOLevelResults]=useState(false);

    const goToLocalBasket = ()=>{
        setshowOLevelBasketSubjects(true);
        setshowOLevelLocalSubj(false);     
           
    }

    const goToOLevelBox=()=>{
        setshowOLevelBox(true);
        setshowOLevelLocalSubj(false);
        setshowOLevelLondStream(true);
        setshowOLevelSubj(false)
    }

    const goToLocalCommonSubjects = ()=>{
        setshowOLevelLocalSubj(true);
        setshowOLevelBox(false);
        setshowOLevelSubj(true);
    }

    const goToLondonStreamBox = ()=>{
        setshowOLevelLondStream(true);
        setshowOLevelBox(false);
        
    }

    const goToOLevelResults=()=>{
        setshowOLevelBox(false);
        setshowOLevelSubj(false);
        setshowOLevelLondStream(false);
        setshowOLevelResults(true);
    }

    const goToBasketPage = ()=>{
        setshowOLevelBasketSubjects(true);
        setshowOLevelResults(false);
        setshowOLevelSubj(true);
    }

    const value={
        showOLevelBox,
        setshowOLevelBox,
        showOLevelLondStream,
        setshowOLevelLondStream,
        showOLevelSubj,
        setshowOLevelSubj,
        showOLevelBasketSubjects,
        setshowOLevelBasketSubjects,
        goToLocalBasket,
        goToLocalCommonSubjects,
        showOLevelLocalSubj,
        setshowOLevelLocalSubj,
        goToLondonStreamBox,
        goToOLevelBox,
        goToOLevelResults,
        showOLevelResults,
        setshowOLevelResults,
        OLevelResultsArray,
        setOLevelResultsArray,
        goToBasketPage
    
    }

    return(
        <OLevelContext.Provider value={value}>
            {children}
        </OLevelContext.Provider>
    )
}