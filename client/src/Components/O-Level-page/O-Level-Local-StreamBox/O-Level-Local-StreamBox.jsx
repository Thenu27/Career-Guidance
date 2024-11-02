import './O-Level-Local-StreamBox.css';

const OLevelLocalStreamBox= ()=>{
    return(
    <div className='O-level-stream-box'>

        <h2 className='O-level-stream-title'>Select Ordinary Level Category</h2>

        <div className='O-level-btn-container'>

            <button  className='O-level-btn'>Local</button>
            <button  className='O-level-btn'>London</button>
            <button  className='O-level-btn'>Havent Done</button>
            <button  className='backbtn'>Back</button>

        </div>

    </div>
    )

}

export default OLevelLocalStreamBox;