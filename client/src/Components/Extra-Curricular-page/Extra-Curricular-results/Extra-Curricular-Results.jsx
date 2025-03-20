import './Extra-Curricular-results.css';

// Importing necessary dependencies
import { useContext, useEffect, useState } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';

const ExtraCurricularResults = () => {
    // Accessing context values
    const {
        SelectedSubActivities, // Stores selected sub-activities
        ActivitiesWithoutSub, // Stores activities that have no sub-activities
        FinalActivitiesList, // Stores the final list of activities
        setFinalActivitiesList, // Function to update final activities list
        ActivitiesToSendBE, // Object to store activities with their levels
        setActivitiesToSendBE // Function to update activities to send to backend
    } = useContext(ActivitiesContext);

    // State to store the level of participation for each activity
    const [Level, setLevel] = useState(() => {
        const initialLength = SelectedSubActivities.concat(ActivitiesWithoutSub).length;
        return Array(initialLength).fill("Level"); // Initialize levels for all activities
    });

    // Effect to update the final activities list when selected activities change
    useEffect(() => {
        setFinalActivitiesList(SelectedSubActivities.concat(ActivitiesWithoutSub)); // Combine selected and standalone activities
        // console.log("FinalActivitiesList", FinalActivitiesList);
    }, [SelectedSubActivities, ActivitiesWithoutSub]);

    // Effect to update the level state when final activities list changes
    useEffect(() => {
        setLevel(Array(FinalActivitiesList.length).fill("Level"));
    }, [FinalActivitiesList]);

    // Function to update the activity level and store it in ActivitiesToSendBE
    const AddinglevelsAndActivities = (activity, level, index) => {
        setActivitiesToSendBE((prev) => {
            const updated = { ...prev };
            updated[activity] = level; // Assign the selected level to the activity
            return updated;
        });
    };

    // Log ActivitiesToSendBE for debugging
    // useEffect(() => {
    //     console.log("ActivitiesToSendBE", ActivitiesToSendBE);
    // }, [ActivitiesToSendBE]);

    // Function to update the selected level for an activity
    const UpdateLevel = (activity, level, index) => {
        setLevel((prev) => {
            const newLevels = [...prev];
            newLevels[index] = level; // Update the level for the specific activity
            return newLevels;
        });

        AddinglevelsAndActivities(activity, level, index); // Store the selected level in the context
    };

    return (
        <>
            {/* Title Section */}
            <div className='extra-curricular-title-container'>
                <h2 className='extra-curricular-title'>
                    Select the Level you have done from the Activities you have selected
                </h2>
            </div>

            {/* Activities Selection Container */}
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container ecb-container'>
                    {FinalActivitiesList.map((activity, index) => {
                        return (
                            <button 
                                key={index} 
                                className={`extra-curricular-btn ecb`}
                            >
                                <p>{activity}</p>
                                {/* Custom dropdown for selecting participation level */}
                                <label className="custom-dropdown-wrapper">
                                    <div className="custom-dropdown-button">
                                        {Level[index]} {/* Display the selected level */}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="custom-dropdown-input" 
                                        id="custom-dropdown-toggle" 
                                    />
                                    <ul className="custom-dropdown-menu">
                                        <li onClick={() => UpdateLevel(activity, "Just Participated", index)}>Just Participated</li>
                                        <li onClick={() => UpdateLevel(activity, "Zonal/Interschool", index)}>Zonal/Interschool</li>
                                        <li onClick={() => UpdateLevel(activity, "School", index)}>School</li>
                                        <li onClick={() => UpdateLevel(activity, "National", index)}>National</li>
                                        <li onClick={() => UpdateLevel(activity, "International", index)}>International</li>
                                    </ul>
                                </label>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ExtraCurricularResults;
