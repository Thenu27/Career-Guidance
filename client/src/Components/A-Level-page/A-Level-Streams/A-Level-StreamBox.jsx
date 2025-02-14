import './A-Level-StreamBox.css';

// Importing dependencies
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext, useEffect } from 'react';
import axios from 'axios';

const ALevelStreamBox = () => {
    // Function to fetch A-Level subjects from the backend
    const FetchAlSubjectFromBE = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/Advancelevelpage`); // API call to fetch subjects
            setALSubjectsFromDB(response.data); // Store retrieved data in context state
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect to fetch A-Level subjects when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            await FetchAlSubjectFromBE();
        };
        fetchData();
    }, []);

    // Accessing context values and functions
    const {
        goToALevelCategory,
        goToALevelLocalMaths,
        ALSubjectsFromDB,
        setALSubjectsFromDB
    } = useContext(ALevelContext);

    // Function to filter subjects based on the selected stream
    const renderALsubjects = (stream) => {
        const filteredSubjects = ALSubjectsFromDB.filter(subject => subject.stream === stream);
        console.log("Filtered Subjects for Stream:", stream, filteredSubjects);
        return filteredSubjects;
    };

    return (
        <>
            {/* Title Section */}
            <div className="O-level-box-title-container">
                <h2 className="O-level-box-title">Select Advanced Level Stream from the following</h2>
            </div>

            {/* Stream Selection Container */}
            <div className="O-level-box">
                <div className="O-level-btn-container">
                    {/* Buttons for selecting different A-Level streams */}
                    <button onClick={() => { 
                            const subjects = renderALsubjects("Physical Science");
                            setALSubjectsFromDB(subjects); // Update context state with filtered subjects
                            goToALevelLocalMaths(); // Navigate to the corresponding page
                        }}
                        className="O-level-btn"
                    >
                        Physical Science
                    </button>
                    <button onClick={() => {
                            const subjects = renderALsubjects("BIO Science");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths();
                        }}
                        className="O-level-btn"
                    >
                        BIO Science
                    </button>
                    <button onClick={() => {
                            const subjects = renderALsubjects("Commerce");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths();
                        }}
                        className="O-level-btn"
                    >
                        Commerce
                    </button>
                    <button onClick={() => {
                            const subjects = renderALsubjects("Arts");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths();
                        }}
                        className="O-level-btn"
                    >
                        Arts
                    </button>
                    <button onClick={() => {
                            const subjects = renderALsubjects("Technology");
                            setALSubjectsFromDB(subjects);
                            goToALevelLocalMaths();
                        }}
                        className="O-level-btn"
                    >
                        Technology
                    </button>
                </div>

                {/* Back Button */}
                <div className="O-level-box-back-btn">
                    <button onClick={goToALevelCategory} className="nextbtn">Back</button>
                </div>
            </div>
        </>
    );
};

export default ALevelStreamBox;
