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
    goToOLevelBox:()=>{}


})

export const OLevelProvider = ({children})=>{

    const [showOLevelBox,setshowOLevelBox] = useState(true);
    const [showOLevelLondStream,setshowOLevelLondStream]=useState(false);
    const [showOLevelLocalSubj,setshowOLevelLocalSubj]=useState(false);
    const [showOLevelBasketSubjects,setshowOLevelBasketSubjects] = useState(false);
    const [showOLevelSubj,setshowOLevelSubj]=useState(false)

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

    const value={
        showOLevelBox,
        setshowOLevelBox,
        showOLevelLondStream,
        setshowOLevelLondStream,
        showOLevelSubj,
        setshowOLevelSubj,
        showOLevelBox,
        showOLevelBasketSubjects,
        setshowOLevelBasketSubjects,
        goToLocalBasket,
        goToLocalCommonSubjects,
        showOLevelLocalSubj,
        setshowOLevelLocalSubj,
        goToLondonStreamBox,
        goToOLevelBox
    
    }

    return(
        <OLevelContext.Provider value={value}>
            {children}
        </OLevelContext.Provider>
    )
}