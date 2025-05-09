import { OLevelContext } from '../../../context/OLevel.context';
import './O-Level-Lond-Stream-Box.css';
import { useContext, useEffect } from 'react';

const OLevelLondStream = () => {
    // Accessing context values
    const { setshowOLevelLondStream, setshowOLevelBox, goToOLevelBox } = useContext(OLevelContext);

    // useEffect to update visibility when the component mounts
    useEffect(() => {
        setshowOLevelLondStream(true); // Show London stream selection
        setshowOLevelBox(false); // Hide O-Level box selection
    }, []);

    return (
        <>
            {/* Title Section */}
            <div className='O-level-London-Category-title-container'>     
                <h2 className='O-level-box-title'>Select London Stream Category from the following</h2>
            </div> 

            {/* O-Level Selection Box */}
            <div className='O-level-box'>
                <div className='O-level-btn-container'>
                    <h2 className='O-level-sub-title'>London Stream Category</h2>

                    {/* Buttons for selecting different London O-Level streams */}
                    <button className='O-level-btn'>Cambridge</button>
                    <button className='O-level-btn'>Pearson</button>
                </div>

                {/* Back Button */}
                <div className='O-level-box-back-btn'>
                    <button onClick={goToOLevelBox} className='nextbtn'>Back</button>
                </div>
            </div>
        </>
    );
};

export default OLevelLondStream;
