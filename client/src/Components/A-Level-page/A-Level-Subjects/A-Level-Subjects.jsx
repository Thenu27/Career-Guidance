import './A-Level-Subjects.css'

const ALevelLocalCommonSubjects =[
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",
    "Subject",

]
const ALevelMainLocalSubjects = ({ setshowALevelBasketSubject,setshowALevelLocalCommonSubject})=>{

    const commonLocalSubjectsNextbtn = ()=>{
        setshowALevelBasketSubject(true);
        setshowALevelLocalCommonSubject(false);

    }
    return(
        <div className='O-level-subject-component'>
            <h2 className='O-level-subject-box-title'>Select A Level Subjects you have Done</h2>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Common Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {ALevelLocalCommonSubjects.map((subject,index)=>{
                       return <button key={index} className='O-subject-level-btn'>{subject}</button>
                    })}


                </div>
                <div className='O-level-common-subjects-back-next-btn'>
                    <button  className='backbtn '>Back</button>
                    <button onClick={commonLocalSubjectsNextbtn} className='nextbtn '>Next</button>
                </div>
            </div>
        </div>
    )
}

export default ALevelMainLocalSubjects;

