const { createContext, useState } = require("react");

// Creating ProgressContext with default values
export const ProgressContext = createContext({
    intelligenceScore: null,
    setintelligenceScore: () => null,

    hidden: "",
    sethidden: () => null,

    visitedPages: {
        home: false,
        assessment: false,
        option: false
    },
    
    setVisitedPages: () => null,    
});

// ProgressProvider component to manage and provide context values
export const ProgressProvider = ({ children }) => {
    // State to store a hidden field value (if needed)
    const [hidden, sethidden] = useState("");

    // State to track intelligence scores
    const [intelligenceScore, setintelligenceScore] = useState([]);

    // State to track the pages visited by the user
    const [visitedPages, setVisitedPages] = useState({
        home: false,
        assessment: false,
        option: false,
        extraCurricular: false,
        OLevelPage: false,
        ALevelPage: false,
        CalculatingPage: false,
        IntelligencePage: false,
        CareerFieldPage: false,
        CareersPage: false
    });

    // Defining the values to be provided by the context
    const value = {
        hidden,
        sethidden,
        visitedPages,
        setVisitedPages,
        intelligenceScore,
        setintelligenceScore
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
