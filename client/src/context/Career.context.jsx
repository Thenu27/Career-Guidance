import { createContext,useState } from "react";

export const CareerContext = createContext({

    showCareerFieldBox:null,
    setshowCareerFieldBox:()=>{},
    showCareerDropdown:null,
    setShowCareerDropdown:()=>{},
    showMatchedProfileMsg:null,
    setshowMatchedProfileMsg:()=>{},
    SelectedCareerField:null,
    setSelectedCareerField:()=>{},
    Careers:null,
    setCareers:()=>{}

})

export const CareerProvider=({children})=>{

    const [showCareerFieldBox,setshowCareerFieldBox] = useState(true);
    const [showCareerDropdown,setShowCareerDropdown] = useState(false);
    const [showMatchedProfileMsg,setshowMatchedProfileMsg] = useState(false);
    const [SelectedCareerField,setSelectedCareerField] = useState([]);
    const [Careers,setCareers] = useState({})

    const value={

        showCareerFieldBox,
        setshowCareerFieldBox,
        showCareerDropdown,
        setShowCareerDropdown,
        showMatchedProfileMsg,
        setshowMatchedProfileMsg,
        SelectedCareerField,
        setSelectedCareerField,
        Careers,
        setCareers
    }

    return(
        <CareerContext.Provider value={value}>
            {children}
        </CareerContext.Provider>
    )
}
