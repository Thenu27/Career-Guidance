import { createContext,useState,React } from "react";

export const ALevelContext = createContext({
    ALevelLocalSubjects:null,
    setALevelLocalSubjects:()=>{},
    ShowBioScience:null,
    setShowBioScience:()=>{},
    ShowCommerce:null,
    setShowCommerce:()=>{},
    ShowArts:null,
    setShowArts:()=>{},
    ShowTechnology:null,
    setShowTechnology:()=>{},
    ShowPhysicalScience:null,
    setShowPhysicalScience:()=>{},
    SelectedSubject:null,
    setSelectedSubject:()=>{}
})

export const ALevelProvider =({children})=>{

   const [ALevelLocalSubjects,setALevelLocalSubjects] =useState([]);
   const [ShowPhysicalScience,setShowPhysicalScience] =useState(false);
   const [ShowBioScience,setShowBioScience] =useState(false);
   const [ShowCommerce,setShowCommerce] =useState(false);
   const [ShowArts,setShowArts] =useState(false);
   const [ShowTechnology,setShowTechnology] =useState(false);
   const [SelectedSubject,setSelectedSubject] =useState(null);
   

    return <ALevelContext.Provider value={{
        ALevelLocalSubjects,
        setALevelLocalSubjects,
        ShowPhysicalScience,
        setShowPhysicalScience,
        ShowBioScience,
        setShowBioScience,
        ShowCommerce,
        setShowCommerce,
        ShowArts,
        setShowArts,
        ShowTechnology,
        setShowTechnology,
        SelectedSubject,
        setSelectedSubject

    }}>
        {children}
    </ALevelContext.Provider>
}