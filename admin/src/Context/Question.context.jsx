import { createContext, useState } from "react";

export const QuestionContext = createContext({
questionToBeAdded:null,
setquestionToBeAdded:()=>{}
})

export const QuestionProvider =({children})=>{

    const [questionToBeAdded,setquestionToBeAdded] = useState({question:'',intelligenceId:0})

    return(
        <QuestionContext.Provider value={{
            questionToBeAdded,
            setquestionToBeAdded
        }}>
            {children}
        </QuestionContext.Provider>
    )
}