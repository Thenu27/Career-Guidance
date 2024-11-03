const { createContext, useState } = require("react");

export const ProgressContext= createContext({
    hidden:"",
    sethidden:()=>null,

    // page:"",
    // setPage:()=>null,

    // isVisited:false,
    // setisVisited:()=>{}

    vistedPages:{
        home:false,
        assessment:false,
        option:false
        },
        
    setVisitedPages: () => null,    
});

export const ProgressProvider = ({children}) =>{
    const [hidden,sethidden]=useState("");
    // const [page,setPage]=useState("");
    // const [isVisited,setisVisited] = useState();
    
    const [visitedPages, setVisitedPages] = useState({
        home: false,
        assessment: false,
        option:false,
        extraCurricular:false,
        OLevelPage:false,
        ALevelPage:false,
        CalculatingPage:false,
        IntelligencePage:false
      });

    const value = {hidden,sethidden,visitedPages,setVisitedPages};

    return(
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}
