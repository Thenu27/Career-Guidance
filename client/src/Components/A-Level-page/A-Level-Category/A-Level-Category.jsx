import './A-Level-Category.css';
import { useContext } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';
import { useNavigate } from 'react-router-dom';

const ALevelCategory=()=>{
    const navigate = useNavigate();

    const goToOLevelPage = ()=>{
        navigate("/Ordinarylevelpage")
    }

    const goToCalculatingPage=()=>{
        navigate("/CalculatePage")
    }

    const {goToStreams,goToALevelLondonCategory} = useContext(ALevelContext);

    return(
        <div>
            <h2>Select Advanced Level Category</h2>

            <div className='Advance-level-btn-container'>

                <button onClick={goToStreams} className='A-level-btn'>Local</button>
                <button onClick={goToALevelLondonCategory} className='A-level-btn'>London</button>
                <button onClick={goToCalculatingPage} className='A-level-btn'>Havent Done</button>
                <button onClick={goToOLevelPage} className='backbtn'>Back</button>

            </div>
        </div>
    )
}

export default ALevelCategory;