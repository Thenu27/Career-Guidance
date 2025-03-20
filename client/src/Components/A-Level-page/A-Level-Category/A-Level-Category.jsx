import './A-Level-Category.css';

// Importing necessary dependencies
import { useContext, useEffect } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';
import { useNavigate } from 'react-router-dom';

const ALevelCategory = () => {
    // Accessing context values
    const { ALSubjectsFromDB } = useContext(ALevelContext);

    // Log the fetched A-Level subjects from the database whenever they change
    // useEffect(() => {
    //     console.log(ALSubjectsFromDB);
    // }, [ALSubjectsFromDB]);

    // Hook for navigation
    const navigate = useNavigate();

    // Function to navigate to the Ordinary Level page
    const goToOLevelPage = () => {
        navigate("/Ordinarylevelpage");
    };

    // Function to navigate to the Calculating Page
    const goToCalculatingPage = () => {
        navigate("/CalculatePage");
    };

    // Accessing functions from context for navigation
    const { goToStreams, goToALevelLondonCategory } = useContext(ALevelContext);

    return (
        <>  
            {/* Title Section */}
            <div className='O-level-box-title-container'>
                <h2 className='O-level-box-title'>Select Advanced Level Category from the following</h2>
            </div>

            {/* Button Container */}
            <div className='O-level-box'>
                <div className='O-level-btn-container'>
                    <button onClick={goToStreams} className='O-level-btn'>Local</button> {/* Local A-Level Category */}
                    <button onClick={goToALevelLondonCategory} className='O-level-btn'>London</button> {/* London A-Level Category */}
                    <button onClick={goToCalculatingPage} className='O-level-btn'>Haven't Done</button> {/* Option for users who haven't done A-Levels */}
                </div>

                {/* Back Button */}
                <div className='O-level-box-back-btn'>
                    <button onClick={goToOLevelPage} className='nextbtn'>Back</button> {/* Navigate back to O-Level Page */}
                </div>
            </div>
        </>
    );
};

export default ALevelCategory;
