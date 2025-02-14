const { createContext, useState } = require("react");

// Creating OLevelContext with default values
export const OLevelContext = createContext({
    showOLevelBox: null,
    setshowOLevelBox: () => {},
    showOLevelLondStream: null,
    setshowOLevelLondStream: () => {},
    showOLevelLocalSubj: null,
    setshowOLevelLocalSubj: () => {},
    showOLevelSubj: null,
    setshowOLevelSubj: () => {},
    goToLocalCommonSubjects: () => {},
    goToLondonStreamBox: () => {},
    goToOLevelBox: () => {},
    showOLevelResults: null,
    setshowOLevelResults: () => {},
    goToOLevelResults: () => {},
    OLevelResultsArray: null,
    setOLevelResultsArray: () => {},
    goToBasketLocal: () => {},
    showOLLocalBakset: null,
    setshowOLLocalBakset: () => {},
    goToCommonLocal: () => {}
});

// OLevelProvider component to manage and provide context values
export const OLevelProvider = ({ children }) => {
    // State to store O-Level results
    const [OLevelResultsArray, setOLevelResultsArray] = useState([]);

    // State to control visibility of different O-Level sections
    const [showOLevelBox, setshowOLevelBox] = useState(true);
    const [showOLevelLondStream, setshowOLevelLondStream] = useState(false);
    const [showOLevelLocalSubj, setshowOLevelLocalSubj] = useState(false);
    const [showOLevelSubj, setshowOLevelSubj] = useState(false);
    const [showOLevelResults, setshowOLevelResults] = useState(false);
    const [showOLLocalBakset, setshowOLLocalBakset] = useState(false);

    // Function to navigate to O-Level selection box
    const goToOLevelBox = () => {
        setshowOLevelBox(true);
        setshowOLevelLocalSubj(false);
        setshowOLevelLondStream(true);
        setshowOLevelSubj(false);
    };

    // Function to navigate to Local O-Level common subjects selection
    const goToLocalCommonSubjects = () => {
        setshowOLevelLocalSubj(true);
        setshowOLevelBox(false);
        setshowOLevelSubj(true);
    };

    // Function to navigate to London O-Level stream selection
    const goToLondonStreamBox = () => {
        setshowOLevelLondStream(true);
        setshowOLevelBox(false);
    };

    // Function to navigate to O-Level results page
    const goToOLevelResults = () => {
        setshowOLevelBox(false);
        setshowOLevelSubj(false);
        setshowOLevelLondStream(false);
        setshowOLevelResults(true);
    };

    // Function to navigate to Basket subjects for Local O-Level
    const goToBasketLocal = () => {
        setshowOLevelSubj(true);
        setshowOLLocalBakset(true);
        setshowOLevelResults(false);
    };

    // Function to navigate back to Common subjects for Local O-Level
    const goToCommonLocal = () => {
        setshowOLevelSubj(true);
        setshowOLLocalBakset(false);
        setshowOLevelResults(false);
    };

    // Defining the values to be provided by the context
    const value = {
        showOLevelBox,
        setshowOLevelBox,
        showOLevelLondStream,
        setshowOLevelLondStream,
        showOLevelSubj,
        setshowOLevelSubj,
        goToLocalCommonSubjects,
        showOLevelLocalSubj,
        setshowOLevelLocalSubj,
        goToLondonStreamBox,
        goToOLevelBox,
        goToOLevelResults,
        showOLevelResults,
        setshowOLevelResults,
        OLevelResultsArray,
        setOLevelResultsArray,
        goToBasketLocal,
        showOLLocalBakset,
        setshowOLLocalBakset,
        goToCommonLocal
    };

    return (
        <OLevelContext.Provider value={value}>
            {children}
        </OLevelContext.Provider>
    );
};
