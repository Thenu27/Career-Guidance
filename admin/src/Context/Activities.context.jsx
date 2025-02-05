import React, { createContext, useState } from 'react';

// Create the context
export const ActivitiesContext = createContext({
    SelectedMainActivity:null,
    setSelectedMainActivity:()=>{},
    SubActivities:null,
    SubActivities:()=>{},
    SelectedSubActivity:null,
    setSelectedSubActivity:()=>{},
    SubActivityData:null,
    setSubActivityData:()=>{}
});

// Create the provider component
export const ActivitiesProvider = ({ children }) => {
    const [SelectedMainActivity, setSelectedMainActivity] = useState();
    const [SubActivities,setSubActivities] = useState([]);
    const [SelectedSubActivity,setSelectedSubActivity] = useState();
    const [SubActivityData,setSubActivityData] =useState({});


    return (
        <ActivitiesContext.Provider value={{ 
            SelectedMainActivity,
            setSelectedMainActivity,
            SubActivities,
            setSubActivities,
            SelectedSubActivity,
            setSelectedSubActivity,
            SubActivityData,
            setSubActivityData

        }}>
            {children}
        </ActivitiesContext.Provider>
    );
};