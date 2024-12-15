import './A-Level-StreamBox.css';
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext,useEffect } from 'react';
import axios from 'axios';

const ALevelStreamBox = () => {



    const FetchAlSubjectFromBE=async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/Advancelevelpage');
            setALSubjectsFromDB(response.data);
            console.log(response.data)

        }catch(error){
            console.log(error);
        }
    }



    useEffect(() => {

       const fetchData=async()=>{
          await  FetchAlSubjectFromBE();

        }
        fetchData()
    }, []);

    const {
        goToALevelCategory,
        goToALevelLocalMaths,
        ALSubjectsFromDB,
        setALSubjectsFromDB
    } = useContext(ALevelContext);

    const renderALsubjects = (stream) => {
        const filteredSubjects = ALSubjectsFromDB.filter(subject => subject.stream === stream);
        console.log("Filtered Subjects for Stream:", stream, filteredSubjects); 
        return filteredSubjects; 
    };

    return (
        <>
            <div className="O-level-box-title-container">
                <h2 className="O-level-box-title">Select Advanced Level Stream from the following</h2>
            </div>
            <div className="O-level-box">
                <div className="O-level-btn-container">
                    <button onClick={() => { const subjects = renderALsubjects("Physical Science");
                            setALSubjectsFromDB(subjects); // Update context state with filtered subjects
                            goToALevelLocalMaths(); // Navigate to the corresponding page
                        }}
                        className="O-level-btn"
                    >
                        Physical Science
                    </button>
                    <button
                        onClick={() => {
                            const subjects = renderALsubjects("BIO Science");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths(); // Navigate to the corresponding page
                        }}
                        className="O-level-btn"
                    >
                        BIO Science
                    </button>
                    <button
                        onClick={() => {
                            const subjects = renderALsubjects("Commerce");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths(); // Navigate to the corresponding page
                        }}
                        className="O-level-btn"
                    >
                        Commerce
                    </button>
                    <button
                        onClick={() => {
                            const subjects = renderALsubjects("Arts");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths(); // Navigate to the corresponding page

                        }}
                        className="O-level-btn"
                    >
                        Arts
                    </button>
                    <button
                        onClick={() => {
                            const subjects = renderALsubjects("Technology");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths(); // Navigate to the corresponding page

                        }}
                        className="O-level-btn"
                    >
                        Technology
                    </button>
                </div>
                <div className="O-level-box-back-btn">
                    <button onClick={goToALevelCategory} className="nextbtn">Back</button>
                </div>
            </div>
        </>
    );
};

export default ALevelStreamBox;
