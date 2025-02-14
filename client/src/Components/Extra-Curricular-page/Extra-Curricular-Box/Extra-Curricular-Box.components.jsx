import './Extra-Curricular-Box.styles.css';

// Importing necessary dependencies
import { useEffect, useContext } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';

const ExtraCurricularBox = () => {
    // Accessing context values
    const {
        SelectedExtraActivities, // Stores selected extra-curricular activities
        setSelectedExtraActivities, // Function to update selected extra activities
        SubActivities, // Stores sub-activities
        ShowActivitiesSub, // Boolean flag for showing sub-activities
        selectedButtons, // Tracks selected buttons (activities)
        setselectedButtons, // Function to update selected buttons
        setSelectedSubActivities, // Function to update selected sub-activities
        MainActivities // List of main activities
    } = useContext(ActivitiesContext);

    // Reset selected sub-activities and extra activities when the component mounts
    useEffect(() => {
        setSelectedSubActivities([]); 
        setSelectedExtraActivities([]);
    }, []);

    // Update selected buttons state when selected extra activities change
    useEffect(() => {
        setselectedButtons(SelectedExtraActivities);
    }, [SelectedExtraActivities]);
    
    // (This commented-out effect would sync extra activities with selected buttons but is not needed if they are already synchronized.)

    // Function to handle button selection (toggle activity selection)
    const btnSelectedHandler = (activity) => {
        if (selectedButtons.includes(activity)) {
            // Remove the activity if already selected
            setselectedButtons(selectedButtons.filter(item => item !== activity));
            setSelectedExtraActivities(selectedButtons.filter(item => item !== activity));
        } else {
            // Add the activity if not selected
            setselectedButtons([...selectedButtons, activity]);
            setSelectedExtraActivities([...selectedButtons, activity]);
        }
    };

    // Log when ShowActivitiesSub changes (for debugging)
    useEffect(() => {
        console.log(ShowActivitiesSub);
    }, [ShowActivitiesSub]);

    // Log when selectedButtons state changes (for debugging)
    useEffect(() => {
        console.log(selectedButtons);
    }, [selectedButtons]);

    // Log when SubActivities state changes (for debugging)
    useEffect(() => {
        console.log("SubActivities", SubActivities);
    }, [SubActivities]);

    return (
        <>
            {/* Title Section */}
            <div className='extra-curricular-title-container'>
                <h2 className='extra-curricular-title'>Select the Extra Curricular Activities you have done from the following</h2>
            </div>

            {/* Activities Selection Container */}
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container'>
                    {MainActivities.map((activity, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => btnSelectedHandler(activity)}
                                className={`extra-curricular-btn ${selectedButtons.includes(activity) ? "extra-curricular-btn-selected" : ""}`}
                            >
                                {activity}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ExtraCurricularBox;
