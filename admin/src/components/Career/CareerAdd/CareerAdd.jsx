import { useEffect, useState } from 'react';
import './CareerAdd.css';
import axios from 'axios';

const CareerAdd = () => {

    const [NewCareer,setNewCareer] = useState()
    const [NewCareerId,setNewCareerId] = useState();

    const [LinguisticScore,setLinguisticScore] = useState()
    const [LogicalScore,setLogicalScore] = useState()
    const [SpatialScore,setSpatialScore] = useState()

    const [SelectedNonIq01, setSelectedNonIq01] = useState('Select Inteligence');
    const [SelectedNonIq02, setSelectedNonIq02] = useState('Select Inteligence');
    const [SelectedNonIq03, setSelectedNonIq03] = useState('Select Inteligence');
    const [SelectedNonIq04, setSelectedNonIq04] = useState('Select Inteligence');


    const [Specialization01, setSpecialization01] = useState();
    const [Specialization02, setSpecialization02] = useState();
    const [Specialization03, setSpecialization03] = useState();
    const [Specialization04, setSpecialization04] = useState();


    const [CareerScore01, setCareerScore01] = useState('');
    const [CareerScore02, setCareerScore02] = useState('');
    const [CareerScore03, setCareerScore03] = useState('');

    const handleSelectedNonIq01 = (value) => {
        setSelectedNonIq01(value);
    };
    const handleSelectedNonIq02 = (value) => {
        setSelectedNonIq02(value);
    };

    const handleSelectedNonIq03 = (value) => {
        setSelectedNonIq03(value);
    };

    const handleSelectedNonIq04 = (value) => {
        setSelectedNonIq04(value);
    };

    const handleLinguisticValue = (event) => {
        setLinguisticScore(event.target.value)
    }

    const handleLogicalValue = (event) => {
        setLogicalScore(event.target.value)
    }

    const handleSpatialValue = (event) => {
        setSpatialScore(event.target.value)
    }

    const sendToDataToBE = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/add`, {
                SelectedNonIq01,
                SelectedNonIq02,
                SelectedNonIq03,
                SelectedNonIq04,
                SpatialScore,
                LogicalScore,
                LinguisticScore,
                CareerScore01,
                CareerScore02,
                CareerScore03,
                Specialization01,
                Specialization02,
                Specialization03,
                Specialization04,
                NewCareer,
                NewCareerId
            });
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            alert("Failed to send data. Please try again.");
        }
    };

    const handleCareerIdOnChange=(event)=>{
        setNewCareerId(event.target.value)
    }
    
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

    const handleSpecialization04OnChange=(event)=>{
        setSpecialization04(event.target.value)
    }

    const handleAdd = async() => {
        if (
            NewCareerId &&
            NewCareer && NewCareer.trim() !== '' &&
            SelectedNonIq01 !== 'Select Inteligence' &&
            SelectedNonIq02 !== 'Select Inteligence' &&
            SelectedNonIq03 !== 'Select Inteligence' &&
            SelectedNonIq04 !== 'Select Inteligence' &&
            SpatialScore &&
            LinguisticScore &&
            LogicalScore &&
            Specialization01 && Specialization01.trim() !== '' &&
            Specialization02 && Specialization02.trim() !== '' &&
            Specialization03 && Specialization03.trim() !== '' &&
            Specialization04 && Specialization04.trim() !== '' 


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
                        <label className='ol-input-label'>Enter Career Id</label>
                        <input type='number' value={NewCareerId} onChange={(event)=>{handleCareerIdOnChange(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Career Name</label>
                        <input type='text' value={NewCareer} onChange={(event)=>{handleCareerOnChange(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Linguistic Value</label>
                        <input type='number' value={LinguisticScore} onChange={(event)=>{handleLinguisticValue(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Logical Value</label>
                        <input type='number' value={LogicalScore} onChange={(event)=>{handleLogicalValue(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Spatial Value</label>
                        <input type='number' value={SpatialScore} onChange={(event)=>{handleSpatialValue(event)}} className='ol-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Selected Non Iq Intelligence 01</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedNonIq01}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedNonIq01('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedNonIq01('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedNonIq01('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedNonIq01('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedNonIq01('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedNonIq01('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedNonIq01('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedNonIq01('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedNonIq01('Existential')}>Existential</li>
                            </ul>
                        </label>

                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Select Non Iq intelligence 02</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedNonIq02}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedNonIq02('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedNonIq02('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedNonIq02('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedNonIq02('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedNonIq02('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedNonIq02('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedNonIq02('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedNonIq02('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedNonIq02('Existential')}>Existential</li>
                            </ul>
                        </label>

                    </div>

                    <div className='ol-input-container '>
                        <label className='ol-input-label'>Select Non Iq intelligence 03</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedNonIq03}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedNonIq03('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedNonIq03('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedNonIq03('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedNonIq03('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedNonIq03('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedNonIq03('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedNonIq03('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedNonIq03('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedNonIq03('Existential')}>Existential</li>
                            </ul>
                        </label>
                        {/* <div className='ol-intelligence-score-container'>
                            <input
                                className='ol-intelligence-score'
                                type='number'
                                value={CareerScore03}
                                onChange={(e) => setCareerScore03(e.target.value)}
                            />
                        </div> */}
                    </div>


                    <div className='ol-input-container '>
                        <label className='ol-input-label'>Select Non Iq intelligence 04</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedNonIq04}</div>
                            <input type="checkbox" className="dd-input" id="test" />
                            <ul className="dd-menu">
                                <li onClick={() => handleSelectedNonIq04('Logical-Mathematical')}>Logical-Mathematical</li>
                                <li onClick={() => handleSelectedNonIq04('Linguistic')}>Linguistic</li>
                                <li onClick={() => handleSelectedNonIq04('Spatial')}>Spatial</li>
                                <li onClick={() => handleSelectedNonIq04('Musical')}>Musical</li>
                                <li onClick={() => handleSelectedNonIq04('Bodily-Kinesthetic')}>Bodily-Kinesthetic</li>
                                <li onClick={() => handleSelectedNonIq04('Interpersonal')}>Interpersonal</li>
                                <li onClick={() => handleSelectedNonIq04('Intrapersonal')}>Intrapersonal</li>
                                <li onClick={() => handleSelectedNonIq04('Naturalistic')}>Naturalistic</li>
                                <li onClick={() => handleSelectedNonIq04('Existential')}>Existential</li>
                            </ul>
                        </label>
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

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Specialization 04</label>
                        <input type='text' value={Specialization04} onChange={(event)=>{handleSpecialization04OnChange(event)}} className='ol-input' />
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
