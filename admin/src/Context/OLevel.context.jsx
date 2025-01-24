import { createContext,useState,React } from "react";

export const OLevelContext = createContext({
    ShowOLStream:null,
    setShowOLStream:()=>null,
    OLevelLocalSubj:null,
    setOLevelLocalSubj:()=>{},
    setOLevelIndex:()=>{},
    OLevelIndex:null,
    OLevelCoreLocal:null,
    setOLevelCoreLocal:()=>{}
})

export const OLevelProvider =({children})=>{

    const [ShowOLStream,setShowOLStream] =useState(true);
    const [OLevelLocalSubj,setOLevelLocalSubj] =useState([]);
    const [OLevelIndex,setOLevelIndex]=useState();
    const [OLevelCoreLocal,setOLevelCoreLocal] = useState([]);



    return <OLevelContext.Provider value={{
        setShowOLStream,
        ShowOLStream,
        OLevelLocalSubj,
        setOLevelLocalSubj,
        setOLevelIndex,OLevelIndex,
        OLevelCoreLocal,
        setOLevelCoreLocal
    }}>
        {children}
    </OLevelContext.Provider>
}