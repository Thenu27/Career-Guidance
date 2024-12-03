const { createContext, useState } = require("react");

export const ProgressContext= createContext({

    intelligenceScore:null,
    setintelligenceScore:()=>null,

    hidden:"",
    sethidden:()=>null,

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

    const [intelligenceScore,setintelligenceScore]=useState([]);
    
    const [visitedPages, setVisitedPages] = useState({
        home: false,
        assessment: false,
        option:false,
        extraCurricular:false,
        OLevelPage:false,
        ALevelPage:false,
        CalculatingPage:false,
        IntelligencePage:false,
        CareerFieldPage:false,
        CareersPage:false
      });

    const value = {hidden,sethidden,visitedPages,setVisitedPages,intelligenceScore,setintelligenceScore};

    return(
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    )
}
