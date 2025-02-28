import { createContext, useState } from "react";

export const CareerContext =createContext({
    SelectedField:null,
    setSelectedField:()=>{},
    SelectedCareerDetails:null,
    setSelectedCareerDetails:()=>{},
    SelectedCareer:null,
    setSelectedCareer:()=>{}
})

export const CareerProvider=({children})=>{

    const [SelectedField,setSelectedField] = useState();
    const [SelectedCareerDetails, setSelectedCareerDetails] = useState(null);
    const [SelectedCareer,setSelectedCareer] = useState();



    return(
        <CareerContext.Provider value={{
            SelectedField,
            setSelectedField,
            SelectedCareerDetails,
            setSelectedCareerDetails,
            SelectedCareer,
            setSelectedCareer
        }}>
            {children}
        </CareerContext.Provider>

        
    )
}