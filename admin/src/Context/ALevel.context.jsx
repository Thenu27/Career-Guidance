import { createContext,useState,React } from "react";

export const ALevelContext = createContext({
    ALevelLocalSubjects:null,
    setALevelLocalSubjects:()=>{}
})

export const ALevelProvider =({children})=>{

   const [ALevelLocalSubjects,setALevelLocalSubjects] =useState([])




    return <ALevelContext.Provider value={{
        ALevelLocalSubjects,
        setALevelLocalSubjects
    }}>
        {children}
    </ALevelContext.Provider>
}