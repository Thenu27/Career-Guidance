import './O-Level-Basket-Local.css';
import { useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';

const OLevelLocalBasketSubjects = [
    "Art and Design",
    "Business Studies",
    "Computer Science",
    "Environmental Management",
    "Food and Nutrition",
    "Accounting",
    "Economics",
    "Physical Education",
    "French",
    "Spanish",
    "Geography",
    "History",
    "Religious Studies",
    "Travel and Tourism",
    "Psychology"
]

const OLevelBasketLocal =()=>{

    
    const [selectedButtons,setselectedButtons] = useState([])
 
    const btnSelectHandler = (subject)=>{
        if(selectedButtons.includes(subject)){
            setselectedButtons(selectedButtons.filter(subj=>subj!==subject))
        }else{
           setselectedButtons([...selectedButtons,subject])
        }
    }

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
                    return <button onClick={()=>btnSelectHandler(subject)} key={index} className={`O-subject-level-btn ${selectedButtons.includes(subject)? "extra-curricular-btn-selected":""}`}>{subject}</button>
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