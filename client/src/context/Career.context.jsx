import { createContext,useState } from "react";

export const CareerContext = createContext({

    showCareerFieldBox:null,
    setshowCareerFieldBox:()=>{},
    showCareerDropdown:null,
    setShowCareerDropdown:()=>{},
    showMatchedProfileMsg:null,
    setshowMatchedProfileMsg:()=>{},
    SelectedCareerField:null,
    setSelectedCareerField:()=>{}

})

export const CareerProvider=({children})=>{

    const [showCareerFieldBox,setshowCareerFieldBox] = useState(true);
    const [showCareerDropdown,setShowCareerDropdown] = useState(false);
    const [showMatchedProfileMsg,setshowMatchedProfileMsg] = useState(false);
    const [SelectedCareerField,setSelectedCareerField] = useState([]);

    const value={

        showCareerFieldBox,
        setshowCareerFieldBox,
        showCareerDropdown,
        setShowCareerDropdown,
        showMatchedProfileMsg,
        setshowMatchedProfileMsg,
        SelectedCareerField,
        setSelectedCareerField
    }

    return(
        <CareerContext.Provider value={value}>
            {children}
        </CareerContext.Provider>
    )
}
