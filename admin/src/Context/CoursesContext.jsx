import { createContext, useState } from "react";

export const CoursesContext =createContext({
    // SelectedField:null,
    // setSelectedField:()=>{},
    // SelectedCareerDetails:null,
    // setSelectedCareerDetails:()=>{},
    // SelectedCareer:null,
    // setSelectedCareer:()=>{},
    // SelectedCareerId:null,
    // setSelectedCareerId:()=>{}
        SelectedCourseField:null,
    setSelectedCourseField:()=>{}

})

export const CoursesProvider=({children})=>{

    // const [SelectedField,setSelectedField] = useState();
    // const [SelectedCareerDetails, setSelectedCareerDetails] = useState(null);
    // const [SelectedCareer,setSelectedCareer] = useState();
    // const [SelectedCareerId,setSelectedCareerId] = useState();

    const [SelectedCourseField,setSelectedCourseField] = useState([]);

    return(
        <CoursesContext.Provider value={{
            SelectedCourseField,
            setSelectedCourseField
        }}>
            {children}
        </CoursesContext.Provider>

        
    )
}