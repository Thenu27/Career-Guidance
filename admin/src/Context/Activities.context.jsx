import React, { createContext, useState } from 'react';

// Create the context
export const ActivitiesContext = createContext({

});

// Create the provider component
export const ActivitiesProvider = ({ children }) => {
    const [SelectedMainActivities, setSelectedMainActivity] = useState([]);


    return (
        <ActivitiesContext.Provider value={{ 
            SelectedMainActivities,
            setSelectedMainActivity

        }}>
            {children}
        </ActivitiesContext.Provider>
    );
};