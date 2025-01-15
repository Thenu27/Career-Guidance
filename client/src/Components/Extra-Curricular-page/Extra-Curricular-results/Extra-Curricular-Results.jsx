import './Extra-Curricular-results.css';
import { useContext, useEffect, useState } from 'react';
import { ActivitiesContext } from '../../../context/Activities.context';

const ExtraCurricularResults = () => {
    const {
        SelectedSubActivities,
        ActivitiesWithoutSub,
        FinalActivitiesList,
        setFinalActivitiesList,
        ActivitiesToSendBE,
        setActivitiesToSendBE,
    } = useContext(ActivitiesContext);

    const [Level, setLevel] = useState(() => {
        const initialLength = SelectedSubActivities.concat(ActivitiesWithoutSub).length;
        return Array(initialLength).fill("Level");
    });

    useEffect(() => {
        setFinalActivitiesList(SelectedSubActivities.concat(ActivitiesWithoutSub));
        console.log("FinalActivitiesList", FinalActivitiesList);
    }, [SelectedSubActivities, ActivitiesWithoutSub]);

    useEffect(() => {
        setLevel(Array(FinalActivitiesList.length).fill("Level"));
    }, [FinalActivitiesList]);

    const AddinglevelsAndActivities = (activity, level, index) => {
        setActivitiesToSendBE((prev) => {
            const updated = { ...prev };
            updated[activity] = level;
            return updated;
        });
    };

    useEffect(() => {
        console.log("ActivitiesToSendBE", ActivitiesToSendBE);
    }, [ActivitiesToSendBE]);

    const UpdateLevel = (activity, level, index) => {
        setLevel((prev) => {
            const newLevels = [...prev];
            newLevels[index] = level;
            return newLevels;
        });

        AddinglevelsAndActivities(activity, level, index);
    };

    return (
        <>
            <div className='extra-curricular-title-container'>
                <h2 className='extra-curricular-title'>
                    Select the Level you have done from the Activities you have selected
                </h2>
            </div>
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container ecb-container'>
                    {FinalActivitiesList.map((activity, index) => {
                        return (
                            <button 
                                key={index} 
                                className={`extra-curricular-btn ecb`}
                            >
                                <p>{activity}</p>
                                <label className="custom-dropdown-wrapper">
                                    <div className="custom-dropdown-button">
                                        {Level[index]}
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
