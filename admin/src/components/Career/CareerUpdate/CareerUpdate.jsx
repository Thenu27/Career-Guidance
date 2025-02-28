import './CareerUpdate.css';
import { useContext, useEffect,useState } from 'react';
import { CareerContext } from '../../../Context/Career.context';
import axios from 'axios';
import DeleteIcon from '../../../assets/icon.svg';



const CareerUpdate = () => {
    const { setSelectedCareer,SelectedCareer,SelectedCareerDetails,setSelectedCareerDetails,setSelectedField,SelectedField} = useContext(CareerContext);

    useEffect(()=>{
        setSelectedCareer(localStorage.getItem("SelectedCareer"));
    },[])

    const [Edit,setEdit] = useState(false);  
    // const [Score1,setScore1] = useState('No Data Selected')
    // const [Score2,setScore2] = useState('No Data Selected')
    // const [Score3,setScore3] = useState('No Data Selected')

    const [CareerId,setCareerId] = useState();
    
    const [Non_Iq_Intelligence1,setNon_Iq_Intelligence1] = useState('No Data Selected')
    const [Non_Iq_Intelligence2,setNon_Iq_Intelligence2] = useState('No Data Selected');
    const [Non_Iq_Intelligence3,setNon_Iq_Intelligence3] = useState('No Data Selected');
    const [Non_Iq_Intelligence4,setNon_Iq_Intelligence4] = useState('No Data Selected');

    
    const [Specialization1,setSpecialization1] = useState('No Data Selected')
    const [Specialization2,setSpecialization2] = useState('No Data Selected');
    const [Specialization3,setSpecialization3] = useState('No Data Selected');
    const [Specialization4,setSpecialization4] = useState('No Data Selected');

    const [CareerName,setCareerName] = useState();
    const [CareerLinguistic,setCareerLinguistic] = useState();
    const [CareerLogical,setCareerLogical] = useState();
    const [CareerSpatial,setCareerSpatial] = useState();



    useEffect(()=>{
        if (SelectedCareerDetails && SelectedCareerDetails.length > 0){

            setNon_Iq_Intelligence1(IdentifyIntelligence(SelectedCareerDetails[0].non_iq_intelligence1))
            setNon_Iq_Intelligence2(IdentifyIntelligence(SelectedCareerDetails[0].non_iq_intelligence2))
            setNon_Iq_Intelligence3(IdentifyIntelligence(SelectedCareerDetails[0].non_iq_intelligence3))
            setNon_Iq_Intelligence4(IdentifyIntelligence(SelectedCareerDetails[0].non_iq_intelligence4))


            setSpecialization1(SelectedCareerDetails[0].s1)
            setSpecialization2(SelectedCareerDetails[0].s2)
            setSpecialization3(SelectedCareerDetails[0].s3)
            setSpecialization4(SelectedCareerDetails[0].s4)

            setCareerName(SelectedCareerDetails[0].career)
            setCareerId(SelectedCareerDetails[0].career_id)
            
            setCareerLinguistic(SelectedCareerDetails[0].linguistic)
            setCareerLogical(SelectedCareerDetails[0].logical);
            setCareerSpatial(SelectedCareerDetails[0].spatial)



        }
    },[SelectedCareerDetails])


    const fetchSelectedCareerDetails = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/details`, {
                SelectedCareer
            });
            console.log("Response from server:", response.data);
            setSelectedCareerDetails(response.data);
        } catch (error) {
            console.error("Error sending data to the backend:", error);
            alert("Failed to send data. Please try again.");
        }
    }

    useEffect(()=>{
        fetchSelectedCareerDetails();
    },[SelectedCareer])

    useEffect(() => {
        console.log("Selected Career Details", SelectedCareerDetails);
    }, [SelectedCareerDetails]);

    useEffect(() => {
        console.log("SelectedCareerin Update pae", SelectedCareer);
    })

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
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/delete`, {
                career,career_id
            });

            if (response.status === 200 && response.data === 'Career Deleted') {
                alert('Career deleted successfully');
            } else {
                alert('Failed to delete career. Please try again.');
            }

            console.log(response.data);
        } catch (error) {
            console.error('Error when deleting career', error);
            alert('An error occurred while deleting the career. Please try again later.');
        }
    }

    const handleDelete = async (career,career_id) => {
        if(window.confirm('Do you want to delete this career?\n\nThis action cannot be undone.')){
            await sendCareerToDelete(career,career_id);
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
                <li onClick={()=>handleIntelligenceChange('Logical-Mathematical Intelligence',index)}>Logical-Mathematical Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Linguistic Intelligence',index)}>Linguistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Spatial Intelligence',index)}>Spatial Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Musical Intelligence',index)}>Musical Intelligence</li>                                     
                <li onClick={()=>handleIntelligenceChange('Bodily-Kinesthetic Intelligence',index)}>Bodily-Kinesthetic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Interpersonal Intelligence',index)}>Interpersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Intrapersonal Intelligence',index)}>Intrapersonal Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Naturalistic Intelligence',index)}>Naturalistic Intelligence</li>
                <li onClick={()=>handleIntelligenceChange('Existential Intelligence',index)}>Existential Intelligence</li>

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

    if(scoreIndex===4){
        setSpecialization1(value)
        return
    }
    if(scoreIndex===5){
        setSpecialization2(value)
        return
    }
    if(scoreIndex===6){
        setSpecialization3(value)
        return
    }
    if(scoreIndex===7){
        setSpecialization4(value)
        return
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


const sendToBackEnd=async()=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/update`,{
            CareerLinguistic,
            CareerLogical,
            CareerSpatial,           
            Non_Iq_Intelligence1,
            Non_Iq_Intelligence2,
            Non_Iq_Intelligence3,
            Non_Iq_Intelligence4,
            CareerName,
            CareerId,
            Specialization1,
            Specialization2,
            Specialization3,
            Specialization4,
            SelectedField
            
        });
        if(response.data==='Career Updated Succesfully'){
            alert('Career Updated Succesfully')
        }
    }catch(error){
        console.log(error)
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

    if(Specialization1===''){
        alert('Please Enter A Valid Specialization');
        return
    }
    if(Specialization2===''){
        alert('Please Enter A Valid  Specialization 1');
        return
    }
    if(Specialization3===''){
        alert('Please Enter A Valid  Specialization 2');
        return
    }
    if(Specialization4===''){
        alert('Please Enter A Valid  Specialization 3');
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


    return (
        <>
            <div className='career-update-title-container'>
                <h1 className='career-update-title'>Update Career</h1>
            </div>
            <div className='career-update-container'>
                <div className='career-update-bnt-container'>
                    <label className='career-update-label'>Career Name</label>

                    {Edit ?<input type='text' onChange={(e)=>handleOnChange(e.target.value,0)} value={CareerName} className='career-update-bnt2 career-name-btn'/>:
                    <button className='career-update-bnt '>{CareerName}</button>
                    }
                    
            </div>

            <div className='career-update-bnt-container'>
                    <label className='career-update-label'>Career Id</label>

                    {Edit ?<input type='number' onChange={(e)=>handleOnChange(e.target.value,1)} value={CareerId} className='career-update-bnt2 career-name-btn'/>:
                    <button className='career-update-bnt '>{CareerId}</button>
                    }
                    
            </div>


                <div className='career-update-bnt-container'>
                    
                    <button className='career-update-bnt'>
                        Linguistic
                    </button>
                    {Edit?<input value={CareerLinguistic} onChange={(e)=>handleOnChange(e.target.value,8)} className='career-update-bnt' type='number'/>:
                    <button  className='career-update-bnt2'>{CareerLinguistic}</button>}    

                </div>

                <div className='career-update-bnt-container'>
                    
                    <button className='career-update-bnt'>
                        Logical
                    </button>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,9)} value={CareerLogical} className='career-update-bnt' type='number'/>:
                    <button  className='career-update-bnt2'>{CareerLogical}</button>}    

                </div>

                <div className='career-update-bnt-container'>
                    
                    <button className='career-update-bnt'>
                        Spatial
                    </button>
                    {Edit?<input value={CareerSpatial} onChange={(e)=>handleOnChange(e.target.value,10)} className='career-update-bnt' type='number'/>:
                    <button  className='career-update-bnt2'>{CareerSpatial}</button>}    

                </div>

 
                

                <div className='career-update-bnt-container'>
                    <button>Non Iq Intelligence 01</button>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence1}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(1)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence1}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>

                {/* Intelligence 02 */}
                <div className='career-update-bnt-container'>
                    <button>Non Iq Intelligence 02</button>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence2}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(2)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence2}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>


                {/* Intelligence 03 */}
                <div className='career-update-bnt-container'>
                    <button>Non Iq Intelligence 03</button>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Non_Iq_Intelligence3}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(3)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence3}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>

                <div className='career-update-bnt-container'>
                    <button>Non Iq Intelligence 03</button>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                    {Non_Iq_Intelligence4}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(4)}

                          </label>:
                    <button className='career-update-bnt'>{Non_Iq_Intelligence4}</button>}

                    {/* {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>} */}
                </div>        

                <div className='career-update-bnt-container'>
                    
                    <button className='career-update-bnt'>
                        Specialization 01
                    </button>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,4)} value={Specialization1} className='career-update-bnt2'/>:
                    <button className='career-update-bnt2'>
                        {Specialization1}
                    </button>}

                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 02
                    </button>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,5)} value={Specialization2} className='career-update-bnt2'/>:
                    <button className='career-update-bnt2'>
                        {Specialization2}
                    </button>}
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 03
                    </button>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,6)} value={Specialization3} className='career-update-bnt2'/>:
                    <button className='career-update-bnt2'>
                        {Specialization3}
                    </button>}
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 04
                    </button>
                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,7)} value={Specialization4} className='career-update-bnt2'/>:
                    <button className='career-update-bnt2'>
                        {Specialization4}
                    </button>}
                </div>
                <div className='alevel-update-btn-container career-edit-delete-container'>
                    <div>
                        {Edit?<button onClick={updateSubject}  className='career-edit-btn'>Update</button>:
                        <button onClick={handleEditClick}  className='career-edit-btn'>Edit</button>}
                    </div>
                    <div className='ol-delete-container career-delete-container'>
                        <button
                            onClick={()=>{handleDelete(SelectedCareerDetails[0].career,SelectedCareerDetails[0].career_id)}}
                            className='login-btn ol-delete-btn'
                        >
                            Delete
                        </button>
                        <img
                            onClick={()=>{handleDelete(SelectedCareerDetails[0].career,SelectedCareerDetails[0].career_id)}}
                            className='ol-delete-icon'
                            src={DeleteIcon}
                            alt="Delete icon"
                        />
                    </div>

            </div>

            </div>
        </>
    );
};

export default CareerUpdate;
