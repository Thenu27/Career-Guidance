const { createContext, useState } = require("react");

// Creating ActivitiesContext with default values
export const ActivitiesContext = createContext({
    goToECListPage: () => null,
    goToSubActivities: () => null,
    goToExtraLevelsPage: () => null,
    showExtraLevelsPage: null,
    setshowExtraLevelsPage: () => null,
    SelectedExtraActivities: null,
    setSelectedExtraActivities: () => null,
    ActivitiesObj: null,
    setActivitiesObj: () => null,
    ActivitiesWithSub: null,
    setActivitiesWithSub: () => null,
    ShowActivitiesSub: null,
    setShowActivitiesSub: () => null,
    SubActivities: null,
    setSubActivities: () => null,
    navigateSubjects: () => null,
    currentSubjectIndex: null,
    setCurrentSubjectIndex: () => null,
    ActivitiesWithoutSub: null,
    setActivitiesWithoutSub: () => {},
    SelectedSubActivities: null,
    setSelectedSubActivities: () => {},
    selectedButtons: null,
    setselectedButtons: () => {},
    FinalActivitiesList: null,
    setFinalActivitiesList: () => {},
    ActivitiesToSendBE: null,
    setActivitiesToSendBE: () => {},
    MainActivities: null,
    setMainActivities: () => {}
});

// ActivitiesProvider component to manage and provide context values
export const ActivitiesProvider = ({ children }) => {
    // State for managing various activity-related properties
    const [showExtraLevelsPage, setshowExtraLevelsPage] = useState(false);
    const [SelectedExtraActivities, setSelectedExtraActivities] = useState([]);
    const [ActivitiesObj, setActivitiesObj] = useState({});
    const [ActivitiesWithSub, setActivitiesWithSub] = useState({});
    const [ShowActivitiesSub, setShowActivitiesSub] = useState(false);
    const [SubActivities, setSubActivities] = useState([]);
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [ActivitiesWithoutSub, setActivitiesWithoutSub] = useState([]);
    const [SelectedSubActivities, setSelectedSubActivities] = useState([]);
    const [selectedButtons, setselectedButtons] = useState([]);
    const [FinalActivitiesList, setFinalActivitiesList] = useState([]);
    const [ActivitiesToSendBE, setActivitiesToSendBE] = useState({});
    const [MainActivities, setMainActivities] = useState([]);

    // Function to navigate back to the Extra Curricular List page
    const goToECListPage = () => {
        setshowExtraLevelsPage(false);
        setShowActivitiesSub(false);
    };

    // Function to navigate to Sub Activities page
    const goToSubActivities = () => {
        setshowExtraLevelsPage(false);
        setShowActivitiesSub(true);
    };

    // Function to navigate to Extra Levels page
    const goToExtraLevelsPage = () => {
        setshowExtraLevelsPage(true);
        setShowActivitiesSub(false);
    };

    // Function to navigate between subjects based on index
    const navigateSubjects = (Array) => {
        if (currentSubjectIndex < Array.length) {
            return Array[currentSubjectIndex];
        } else {
            goToExtraLevelsPage();
        }
        setCurrentSubjectIndex((prevIndex) => prevIndex + 1);
    };

    // Defining the values to be provided by the context
    const value = {
        goToExtraLevelsPage,
        goToSubActivities,
        goToECListPage,
        showExtraLevelsPage,
        setshowExtraLevelsPage,
        SelectedExtraActivities,
        setSelectedExtraActivities,
        ActivitiesObj,
        setActivitiesObj,
        ActivitiesWithSub,
        setActivitiesWithSub,
        ShowActivitiesSub,
        setShowActivitiesSub,
        SubActivities,
        setSubActivities,
        navigateSubjects,
        currentSubjectIndex,
        setCurrentSubjectIndex,
        setActivitiesWithoutSub,
        ActivitiesWithoutSub,
        SelectedSubActivities,
        setSelectedSubActivities,
        selectedButtons,
        setselectedButtons,
        FinalActivitiesList,
        setFinalActivitiesList,
        ActivitiesToSendBE,
        setActivitiesToSendBE,
        MainActivities,
        setMainActivities
    };

    return (
        <ActivitiesContext.Provider value={value}>
            {children}
        </ActivitiesContext.Provider>
    );
};
