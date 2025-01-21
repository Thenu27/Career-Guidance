import {createContext, React,useState }from 'react'

const intelligenceContext = createContext();

export const intellienceProvider =({children})=>{
    const [SelectedIntelligence,setSelectedIntelligence] =useState();

    return(
        <intelligenceContext.Provider value={{
             SelectedIntelligence ,
             setSelectedIntelligence
             
             
             
             }}>
        {children}
        </intelligenceContext.Provider>
    )
}