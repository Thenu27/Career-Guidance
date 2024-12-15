import './O-Level-Local-MainSubjects.css';
import { OLevelContext } from '../../../context/OLevel.context';
import { useContext, useEffect, useState } from 'react';

const OLevelMainLocalSubjects = ({ OLevelLocalCoreSubj,OLevelBasketSubj}) => {

    const [showOLLocalBakset,setshowOLLocalBakset] = useState(false)

    const goToBasketLocal=()=>{
        setshowOLLocalBakset(true);
    }
    const {
        setshowOLevelBox,
        setshowOLevelLocalSubj,
        goToOLevelBox,
        setOLevelResultsArray,
        OLevelResultsArray,
    } = useContext(OLevelContext);

    const [selectedButtons, setselectedButtons] = useState([]);

    // Initialize `selectedButtons` with `OLevelResultsArray` on mount
    useEffect(() => {
        setselectedButtons(OLevelResultsArray);
    }, [OLevelResultsArray]);

    // Button selection handler
    const btnSelectHandler = (subject) => {
        if (selectedButtons.includes(subject)) {
            // Remove the subject from selectedButtons and context array
            const updatedSelected = selectedButtons.filter((subj) => subj !== subject);
            setselectedButtons(updatedSelected);
            setOLevelResultsArray(updatedSelected);
        } else {
            // Add the subject to selectedButtons and context array
            const updatedSelected = [...selectedButtons, subject];
            setselectedButtons(updatedSelected);
            setOLevelResultsArray(updatedSelected);
        }
    };

    useEffect(() => {
        setshowOLevelBox(false);
        setshowOLevelLocalSubj(true);
    }, []);

    return (
        <>
            <div className="O-level-box-title-container">
                <h2 className="O-level-box-title">
                    Select the Common Subjects you have Done from the following
                </h2>
            </div>

            <div className="O-level-subject-component">
                <div className="O-level-subject-box">
                    <h2 className="O-level-subject-title">Common Subjects</h2>

                    <div className="O-level-subject-btn-container">
                        {(showOLLocalBakset?OLevelBasketSubj:OLevelLocalCoreSubj).map((subject, index) => (
                            <button
                                key={index}
                                onClick={() => btnSelectHandler(subject.subjects)}
                                className={`O-subject-level-btn ${
                                    selectedButtons.includes(subject.subjects)
                                        ? 'OL-subject-btn-selected'
                                        : ''
                                }`}
                            >
                                {subject.subjects}
                            </button>
                        ))}
                    </div>
                    <div className="O-level-common-subjects-back-next-btn">
                        <button onClick={goToOLevelBox} className="nextbtn">
                            Back
                        </button>
                        <button onClick={goToBasketLocal} className="nextbtn">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OLevelMainLocalSubjects;
