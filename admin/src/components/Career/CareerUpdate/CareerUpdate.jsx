import './CareerUpdate.css';
import { useContext, useEffect,useState } from 'react';
import { CareerContext } from '../../../Context/Career.context';
import axios from 'axios';
import DeleteIcon from '../../../assets/icon.svg';



const CareerUpdate = () => {
    const { setSelectedCareer,SelectedCareer,SelectedCareerDetails,setSelectedCareerDetails } = useContext(CareerContext);

    useEffect(()=>{
        setSelectedCareer(localStorage.getItem("SelectedCareer"));
    },[])

    const [Edit,setEdit] = useState(false);  
    const [Score1,setScore1] = useState('No Data Selected')
    const [Score2,setScore2] = useState('No Data Selected')
    const [Score3,setScore3] = useState('No Data Selected')
    
    const [Intelligence1,setIntelligence1] = useState('No Data Selected')
    const [Intelligence2,setIntelligence2] = useState('No Data Selected');
    const [Intelligence3,setIntelligence3] = useState('No Data Selected');
    
    const [Specialization1,setSpecialization1] = useState('No Data Selected')
    const [Specialization2,setSpecialization2] = useState('No Data Selected');
    const [Specialization3,setSpecialization3] = useState('No Data Selected');
    const [Specialization4,setSpecialization4] = useState('No Data Selected');

    const [CareerName,setCareerName] = useState();


    useEffect(()=>{
        if (SelectedCareerDetails && SelectedCareerDetails.length > 0)            {
            setIntelligence1(IdentifyIntelligence(SelectedCareerDetails[0].mi_1))
            setIntelligence2(IdentifyIntelligence(SelectedCareerDetails[0].mi_2))
            setIntelligence3(IdentifyIntelligence(SelectedCareerDetails[0].mi_3))

            setSpecialization1(SelectedCareerDetails[0].s1)
            setSpecialization2(SelectedCareerDetails[0].s2)
            setSpecialization3(SelectedCareerDetails[0].s3)
            setSpecialization4(SelectedCareerDetails[0].s4)



            setScore1(SelectedCareerDetails[0].mi_percentage1)
            setScore2(SelectedCareerDetails[0].mi_percentage2)
            setScore3(SelectedCareerDetails[0].mi_percentage3)

            setCareerName(SelectedCareerDetails[0].career)


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
           setIntelligence1(value)
           return
        }
        if(index===2){
           setIntelligence2(value)
           return
        }
        if(index===3){
           setIntelligence3(value)
           return
        }
   }

   
   const handleOnChange=(value,scoreIndex)=>{

    if(scoreIndex===0){
        setCareerName(value)
        return
    }
    if(scoreIndex===1){
        setScore1(value)
        return
    }
    if(scoreIndex===2){
        setScore2(value)
        return
    }
    if(scoreIndex===3){
        setScore3(value)
        return
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

}


const sendToBackEnd=async()=>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/update`,{
            Intelligence1,
            Intelligence2,
            Intelligence3,
            Score1,
            Score2,
            Score3,
            CareerName,
            Specialization1,
            Specialization2,
            Specialization3,
            Specialization4
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
    if(Score1===''){
        alert('Please Enter A Valid MI Score 1');
        return
    }
    if(Score2===''){
        alert('Please Enter A Valid MI Score 2');
        return
    }
    if(Score3===''){
        alert('Please Enter A Valid MI Score 3');
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
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence1}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(1)}

                          </label>:
                    <button className='career-update-bnt'>{Intelligence1}</button>}

                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,1)}  className='career-update-bnt2' value={Score1}/>:
                    <button className='career-update-bnt'>{Score1}</button>}
                </div>

                {/* Intelligence 02 */}
                <div className='career-update-bnt-container'>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence1}
                                </div>

                                <input  type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(2)}

                          </label>:
                    <button className='career-update-bnt'>{Intelligence2}</button>}

                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,2)} className='career-update-bnt2' value={Score2}/>:
                    <button className='career-update-bnt'>{Score2}</button>}
                </div>


                {/* Intelligence 03 */}
                <div className='career-update-bnt-container'>
                    {Edit?<label className="dropdown">
                                <div class="dd-button intelligence-input">
                                {Intelligence3}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(3)}

                          </label>:
                    <button className='career-update-bnt'>{Intelligence3}</button>}

                    {Edit?<input onChange={(e)=>handleOnChange(e.target.value,3)} className='career-update-bnt2' value={Score3}/>:
                    <button className='career-update-bnt'>{Score3}</button>}
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
