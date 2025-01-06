const { createContext, useState } = require("react");

export const ActivitiesContext= createContext({
    goToECListPage:()=>null,
    goToSubActivities:()=>null,
    goToExtraLevelsPage:()=>null,
    showExtraLevelsPage:null,
    setshowExtraLevelsPage:()=>null,
    // showSubActivities:null,
    // setshowSubActivities:()=>null,
    SelectedExtraActivities:null,
    setSelectedExtraActivities:()=>null,
    ActivitiesObj:null,
    setActivitiesObj:()=>null,
    ActivitiesWithSub:null,
    setActivitiesWithSub:()=>null,
    ShowActivitiesSub:null,
    setShowActivitiesSub:()=>null,
    SubActivities:null,
    setSubActivities:()=>null,
    navigateSubjects:()=>null,
    currentSubjectIndex:null,
    setCurrentSubjectIndex:()=>null,
    navigateSubjects:()=>null,
    ActivitiesWithoutSub:null,
    setActivitiesWithoutSub:()=>{},
    SelectedSubActivities:null,
    setSelectedSubActivities:()=>{},
    selectedButtons:null,
    setselectedButtons:()=>{},
    FinalActivitiesList:null,
    setFinalActivitiesList:()=>{},
    ActivitiesToSendBE:null,
    setActivitiesToSendBE:()=>{}
    

});

export const ActivitiesProvider = ({children}) =>{

    const [showExtraLevelsPage,setshowExtraLevelsPage] = useState(false);
    // const [showSubActivities,setshowSubActivities] = useState(false);
    const [SelectedExtraActivities,setSelectedExtraActivities] = useState([]);
    const [ActivitiesObj,setActivitiesObj] = useState({});
    const [ActivitiesWithSub,setActivitiesWithSub] = useState({})
    const [ShowActivitiesSub,setShowActivitiesSub] = useState(false)
    const [SubActivities,setSubActivities] = useState([])
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const [ActivitiesWithoutSub,setActivitiesWithoutSub] =useState([]);
    const [SelectedSubActivities,setSelectedSubActivities] = useState([]);
    const[selectedButtons,setselectedButtons] = useState([]);
    const [FinalActivitiesList,setFinalActivitiesList] = useState([]);
    const [ActivitiesToSendBE,setActivitiesToSendBE] = useState({});
    



    
    const goToECListPage=()=>{
        setshowExtraLevelsPage(false);
        setShowActivitiesSub(false)

    }

    const goToSubActivities=()=>{
        setshowExtraLevelsPage(false);
        setShowActivitiesSub(true)
        
      }
  
      const goToExtraLevelsPage = ()=>{
        setshowExtraLevelsPage(true);
        setShowActivitiesSub(false)

      }

      const navigateSubjects=(Array)=>{
        if(currentSubjectIndex<Array.length){
           return Array[currentSubjectIndex];
           
        }else{
            goToExtraLevelsPage();
        }
        setCurrentSubjectIndex((prevIndex) => prevIndex + 1);
    
    }



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
        navigateSubjects,
        setActivitiesWithoutSub,
        ActivitiesWithoutSub,
        SelectedSubActivities,
        setSelectedSubActivities,
        selectedButtons,
        setselectedButtons,
        FinalActivitiesList,setFinalActivitiesList,
        ActivitiesToSendBE,setActivitiesToSendBE
    };

    return(
        <ActivitiesContext.Provider value={value}>
            {children}
        </ActivitiesContext.Provider>
    )
}
