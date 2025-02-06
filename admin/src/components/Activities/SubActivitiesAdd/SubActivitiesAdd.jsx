import { useEffect, useState } from 'react';
import './SubActivities.css';
import axios from 'axios';

const SubActivitiesAdd = () => {

    const [NewSubActivity,setNewSubActivity] = useState()

    const [SelectedIntlligence01, setSelectedIntelligence01] = useState('Select Inteligence');
    const [SelectedIntlligence02, setSelectedIntelligence02] = useState('Select Inteligence');
    const [SelectedIntlligence03, setSelectedIntelligence03] = useState('Select Inteligence');

    const [score01, setScore01] = useState('');
    const [score02, setScore02] = useState('');
    const [score03, setScore03] = useState('');

    const handleSelectedintelligence01 = (value) => {
        setSelectedIntelligence01(value);
    };

    const handleSelectedintelligence02 = (value) => {
        setSelectedIntelligence02(value);
    };

    const handleSelectedintelligence03 = (value) => {
        setSelectedIntelligence03(value);
    };

    const sendToDataToBE = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/subactivity/add`, {
                SelectedIntlligence01,
                SelectedIntlligence02,
                SelectedIntlligence03,
                score01,
                score02,
                score03,
                NewSubActivity
            });
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            alert("Failed to send data. Please try again.");
        }
    };
    
    const handleOnChange=(event)=>{
        setNewSubActivity(event.target.value)
    }

    const handleAdd = async() => {
        if (
            SelectedIntlligence01 !== 'Select Inteligence' &&
            SelectedIntlligence02 !== 'Select Inteligence' &&
            SelectedIntlligence03 !== 'Select Inteligence' &&
            score01 &&
            score02 &&
            score03
        ) {
            await sendToDataToBE();
            alert('All fields are filled! Submission successful.');
        } else {
            alert('Please fill in all the fields.');
        }
    };

    useEffect(()=>{
        console.log("NewSubActivity",NewSubActivity)
    },[NewSubActivity])

    return (
        <>
            <div className='ol-add-header'>
                <h1 className='ol-add-title'>Enter the necessary details</h1>
            </div>
            <div className='ol-add-container'>
                <div className='ol-add-inner-container'>
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Sub Activity</label>
                        <input type='text' value={NewSubActivity} onChange={(event)=>{handleOnChange(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Selected Intelligence 01</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedIntlligence01}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedintelligence01('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedintelligence01('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedintelligence01('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedintelligence01('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedintelligence01('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedintelligence01('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedintelligence01('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedintelligence01('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedintelligence01('Existential')}>Existential</li>
                            </ul>
                        </label>
                        <div className='ol-intelligence-score-container'>
                            <input
                                className='ol-intelligence-score'
                                type='number'
                                value={score01}
                                onChange={(e) => setScore01(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Select intelligence 02</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedIntlligence02}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedintelligence02('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedintelligence02('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedintelligence02('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedintelligence02('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedintelligence02('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedintelligence02('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedintelligence02('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedintelligence02('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedintelligence02('Existential')}>Existential</li>
                            </ul>
                        </label>
                        <div className='ol-intelligence-score-container'>
                            <input
                                className='ol-intelligence-score'
                                type='number'
                                value={score02}
                                onChange={(e) => setScore02(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Select intelligence 03</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedIntlligence03}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedintelligence03('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedintelligence03('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedintelligence03('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedintelligence03('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedintelligence03('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedintelligence03('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedintelligence03('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedintelligence03('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedintelligence03('Existential')}>Existential</li>
                            </ul>
                        </label>
                        <div className='ol-intelligence-score-container'>
                            <input
                                className='ol-intelligence-score'
                                type='number'
                                value={score03}
                                onChange={(e) => setScore03(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='add-ol-btn-container'>
                    <button
                        className='add-ol-btn'
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
            </div>

            
        </>
    );
};

export default SubActivitiesAdd;
