import './A-Level-box.styles.css';
import { useNavigate } from 'react-router-dom';

const AdvanceLevelBox=({setshowALevelStreamBox,setALevelBox})=>{

    const navigate = useNavigate();

    const alevelBackbtnHandler=()=>{
        navigate("/CalculatePage")
    }

    const goToStreams = ()=>{
        setALevelBox(false);
        setshowALevelStreamBox(true);
    }
    return(
        <div className='Advance-level-box'>

            <h2>Select Advanced Level Category</h2>

            <div className='Advance-level-btn-container'>

                <button onClick={goToStreams}className='A-level-btn'>Local</button>
                <button className='A-level-btn'>London</button>
                <button  onClick={alevelBackbtnHandler} className='A-level-btn'>Havent Done</button>
                <button className='backbtn'>Back</button>

            </div>
            
        </div>
    )
}

export default AdvanceLevelBox;