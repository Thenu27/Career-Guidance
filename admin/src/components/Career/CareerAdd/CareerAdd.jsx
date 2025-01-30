import { useEffect, useState } from 'react';
import './CareerAdd.css';
import axios from 'axios';

const CareerAdd = () => {

    const [NewCareer,setNewCareer] = useState()

    const [SelectedCareerIntlligence01, setSelectedCareerIntlligence01] = useState('Select Inteligence');
    const [SelectedCareerIntlligence02, setSelectedCareerIntlligence02] = useState('Select Inteligence');
    const [SelectedCareerIntlligence03, setSelectedCareerIntlligence03] = useState('Select Inteligence');

    const [Specialization01, setSpecialization01] = useState();
    const [Specialization02, setSpecialization02] = useState();
    const [Specialization03, setSpecialization03] = useState();

    const [CareerScore01, setCareerScore01] = useState('');
    const [CareerScore02, setCareerScore02] = useState('');
    const [CareerScore03, setCareerScore03] = useState('');

    const handleSelectedintelligence01 = (value) => {
        setSelectedCareerIntlligence01(value);
    };

    const handleSelectedintelligence02 = (value) => {
        setSelectedCareerIntlligence02(value);
    };

    const handleSelectedintelligence03 = (value) => {
        setSelectedCareerIntlligence03(value);
    };

    const sendToDataToBE = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/add`, {
                SelectedCareerIntlligence01,
                SelectedCareerIntlligence02,
                SelectedCareerIntlligence03,
                CareerScore01,
                CareerScore02,
                CareerScore03,
                Specialization01,
                Specialization02,
                Specialization03,
                NewCareer
            });
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            alert("Failed to send data. Please try again.");
        }
    };
    
    const handleCareerOnChange=(event)=>{
        setNewCareer(event.target.value)
    }

    const handleSpecialization01OnChange=(event)=>{
        setSpecialization01(event.target.value)
    }

    const handleSpecialization02OnChange=(event)=>{
        setSpecialization02(event.target.value)
    }

    const handleSpecialization03OnChange=(event)=>{
        setSpecialization03(event.target.value)
    }

    const handleAdd = async() => {
        if (
            NewCareer && NewCareer.trim() !== '' &&
            SelectedCareerIntlligence01 !== 'Select Inteligence' &&
            SelectedCareerIntlligence02 !== 'Select Inteligence' &&
            SelectedCareerIntlligence03 !== 'Select Inteligence' &&
            CareerScore01 &&
            CareerScore02 &&
            CareerScore03 &&
            Specialization01 && Specialization01.trim() !== '' &&
            Specialization02 && Specialization02.trim() !== '' &&
            Specialization03 && Specialization03.trim() !== '' 

        ) {
            await sendToDataToBE();
            alert('All fields are filled! Submission successful.');
        } else {
            alert('Please fill in all the fields.');
        }
    };


    

    useEffect(()=>{
        console.log("New Subject",NewCareer)
    },[NewCareer])

    return (
        <>
            <div className='ol-add-header'>
                <h1 className='ol-add-title'>Enter the necessary details</h1>
            </div>
            <div className='ol-add-container career-add-input-container'>
                <div className='ol-add-inner-container career-add-inner-input-container'>
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Career</label>
                        <input type='text' value={NewCareer} onChange={(event)=>{handleCareerOnChange(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Selected Intelligence 01</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedCareerIntlligence01}</div>
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
                                value={CareerScore01}
                                onChange={(e) => setCareerScore01(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Select intelligence 02</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedCareerIntlligence02}</div>
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
                                value={CareerScore02}
                                onChange={(e) => setCareerScore02(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='ol-input-container '>
                        <label className='ol-input-label'>Select intelligence 03</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedCareerIntlligence03}</div>
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
                                value={CareerScore03}
                                onChange={(e) => setCareerScore03(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Specialization 01</label>
                        <input type='text' value={Specialization01} onChange={(event)=>{handleSpecialization01OnChange(event)}} className='ol-input' />
                    </div>
                    <div className='ol-input-container'>
                        <label className='ol-input-label career-input-label'>Enter Specialization 02</label>
                        <input type='text' value={Specialization02} onChange={(event)=>{handleSpecialization02OnChange(event)}} className='ol-input' />
                    </div>
                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Specialization 03</label>
                        <input type='text' value={Specialization03} onChange={(event)=>{handleSpecialization03OnChange(event)}} className='ol-input' />
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

export default CareerAdd;
