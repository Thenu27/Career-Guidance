import './CareerUpdate.css';
import { useContext, useEffect,useState } from 'react';
import { CareerContext } from '../../../Context/Career.context';
import axios from 'axios';
import DeleteIcon from '../../../assets/icon.svg';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';



const CareerUpdate = () => {
    const {SelectedCareerId,setSelectedCareerId,setSelectedCareer,SelectedCareer,SelectedCareerDetails,setSelectedCareerDetails,setSelectedField,SelectedField} = useContext(CareerContext);
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate()


    useEffect(() => {
        const storedCareer = localStorage.getItem("SelectedCareer");
        const storedCareerId = localStorage.getItem("SelectedCareerId");
    
        if (storedCareer && storedCareerId) {
            setSelectedCareer(storedCareer);
            setSelectedCareerId(storedCareerId);
        }
    }, []);
    
const fetchAllSpecilization = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/admin/higher-education/specialization');

        const sorted = response.data.specializations.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        setAllSpecializations(sorted);
    } catch (err) {
        console.error("Error fetching specializations:", err);
    }
};


    useEffect(()=>{
        fetchAllSpecilization()
    },[])
    

    useEffect(()=>{
        console.log("SelectedCareerId",SelectedCareerId)
    },[SelectedCareerId])

    const [Edit,setEdit] = useState(false);  

    const [AllSpecializations, setAllSpecializations] = useState([]);

    const [CareerId,setCareerId] = useState();
    const [OldCareerId, setOldCareerId] = useState(); 
    const [CareerDbId,setCareerDbId] = useState();
    
    const [Non_Iq_Intelligence1,setNon_Iq_Intelligence1] = useState('No Data Selected')
    const [Non_Iq_Intelligence2,setNon_Iq_Intelligence2] = useState('No Data Selected');
    const [Non_Iq_Intelligence3,setNon_Iq_Intelligence3] = useState('No Data Selected');
    const [Non_Iq_Intelligence4,setNon_Iq_Intelligence4] = useState('No Data Selected');


    const [CareerName,setCareerName] = useState();
    const [CareerLinguistic,setCareerLinguistic] = useState();
    const [CareerLogical,setCareerLogical] = useState();
    const [CareerSpatial,setCareerSpatial] = useState();

    
    const [CourseSpecialization01, setCourseSpecialization01] = useState('');
    const [CourseSpecialization02, setCourseSpecialization02] = useState('');
    const [CourseSpecialization03, setCourseSpecialization03] = useState('');
    const [CourseSpecialization04, setCourseSpecialization04] = useState('');

    const [CourseSpecialization01Id, setCourseSpecialization01Id] = useState(null);
    const [CourseSpecialization02Id, setCourseSpecialization02Id] = useState(null);
    const [CourseSpecialization03Id, setCourseSpecialization03Id] = useState(null);
    const [CourseSpecialization04Id, setCourseSpecialization04Id] = useState(null);

    const [task,setTask] = useState([]);

useEffect(() => {
    if (SelectedCareerDetails?.result) {
        setLoading(true);
        const result = SelectedCareerDetails.result;
        const specs = SelectedCareerDetails.specializations;

        setNon_Iq_Intelligence1(IdentifyIntelligence(result.non_iq_intelligence1));
        setNon_Iq_Intelligence2(IdentifyIntelligence(result.non_iq_intelligence2));
        setNon_Iq_Intelligence3(IdentifyIntelligence(result.non_iq_intelligence3));
        setNon_Iq_Intelligence4(IdentifyIntelligence(result.non_iq_intelligence4));

        setCareerDbId(result.career_db_id);
        setOldCareerId(result.career_id);
        setCareerId(result.career_id)

        setCourseSpecialization01(specs[0]?.name);
        setCourseSpecialization02(specs[1]?.name);
        setCourseSpecialization03(specs[2]?.name);
        setCourseSpecialization04(specs[3]?.name);

        setCourseSpecialization01Id(specs[0]?.id)
        setCourseSpecialization02Id(specs[1]?.id)
        setCourseSpecialization03Id(specs[2]?.id)
        setCourseSpecialization04Id(specs[3]?.id)


        setCareerName(result.career);
        setCareerId(result.career_id);

        setCareerLinguistic(result.linguistic);
        setCareerLogical(result.logical);
        setCareerSpatial(result.spatial);

        setLoading(false);
    }
}, [SelectedCareerDetails]);

    useEffect(()=>{
        console.log('CareerName:',CareerName)
    },[CareerName])

    const fetchTask = async()=>{
        setLoading(true);
        try{
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/task`,{
                SelectedCareerId
            })
            console.log(response.data);
            setTask(response.data.result)
        }catch(err){
            console.log(err);
            alert("Failed to send data. Please try again.");
        }finally{
            setLoading(false);

        }
    }

    useEffect(()=>{
        setLoading(false);

    },[task])

    

    const fetchSelectedCareerDetails = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/v1/admin/career/careerfield/career/details`, {
                SelectedCareerId
            });
            console.log("Response from server:", response.data);
            setSelectedCareerDetails(response.data);
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            // alert("Failed to send data. Please try again.");
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (SelectedCareer && SelectedCareerId) {
            fetchSelectedCareerDetails();
            fetchTask(); // ✅ keep this only
        }
    }, [SelectedCareer, SelectedCareerId]);
    

    useEffect(() => {
        console.log("Selected Career Details", SelectedCareerDetails);
    }, [SelectedCareerDetails]);

    const IdentifyIntelligence = (value) => {
        switch (value) {
            case 1:
                return 'Logical-Mathematical';
            case 2:
                return 'Linguistic';
            case 3:
                return 'Spatial';
            case 4:
                return 'Musical';
            case 5:
                return 'Bodily-Kinesthetic';
            case 6:
                return 'Interpersonal';
            case 7:
                return 'Intrapersonal';
            case 8:
                return 'Naturalistic';
            case 9:
                return 'Existential';
            default:
                return 'Unknown';
        }
    };

    const sendCareerToDelete = async (career,career_id) => {
        try {
            const response = await axiosInstance.post(`/api/v1/admin/career/careerfield/career/delete`, {
                CareerId
            });

            if (response.status === 200) {
                alert('Career deleted successfully');
                navigate('/admin/careerfield/career')
            } else {
                alert('Failed to delete career. Please try again.');
            }

            console.log(response.data);
        } catch (error) {
            console.error('Error when deleting career', error);
            alert('An error occurred while deleting the career. Please try again later.');
        }
    }

    const handleDelete = async (career_id) => {
        if(window.confirm('Do you want to delete this career?\n\nThis action cannot be undone.')){
            await sendCareerToDelete(career_id);
        }else{
            return
        }
        
    }

    const handleEditClick = ()=>{
        setEdit(true);
    }

    const dropdownData=(index)=>{
        return(
            <ul className="dd-menu">
                <li onClick={()=>handleIntelligenceChange('Logical-Mathematical',index)}>Logical-Mathematical Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Linguistic',index)}>Linguistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Spatial',index)}>Spatial Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Musical',index)}>Musical Intelligence</li>                                     
                <li onClick={()=>handleIntelligenceChange('Bodily-Kinesthetic',index)}>Bodily-Kinesthetic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Interpersonal',index)}>Interpersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Intrapersonal',index)}>Intrapersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Naturalistic',index)}>Naturalistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Existential',index)}>Existential Intelligence</li>

            </ul>
        ) 
    }
    const handleIntelligenceChange=(value,index)=>{
        if(index===1){
            setNon_Iq_Intelligence1(value)
           return
        }
        if(index===2){
            setNon_Iq_Intelligence2(value)
           return
        }
        if(index===3){
            setNon_Iq_Intelligence3(value)
           return
        }
        if(index===4){
            setNon_Iq_Intelligence4(value)
           return
        }
   }

   
   const handleOnChange=(value,scoreIndex)=>{

    if(scoreIndex===0){
        setCareerName(value)
        return
    }

    if(scoreIndex===1){
        setCareerId(value)
    }


    if(scoreIndex===8){
        setCareerLinguistic(value)
        return
    }

    if(scoreIndex===9){
        setCareerLogical(value)
        return
    }

    if(scoreIndex===10){
        setCareerSpatial(value)
        return
    }

}


const handleTaskChange = (value,index)=>{
    const updatedTask = [...task];
    updatedTask[index].task=value;
    setTask(updatedTask);
}

const sendToBackEnd=async()=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/v1/admin/career/careerfield/career/update`,{
            CareerLinguistic,
            CareerLogical,
            CareerSpatial,           
            Non_Iq_Intelligence1,
            Non_Iq_Intelligence2,
            Non_Iq_Intelligence3,
            Non_Iq_Intelligence4,
            CareerName,
            CareerId :Number(CareerId),
            OldCareerId,
            CourseSpecialization01Id:Number(CourseSpecialization01Id),
            CourseSpecialization02Id:Number(CourseSpecialization02Id),
            CourseSpecialization03Id:Number(CourseSpecialization03Id),
            CourseSpecialization04Id:Number(CourseSpecialization04Id),
            CareerDbId,
            SelectedField:Number(SelectedField),
            task
            
        });

        console.log("response",response.data)

        if(response.status===200){
            alert('Career Updated Succesfully');
            setSelectedCareerId(CareerId); // ← This is needed!
            localStorage.setItem("SelectedCareerId",CareerId);
            navigate('/admin/careerfield/career')

        }
    }catch(error){
        console.log('error',error)
        if(error.response.data){
            console.log(error.response.data)
            alert('Error Occured')

        }else{
            alert("Failed to Update Career")
        }
        
    }

}

const updateSubject=async()=>{
    if(CareerName===''){
        alert('Please Enter A Valid Subject Name');
        return
    }

    if(CareerId===''){
        alert('Please Enter A Valid Career Id');
        return
    }

    if(window.confirm('Are you sure you want to update the Activity \n This Action Cannot Be Undone')){
        await sendToBackEnd();
        return
    }
    return
}

    useEffect(()=>{
        const storedValue = localStorage.getItem('SelectedField');
        if(storedValue){
            setSelectedField(storedValue);
        }
    })

    const handleTaskAdd = ()=>{
        setTask([...task,{career_id:Number(SelectedCareerId),task:'',task_id:null}])
      }

    const handleDeleteTask=async(taskId)=>{
        if(!window.confirm('Do you want to delete this Task? \n This action cannot be undone')){
            return
        }
        try{
            const response = await axiosInstance.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/task/delete`,{
                taskId
            })
            console.log(response.data)
            if(response.status===200){
                alert('Task Deleted')
                window.location.reload(); 

            }
        }catch(err){
            console.log(err)
        }
    }  

    const handleSpecialization01Change = (value) => {
        setCourseSpecialization01Id(value);
    };

    const handleSpecialization02Change = (value) => {
        setCourseSpecialization02Id(value);
    };

    const handleSpecialization03Change = (value) => {
        setCourseSpecialization03Id(value);
    };

    const handleSpecialization04Change = (value) => {
        setCourseSpecialization04Id(value);
    };

    if(loading){
        return <div className='spinner-container'><Spinner/></div>
    }
    
    return (
        <>

            <div className='login-container career-update-container'>
            <div className='career-update-title-container'>
                <h1 className='career-update-title'>Update Career</h1>
            </div>
            <div className='career-update-inner-container' >

                <div className='career-update-bnt-container'>
                    <label className='career-update-label'>Career Name</label>

                    {Edit ?<input type='text' onChange={(e)=>handleOnChange(e.target.value,0)} value={CareerName} className='career-update-bnt2 career-name-btn career-input'/>:
                    <button className='career-update-bnt '>{CareerName}</button>
                    }
                    
            </div>

            <div className='career-update-bnt-container'>
                    <label className='career-update-label'>Career Id</label>

                    {Edit ?<input type='number' onChange={(e)=>handleOnChange(e.target.value,1)} value={CareerId} className='career-update-bnt2 career-name-btn career-input'/>:
                    <button className='career-update-bnt '>{CareerId}</button>
                    }
                    
            </div>


                <div className='career-update-bnt-container'>
                    
                    <label className='career-update-label'>Linguistic (IQ1)</label>
                    {Edit?<input value={CareerLinguistic} onChange={(e)=>handleOnChange(e.target.value,8)} className='career-update-bnt career-input career-input' type='number'/>:
                    <button  className='career-update-bnt'>{CareerLinguistic}</button>}    

                </div>

                <div className='career-update-bnt-container'>
                    
                    <label className='career-update-label'>Logical (IQ2)</label>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,9)} value={CareerLogical} className='career-update-bnt career-input' type='number'/>:
                    <button  className='career-update-bnt2'>{CareerLogical}</button>}    

                </div>

                <div className='career-update-bnt-container'>
                    
                <label className='career-update-label'>Spatial (IQ3)</label>
                {Edit?<input value={CareerSpatial} onChange={(e)=>handleOnChange(e.target.value,10)} className='career-update-bnt career-input' type='number'/>:
                <button  className='career-update-bnt2'>{CareerSpatial}</button>}    

                </div>

 
                

                <div className='career-update-bnt-container'>
                <label className='career-update-label'>Non-IQ-Intelligence1</label>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence1}
                                </div>

                                <input  type="checkbox" className="dd-input career-input" id="test"/>

                                {dropdownData(1)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence1}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>

                {/* Intelligence 02 */}
                <div className='career-update-bnt-container'>
                <label className='career-update-label'>Non-IQ-Intelligence2</label>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence2}
                                </div>

                                <input  type="checkbox" className="dd-input career-input" id="test"/>

                                {dropdownData(2)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence2}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>


                {/* Intelligence 03 */}
                <div className='career-update-bnt-container'>
                <label className='career-update-label'>Non-IQ-Intelligence3</label>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence3}
                                </div>

                                <input  type="checkbox" className="dd-input career-input" id="test"/>

                                {dropdownData(3)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence3}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>

                <div className='career-update-bnt-container'>
                <label className='career-update-label'>Non-IQ-Intelligence4</label>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                    {Non_Iq_Intelligence4}
                                </div>

                                <input  type="checkbox" className="dd-input career-input" id="test"/>

                                {dropdownData(4)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence4}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>        
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 01</label>
                            {Edit?
                    <div className='specialization-select-container'>
                        <select onChange={(e) => handleSpecialization01Change(e.target.value)}  className='ol-input career-input specialization-select-option'>
                            <option className='specialization-name' value="">{CourseSpecialization01}</option>
                                {AllSpecializations.map((spec) => (
                                <option className='specialization-name career-input' key={spec.id} value={spec.id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>
                    </div>:
                      <button className='career-update-bnt2'>
                          {CourseSpecialization01}
                      </button>}
                    </div>




                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 02</label>
                            {Edit?
                    <div className='specialization-select-container'>
                        <select onChange={(e) => handleSpecialization02Change(e.target.value)} className='ol-input career-input specialization-select-option'>
                            <option className='specialization-name career-input' value="">{CourseSpecialization02}</option>
                                {AllSpecializations.map((spec) => (
                                <option className='specialization-name career-input' key={spec.id} value={spec.id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>
                    </div>:
                      <button className='career-update-bnt2'>
                          {CourseSpecialization02}
                      </button>}
                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 03</label>
                            {Edit?
                    <div className='specialization-select-container'>
                        <select onChange={(e) => handleSpecialization03Change(e.target.value)}  className='ol-input career-input specialization-select-option'>
                            <option className='career-input specialization-name' value="">{CourseSpecialization03}</option>
                                {AllSpecializations.map((spec) => (
                                <option className='career-input specialization-name' key={spec.id} value={spec.id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>
                    </div>:
                      <button className='career-update-bnt2'>
                          {CourseSpecialization03}
                      </button>}
                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 04</label>
                            {Edit?
                    <div className='specialization-select-container'>
                        <select onChange={(e) => handleSpecialization04Change(e.target.value)}  className='ol-input career-input specialization-select-option'>
                            <option className='specialization-name' value="">{CourseSpecialization04}</option>
                                {AllSpecializations.map((spec) => (
                                <option className='specialization-name' key={spec.id} value={spec.id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>
                    </div>:
                      <button className='career-update-bnt2'>
                          {CourseSpecialization04}
                      </button>}
                    </div>

                <div className='' >
                    {Array.isArray(task) && task.map((task, index) => (
                        <div className='career-update-bnt-container' key={index}>
                        <label className="career-update-label">Task {index +1}</label>
                        {Edit ? (
                            <>
                            <input
                            type='text'
                            onChange={(e)=>{handleTaskChange(e.target.value,index)}}
                            className="career-update-bnt2 career-input task-input"
                            value={task.task}
                            />
                            <img   onClick={() => handleDeleteTask(task.task_id)} className='delete-task' src={DeleteIcon}/>
                            </>

                        ) : (
                            <button className="career-update-bnt2 task-btn">{task.task}</button>
                        )}
                        </div>
                    ))}
                </div>

                {Edit?<div className='add-task-btn-container'>
                        <button onClick={handleTaskAdd} className='login-btn add-task-btn'>Add Task</button>
                     </div>:
                     <div>
                        <button onClick={handleTaskAdd} className='login-btn not-show-btn'>Add Task</button>
                     </div>}    

   


            </div>

            <div className='alevel-update-btn-container career-edit-delete-container'>
                    <div className='career-edit-btn-container'>
                        {Edit?<button onClick={updateSubject}  className='career-edit-btn'>Update</button>:
                        <button onClick={handleEditClick}  className='career-edit-btn'>Edit</button>}
                    </div>
                    <div className='ol-delete-container career-delete-container'>
                        <button
                            onClick={()=>{handleDelete(CareerId)}}
                            className='login-btn ol-delete-btn career-delete-btn'
                        >
                            Delete
                        </button>

                    </div>
                    </div>

            </div>
        </>
    );
};

export default CareerUpdate;
