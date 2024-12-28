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
    goToLocalCommonSubjects:()=>{},
    goToLondonStreamBox:()=>{},
    goToOLevelBox:()=>{},
    showOLevelResults:null,
    setshowOLevelResults:()=>{},
    goToOLevelResults:()=>{},
    OLevelResultsArray:null,
    setOLevelResultsArray:()=>{},
    goToBasketLocal:()=>{},
    showOLLocalBakset:null,
    setshowOLLocalBakset:()=>{},
    goToCommonLocal:()=>{}


})

export const OLevelProvider = ({children})=>{

    const [OLevelResultsArray,setOLevelResultsArray] = useState([]);
    const [showOLevelBox,setshowOLevelBox] = useState(true);
    const [showOLevelLondStream,setshowOLevelLondStream]=useState(false);
    const [showOLevelLocalSubj,setshowOLevelLocalSubj]=useState(false);
    const [showOLevelSubj,setshowOLevelSubj]=useState(false);
    const [showOLevelResults,setshowOLevelResults]=useState(false);
    const [showOLLocalBakset,setshowOLLocalBakset] = useState(false)



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

    const goToBasketLocal=()=>{
        setshowOLevelSubj(true)
        setshowOLLocalBakset(true);
        setshowOLevelResults(false)
    }

    const goToCommonLocal=()=>{
        setshowOLevelSubj(true)
        setshowOLLocalBakset(false);
        setshowOLevelResults(false)
    }

    const value={
        showOLevelBox,
        setshowOLevelBox,
        showOLevelLondStream,
        setshowOLevelLondStream,
        showOLevelSubj,
        setshowOLevelSubj,
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
        goToBasketLocal,
        showOLLocalBakset,
        setshowOLLocalBakset,
        goToCommonLocal
    
    }

    return(
        <OLevelContext.Provider value={value}>
            {children}
        </OLevelContext.Provider>
    )
}