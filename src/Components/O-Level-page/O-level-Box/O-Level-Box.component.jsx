import './O-Level-Box.styles.css';
import { useNavigate } from 'react-router-dom';

const OrdinaryLevelBox = ({setshowOLevelSubjectsLocal,setshowOLevelBox}) =>{

    const navigate = useNavigate();

    const HaventDoneBtnHandler = ()=>{
        navigate("/Advancelevelpage")
    }

    const LocalBtnHandler = ()=>{
        setshowOLevelSubjectsLocal(true);
        setshowOLevelBox(false);
    }
    return(
        <div className='O-level-box'>

            <h2 className='O-level-box-title'>Select Ordinary Level Category</h2>

            <div className='O-level-btn-container'>

                <button onClick={LocalBtnHandler} className='O-level-btn'>Local</button>
                <button  className='O-level-btn'>London</button>
                <button onClick={HaventDoneBtnHandler} className='O-level-btn'>Havent Done</button>
                <button  className='backbtn'>Back</button>

            </div>
        </div>
    )
}

export default OrdinaryLevelBox;