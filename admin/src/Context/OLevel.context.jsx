import { createContext,useState,React } from "react";

export const OLevelContext = createContext({
    ShowOLStream:null,
    setShowOLStream:()=>null,
    OLevelLocalSubj:null,
    setOLevelLocalSubj:()=>{},
    setOLevelIndex:()=>{},
    OLevelIndex:null,
    OLevelCoreLocal:null,
    setOLevelCoreLocal:()=>{},
    ShowlocalCoreOL:null,
    setShowlocalCoreOL:()=>{},
    OLevelBasketLocal:null,
    setOLevelBasketLocal:()=>{}
    
})

export const OLevelProvider =({children})=>{

    const [ShowOLStream,setShowOLStream] =useState(true);
    const [OLevelLocalSubj,setOLevelLocalSubj] =useState([]);
    const [OLevelIndex,setOLevelIndex]=useState();
    const [OLevelCoreLocal,setOLevelCoreLocal] = useState([]);
    const [ShowlocalCoreOL,setShowlocalCoreOL] = useState(true);
    const [OLevelBasketLocal,setOLevelBasketLocal] = useState([]);





    return <OLevelContext.Provider value={{
        setShowOLStream,
        ShowOLStream,
        OLevelLocalSubj,
        setOLevelLocalSubj,
        setOLevelIndex,OLevelIndex,
        OLevelCoreLocal,
        setOLevelCoreLocal,
        ShowlocalCoreOL,
        setShowlocalCoreOL,
        OLevelBasketLocal,
        setOLevelBasketLocal
    }}>
        {children}
    </OLevelContext.Provider>
}