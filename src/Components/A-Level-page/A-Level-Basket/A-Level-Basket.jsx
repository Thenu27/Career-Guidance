import './A-Level-Basket.css';

const ALevelBasketSubjectsList = [

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


const ALevelBasketSubjects = () =>{

   
    return(
        <div className='O-levelLocal-Basketsubject-component'>

            <h2 className='O-levelLocal-Basketsubject-box-title'>Select A Level Basket Subjects you have Done</h2>
            <div className='O-levelLocal-Basketsubject-box'>

            <h2 className='O-levelLocal-Basketsubject-title'>A Level Basket Subjects</h2>

                <div className='O-levelLocal-Basketsubject-btn-container'>

                    {ALevelBasketSubjectsList.map((subject,index)=>{
                    return <button key={index} className='O-levellocal-Basket-btn'>{subject}</button>
                    })}


                </div>
                <div className='O-levelLocal-Basket-subjects-back-next-btn'>
                    <button  className='backbtn '>Back</button>
                    <button  className='nextbtn '>Next</button>
                </div>
            </div>
        </div>
    )
}

export default ALevelBasketSubjects;