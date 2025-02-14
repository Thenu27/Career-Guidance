import './A-Level-London-Category.css';

// Importing necessary dependencies
import { useContext } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';

const ALevelLondonCategory = () => {
    // Accessing function from ALevelContext to navigate back
    const { goToALevelCategory } = useContext(ALevelContext);

    return (
        <>
            {/* Title Section */}
            <div className='O-level-box-title-container'>
                <h2 className='O-level-box-title'>Select Advanced Level Stream from the following</h2>
            </div>

            {/* Category Selection Box */}
            <div className='O-level-box'>

                {/* Buttons for Cambridge and Pearson streams */}
                <div className='O-level-btn-container'>
                    <button className='O-level-btn'>Cambridge</button>
                    <button className='O-level-btn'>Pearson</button>
                </div>

                {/* Back button to return to A-Level Category Selection */}
                <div className='O-level-box-back-btn'>
                    <button onClick={goToALevelCategory} className='nextbtn'>Back</button>
                </div>
            </div>
        </>
    );
};

export default ALevelLondonCategory;
