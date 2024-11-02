import './O-Level-Local-MainSubjects.css';

const OLevelCommonSubjects =[

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
const OLevelMainLocalSubjects = ({setshowBasketSubjects,setshowOLevelSubjectsLocal})=>{

    const commonLocalSubjectsNextbtn = ()=>{
        setshowBasketSubjects(true);
        setshowOLevelSubjectsLocal(false);

    }
    return(
        <div className='O-level-subject-component'>
            <h2 className='O-level-subject-box-title'>Select Subjects you have Done</h2>
            <div className='O-level-subject-box'>

            <h2 className='O-level-subject-title'>Common Subjects</h2>

                <div className='O-level-subject-btn-container'>

                    {OLevelCommonSubjects.map((subject,index)=>{
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

export default OLevelMainLocalSubjects;