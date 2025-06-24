import { createContext, useState } from "react";

export const CoursesContext =createContext({

    SelectedCourseField:null,
    setSelectedCourseField:()=>{},
    SelectedCourseFieldId:null,
    setSelectedCourseFieldId:()=>{}

})

export const CoursesProvider=({children})=>{

    const [SelectedCourseField,setSelectedCourseField] = useState([]);
    const [SelectedCourseFieldId,setSelectedCourseFieldId] = useState();

    return(
        <CoursesContext.Provider value={{
            SelectedCourseField,
            setSelectedCourseField,
            SelectedCourseFieldId,
            setSelectedCourseFieldId
        }}>
            {children}
        </CoursesContext.Provider>

        
    )
}