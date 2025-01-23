import {createContext, React,useState }from 'react'

export const IntelligenceContext = createContext({
    SelectedIntelligencAdmin:null,
    setSelectedIntelligenceAdmin:()=>null,
    AdminQuestions:null,
    setAdminQuestions:()=>null


});

export const IntellienceProvider =({children})=>{
    const [SelectedIntelligenceAdmin,setSelectedIntelligenceAdmin] =useState([]);
    const [AdminQuestions,setAdminQuestions]=useState([])

    return(
        <IntelligenceContext.Provider value={{
             SelectedIntelligenceAdmin ,
             setSelectedIntelligenceAdmin,
             setAdminQuestions,
             AdminQuestions


             
             
             
             }}>
        {children}
        </IntelligenceContext.Provider>
    )
}