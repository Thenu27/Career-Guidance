import { createContext, useState } from "react";

export const CareerContext =createContext({
    SelectedField:null,
    setSelectedField:()=>{},
    SelectedCareerDetails:null,
    setSelectedCareerDetails:()=>{},
    SelectedCareer:null,
    setSelectedCareer:()=>{},
    SelectedCareerId:null,
    setSelectedCareerId:()=>{}

})

export const CareerProvider=({children})=>{

    const [SelectedField,setSelectedField] = useState();
    const [SelectedCareerDetails, setSelectedCareerDetails] = useState(null);
    const [SelectedCareer,setSelectedCareer] = useState();
    const [SelectedCareerId,setSelectedCareerId] = useState();



    return(
        <CareerContext.Provider value={{
            SelectedField,
            setSelectedField,
            SelectedCareerDetails,
            setSelectedCareerDetails,
            SelectedCareer,
            setSelectedCareer,
            SelectedCareerId,
            setSelectedCareerId
        }}>
            {children}
        </CareerContext.Provider>

        
    )
}