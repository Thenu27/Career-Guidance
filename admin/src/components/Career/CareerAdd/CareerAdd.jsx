import { useEffect, useState,useContext } from 'react';
import './CareerAdd.css';
import axios from 'axios';
import { CareerContext } from '../../../Context/Career.context';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CareerAdd = () => {

    const navigate = useNavigate();

    const [AllSpecializations, setAllSpecializations] = useState([]);

    const [HasCareer,setHasCareer] = useState()
    const {setSelectedField,SelectedField} = useContext(CareerContext)
    const [NewCareer,setNewCareer] = useState()
    const [NewCareerId,setNewCareerId] = useState();

    const [LinguisticScore,setLinguisticScore] = useState()
    const [LogicalScore,setLogicalScore] = useState()
    const [SpatialScore,setSpatialScore] = useState()

    const [SelectedNonIq01, setSelectedNonIq01] = useState('Select Inteligence');
    const [SelectedNonIq02, setSelectedNonIq02] = useState('Select Inteligence');
    const [SelectedNonIq03, setSelectedNonIq03] = useState('Select Inteligence');
    const [SelectedNonIq04, setSelectedNonIq04] = useState('Select Inteligence');


    const [CourseSpecialization01, setCourseSpecialization01] = useState();
    const [CourseSpecialization02, setCourseSpecialization02] = useState();
    const [CourseSpecialization03, setCourseSpecialization03] = useState();
    const [CourseSpecialization04, setCourseSpecialization04] = useState();

    const [task,setTask] = useState([]);

    useEffect(()=>{
        const storedValue = localStorage.getItem("HasCareer")
        if(storedValue){
            setHasCareer(storedValue)
        }
    },[])

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
            if(!window.confirm('Do you want to add this Career?')){
                return
            }
        const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/admin/career/careerfield/career/add`, {
            SelectedNonIq01,
            SelectedNonIq02,
            SelectedNonIq03,
            SelectedNonIq04,
            SpatialScore:Number(SpatialScore),
            LogicalScore:Number(LogicalScore),
            LinguisticScore:Number(LinguisticScore),
            CourseSpecialization01: Number(CourseSpecialization01),
            CourseSpecialization02: Number(CourseSpecialization02),
            CourseSpecialization03: Number(CourseSpecialization03),
            CourseSpecialization04: Number(CourseSpecialization04),
            NewCareer,
            NewCareerId:Number(NewCareerId),
            SelectedField:Number(SelectedField),
            task
        });
            alert("Data sent to the server")
            if(response.status===200){
                alert('Career Added Succesfully');
                navigate('/admin/careerfield/career')
            }
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            if(error.response.data==='Career ID already exists'){
                alert("Career ID already exists \n Enter again with a different Id")
            }
        }
    };

    const handleCareerIdOnChange=(event)=>{
        setNewCareerId(event.target.value)
    }
    
    const handleCareerOnChange=(event)=>{
        setNewCareer(event.target.value)
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
            LogicalScore 
            

        ) {
            await sendToDataToBE();
        } else {
            alert('Please fill in all the fields.');
        }
    };

    useEffect(()=>{
      const storedValue=localStorage.getItem("SelectedField");
      if(storedValue){
        setSelectedField(storedValue)
      }
    })
    

    useEffect(()=>{
        console.log("New Subject",NewCareer)
    },[NewCareer])

    
  const handleAddTask = () => {
    setTask([...task,''])
  };

  const handleTaskChange = (index,value)=>{
    const updatedTask = [...task];
    updatedTask[index] = value;
    setTask(updatedTask);
  }

  useEffect(()=>{
    console.log('task:',task)
  },[task]);

    const fetchAllSpecilization=async()=>{
        try{
            const response = await axiosInstance.get('/api/v1/admin/higher-education/specialization');
            setAllSpecializations(response.data.specializations);
        }catch(err){
            console.error("Error fetching specializations:", err);
        }
    }

    useEffect(()=>{
        fetchAllSpecilization()
    },[])

    useEffect(()=>{
        console.log('AllSpecializations',AllSpecializations)
    },[AllSpecializations])


const handleSpecilaization01Change = (selectedValue) => {
    setCourseSpecialization01(selectedValue);
}

const handleSpecilaization02Change = (selectedValue) => {
    setCourseSpecialization02(selectedValue);
}

const handleSpecilaization03Change = (selectedValue) => {
    setCourseSpecialization03(selectedValue);
}

const handleSpecilaization04Change = (selectedValue) => {
    setCourseSpecialization04(selectedValue);
}

useEffect(()=>{
    console.log('CourseSpecialization01:', CourseSpecialization01);
    console.log('CourseSpecialization02:', CourseSpecialization02);
    console.log('CourseSpecialization03:', CourseSpecialization03);
    console.log('CourseSpecialization04:', CourseSpecialization04);
    
},[CourseSpecialization01, CourseSpecialization02, CourseSpecialization03, CourseSpecialization04]);

    return (
        <>

            <div className='login-container ol-add-container career-add-input-container'>
            <div className='ol-add-header'>
                <h1 className='ol-add-title career-add-title'>Enter the necessary details</h1>
            </div>
                <div className='ol-add-inner-container career-add-inner-input-container'>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Career Id</label>
                        <input type='number' value={NewCareerId} onChange={(event)=>{handleCareerIdOnChange(event)}} className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Enter Career Name</label>
                        <input type='text' value={NewCareer} onChange={(event)=>{handleCareerOnChange(event)}} className='ol-input career-input ' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Linguistic Value</label>
                        <input type='number' value={LinguisticScore} onChange={(event)=>{handleLinguisticValue(event)}} className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Logical Value</label>
                        <input type='number' value={LogicalScore} onChange={(event)=>{handleLogicalValue(event)}} className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Spatial Value</label>
                        <input type='number' value={SpatialScore} onChange={(event)=>{handleSpatialValue(event)}} className='ol-input career-input' />
                    </div>

                    <div className='ol-input-container'>
                        <label className='ol-input-label'>Selected Non Iq Intelligence 01</label>
                        <label className="dropdown">
                            <div className="dd-button">{SelectedNonIq01}</div>
                            <input type="checkbox" className="dd-input career-input" id="test" />
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
                            <input type="checkbox" className="dd-input career-input" id="test" />
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
                            <input type="checkbox" className="dd-input career-input" id="test" />
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
                            <input type="checkbox" className="dd-input career-input" id="test" />
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


                <div className='specialization-select-container'>
                    <label className='ol-input-label'>Select Specialization 1</label>
                    <select onChange={(e) => handleSpecilaization01Change(e.target.value)} className='ol-input specialization-select-option'>
                        <option className='specialization-name' value="">Specialization 01</option>
                        {AllSpecializations.map((spec) => (
                        <option  className='ol-input specialization-name' key={spec.id} value={spec.id}>
                            {spec.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className='specialization-select-container'>
                    <label className='ol-input-label'>Select Specialization 2</label>
                    <select onChange={(e) => handleSpecilaization02Change(e.target.value)} className='ol-input specialization-select-option'>
                        <option className='specialization-name' value="">Specialization 02</option>
                        {AllSpecializations.map((spec) => (
                        <option  className='ol-input specialization-name' key={spec.id} value={spec.id}>
                            {spec.name}
                        </option>
                        ))}
                    </select>
                </div>


                <div className='specialization-select-container'>
                    <label className='ol-input-label'>Select Specialization 3</label>
                    <select onChange={(e) => handleSpecilaization03Change(e.target.value)} className='ol-input specialization-select-option'>
                        <option className='specialization-name' value="">Specialization 03</option>
                        {AllSpecializations.map((spec) => (
                        <option  className='ol-input specialization-name' key={spec.id} value={spec.id}>
                            {spec.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className='specialization-select-container'>
                    <label className='ol-input-label'>Select Specialization 4</label>
                    <select onChange={(e) => handleSpecilaization04Change(e.target.value)} className='ol-input specialization-select-option'>
                        <option className='specialization-name' value="">Specialization 04</option>
                        {AllSpecializations.map((spec) => (
                        <option  className='ol-input specialization-name' key={spec.id} value={spec.id}>
                            {spec.name}
                        </option>
                        ))}
                    </select>
                </div>

                </div>

                <button onClick={handleAddTask} className='add-ol-btn add-task'>Add Task</button>

                <div className='add-task-container'>
                    {task.map((task, index) => (
                        <input
                            className='career-input task '
                            key={index}
                            type="text"
                            value={task}
                            onChange={(e) => handleTaskChange(index, e.target.value)}
                            placeholder={`Task ${index + 1}`}
                        />
                    ))}
                </div>            


                <div className='add-ol-btn-container add-career-btn-container'>
                    <button
                        className='add-ol-btn add-career-btn'
                        onClick={handleAdd}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default CareerAdd;
