import './O-Level-Local-StreamBox.css';

const OLevelLocalStreamBox = () => {
    return (
        <div className='O-level-stream-box'>

            {/* Title Section */}
            <h2 className='O-level-stream-title'>Select Ordinary Level Category</h2>

            {/* Button Container */}
            <div className='O-level-btn-container'>

                {/* Buttons for O-Level Category Selection */}
                <button className='O-level-btn'>Local</button>
                <button className='O-level-btn'>London</button>
                <button className='O-level-btn'>Haven't Done</button>

                {/* Back Button */}
                <button className='backbtn'>Back</button>

            </div>

        </div>
    );
};

export default OLevelLocalStreamBox;
