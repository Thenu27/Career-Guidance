import './A-Level-box.styles.css';

const AdvanceLevelBox=()=>{
    return(
        <div className='Advance-level-box'>
            <div className='Advance-level-btn-container'>
                <button className='A-level-btn'>Local</button>
                <button className='A-level-btn'>London</button>
                <button className='A-level-btn'>Havent Done</button>
                <button  className='backbtn'>Back</button>
            </div>
        </div>
    )
}

export default AdvanceLevelBox;