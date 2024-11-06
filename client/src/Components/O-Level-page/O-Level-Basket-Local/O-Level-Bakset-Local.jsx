import './O-Level-Basket-Local.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';

const OLevelLocalBasketSubjects = [

    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
    "Basket Subject",
]

const OLevelBasketLocal =()=>{

    const {goToLocalCommonSubjects} = useContext(OLevelContext);
    const navigate = useNavigate();

    const goToALevelPage = ()=>{
        navigate("/Advancelevelpage")
    }

    return(
        <>
            <h2 className='O-levelLocal-Basketsubject-box-title'>Select BasketSubjects you have Done</h2>
            <div className='O-levelLocal-Basketsubject-box'>

            <h2 className='O-levelLocal-Basketsubject-title'>Basket Subjects</h2>

                <div className='O-levelLocal-Basketsubject-btn-container'>

                    {OLevelLocalBasketSubjects.map((subject,index)=>{
                    return <button key={index} className='O-levellocal-Basket-btn'>{subject}</button>
                    })}

                </div>
                <div className='O-levelLocal-Basket-subjects-back-next-btn'>
                    <button onClick={goToLocalCommonSubjects}  className='backbtn '>Back</button>
                    <button onClick={goToALevelPage} className='nextbtn '>Next</button>
                </div>
            </div>
        </>
    )
}

export default OLevelBasketLocal;