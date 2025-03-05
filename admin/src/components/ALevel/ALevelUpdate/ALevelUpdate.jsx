import './ALevelUpdate.css';
import { useEffect, useContext,useState } from 'react';
import { ALevelContext } from '../../../Context/ALevel.context';
import DeleteIcon from '../../../assets/icon.svg';
import axios from 'axios';

const ALevelUpdate = () => {

const {SelectedSubject,ALevelLocalSubjects} = useContext(ALevelContext);
const [SelectedSubjectData,setSelectedSubjectData] = useState();

const IdentifyIntelligence = (value) => {
    switch (value) {
        case 1: return 'Logical-Mathematical';
        case 2: return 'Linguistic';
        case 3: return 'Spatial';
        case 4: return 'Musical';
        case 5: return 'Bodily-Kinesthetic';
        case 6: return 'Interpersonal';
        case 7: return 'Intrapersonal';
        case 8: return 'Naturalistic';
        case 9: return 'Existential';
        default: return 'Unknown';
    }
};

const [Edit,setEdit] = useState(false);

const [Score1,setScore1] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_percentage1):'No Subject Selected')
const [Score2,setScore2] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_percentage2):'No Subject Selected')
const [Score3,setScore3] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_percentage3):'No Subject Selected')

const [Intelligence1,setIntelligence1] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_1):'No Data selected')
const [Intelligence2,setIntelligence2] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_2):'No Data selected');
const [Intelligence3,setIntelligence3] = useState(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_3):'No Data selected');

const [ALSubject,setALSubject] = useState(SelectedSubjectData?(SelectedSubjectData.subject):'No Data selected');

useEffect(()=>{
    console.log('Intelligence 01',Intelligence1)
},[SelectedSubjectData])

const handleEditClick = ()=>{
    setEdit(true);
}

useEffect(()=>{
    setIntelligence1(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_1):'No Subject Selected')
    setIntelligence2(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_2):'No Subject Selected')
    setIntelligence3(SelectedSubjectData?IdentifyIntelligence(SelectedSubjectData.mi_3):'No Subject Selected')

    setScore1(SelectedSubjectData?(SelectedSubjectData.mi_percentage1):'No Subject Selected')
    setScore2(SelectedSubjectData?(SelectedSubjectData.mi_percentage2):'No Subject Selected')
    setScore3(SelectedSubjectData?(SelectedSubjectData.mi_percentage3):'No Subject Selected')

    setALSubject(SelectedSubjectData?(SelectedSubjectData.subject):'No Data selected')


},[SelectedSubjectData])

useEffect(()=>{
   console.log("SelectedSubject",SelectedSubject);
            getSelectedSubjectData(SelectedSubject)
        },[])


          
       const getSelectedSubjectData =(selected_subject_id)=>{
              const subjectData = ALevelLocalSubjects.find(item=>item.subject_id === selected_subject_id);
              setSelectedSubjectData(subjectData);
       }
       
       useEffect(()=>{
            console.log("SelectedSubjectData",SelectedSubjectData);
       },[SelectedSubjectData])


       const sendSubjectToDelete = async (subject_id, subject) => {
        try {
            // Make the POST request to delete the subject using subject_id and subject name
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/alevel/delete`, {
                subject_id,
                subject
            });

            // Check if the deletion was successful and notify the user
            if (response.status === 200 && response.data === 'Subject Deleted') {
                alert('Subject deleted successfully');
                console.log('Response:', response.data);
            } else {
                alert('Failed to delete subject. Please try again.');
            }
        } catch (error) {
            // Handle errors, displaying server-provided messages if available
            if (error.response && error.response.data) {
                console.error('Server Error:', error.response.data);
                alert(`Error: ${error.response.data}`);
            } else {
                console.error('Error when deleting subject:', error);
                alert('An error occurred while deleting the subject. Please try again later.');
            }
        }
    };

        // Handle the delete confirmation and trigger the delete request
        const handleDelete = async (subject_id, subject) => {
            // Ask for user confirmation before proceeding with deletion
            if (window.confirm('Do you want to delete this subject?\n\nThis action cannot be undone.')) {
                await sendSubjectToDelete(subject_id, subject);
            }
        };


        const handleOnChange=(value,scoreIndex)=>{
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
            if(scoreIndex===0){
                setALSubject(value)
            }
        }
        const sendToBackEnd=async()=>{
            try{
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/a-level/update`,{
                    Intelligence1,
                    Intelligence2,
                    Intelligence3,
                    Score1,
                    Score2,
                    Score3,
                    ALSubject
                });
                if(response.data==='Subject Updated Succesfully'){
                    alert('Subject Updated Succesfully')
                }
            }catch(error){
                console.log(error)
            }
    
        }

        const updateSubject=async()=>{
            if(ALSubject===''){
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
            if(window.confirm('Are you sure you want to update the subject \n This Action Cannot Be Undone')){
                await sendToBackEnd();
                return
            }
            return
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

return (
        <>

           <div className='login-container update-container a-level-container'>
                <div className='alevel-update-title-container'>
                    <h1 className='alevel-update-title'>Update Subject</h1>
                </div>
                <div className='alevel-update-form'>
                    <div className='ol-name-update-container'>
                        <label className='ol-name-update-label'>Subject Name</label>
                        {Edit?<input onChange={(e)=>handleOnChange(e.target.value,0)} type='text' value={ALSubject}  className='ol-name-update-btn'/>:
                        <button className='ol-name-update-btn'>{ALSubject}</button>}
                    </div>
                    <div className='a-level-inner-container'>

                    <div className='update-intlligence-container a-level-intelligence-container'>
                        {Edit? <label className="dropdown intelligence-input-btn">
                                <div class="dd-button intelligence-input">
                                {Intelligence1}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(1)}

                                </label>                   :
                        <button  className='intelligence-btn'>{Intelligence1}</button>}
                        
                        {Edit?<input type='number' onChange={(e)=>handleOnChange(e.target.value,1)}  className='mi_score score-input'  value={Score1}/>:
                         <button   className='mi_score'>{Score1}</button>}
                     </div>

                     <div className='update-intlligence-container'>
                        {Edit? <label className="dropdown intelligence-input-btn">
                                <div class="dd-button intelligence-input">
                                {Intelligence2}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(2)}

                                </label>                   :
                        <button  className='intelligence-btn'>{Intelligence2}</button>}
                        
                        {Edit?<input onChange={(e)=>handleOnChange(e.target.value,2)}  className='mi_score score-input' type='text' value={Score2}/>:
                         <button type='number'  className='mi_score'>{Score2}</button>}
                     </div>

                     <div className='update-intlligence-container'>
                        {Edit? <label className="dropdown intelligence-input-btn">
                                <div class="dd-button intelligence-input">
                                {Intelligence3}
                                </div>

                                <input type="checkbox" className="dd-input" id="test"/>

                                {dropdownData(3)}

                                </label>                   :
                        <button  className='intelligence-btn'>{Intelligence3}</button>}
                        
                        {Edit?<input onChange={(e)=>handleOnChange(e.target.value,3)}  className='mi_score score-input'type='number' value={Score3}/>:
                         <button   className='mi_score'>{Score3}</button>}
                     </div>
                     </div>

                   <div className='ol-btn-container'>


                        <div className='ol-delete-container'>
                            <button onClick={()=>{handleDelete(SelectedSubjectData.subject_id,SelectedSubjectData.subject)}} className='login-btn ol-delete-btn'>Delete</button>
                        </div>
                        <div className='ol-edit-btn-container'>
                                {Edit?<button onClick={()=>{handleEditClick(),updateSubject()}} className='ol-edit-btn'>Update</button>:
                                <button onClick={handleEditClick} className='ol-edit-btn'>Edit</button>}
                            </div>

                    </div>         


                </div>
           </div>
        </>

    )
}

export default ALevelUpdate