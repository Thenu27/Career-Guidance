import './A-Level-StreamBox.css'


const ALevelStreamBox=({setshowALevelLocalCommonSubject,setshowALevelStreamBox})=>{

    const goToCommonSubjects = ()=>{
        setshowALevelLocalCommonSubject(true);
        setshowALevelStreamBox(false);
    }
    return(
            <div className='A-Level-Stream-Box'>
                <h2>A Level Stream</h2>
                <div className='A-Level-Stream-btn-container'>
                    <button onClick={goToCommonSubjects} className='A-Level-Stream-btn'>Maths</button>
                    <button className='A-Level-Stream-btn'>Science</button>
                    <button className='A-Level-Stream-btn'>Commerce</button>
                </div>    
                <button className='backbtn'>Back</button>
            </div>
        
    )
}

export default ALevelStreamBox;