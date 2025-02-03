import './ALevelUpdate.css';
import { useEffect, useContext,useState } from 'react';
import { ALevelContext } from '../../../Context/ALevel.context';
import DeleteIcon from '../../../assets/icon.svg';
import axios from 'axios';

const ALevelUpdate = () => {

const {SelectedSubject,ALevelLocalSubjects} = useContext(ALevelContext);
const [SelectedSubjectData,setSelectedSubjectData] = useState();
       useEffect(()=>{
            console.log("SelectedSubject",SelectedSubject);
            getSelectedSubjectData(SelectedSubject);
        },[])

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

    return (
        <>
        <div className='alevel-update-title-container'>
            <h1 className='alevel-update-title'>Update Subject</h1>
        </div>
           <div className='alevel-update-container'>
                <div className='alevel-update-form'>
                    <div className='alevel-update-input-container'>
                        <label className='alevel-update-subject-label'>Subject Name</label>
                        <input type='text'     value={SelectedSubjectData?.subject || 'Loading...'}  className='alevel-update-input-subject'/>
                    </div>

                    <div className='alevel-update-input-container'>
                            <button  className='alevel-update-intelligene'>{IdentifyIntelligence(SelectedSubjectData?.mi_1) || 'Loading...'}</button>
                            <button  className='alevel-update-score'>{SelectedSubjectData?.mi_percentage1 || 'Loading...'}</button>
                    </div>

                    <div className='alevel-update-input-container'>
                            <button  className='alevel-update-intelligene'>{IdentifyIntelligence(SelectedSubjectData?.mi_2)||'Loading..'}</button>
                            <button  className='alevel-update-score'>{SelectedSubjectData?.mi_percentage2 || 'Loading...'}</button>
                    </div>

                    
                    <div className='alevel-update-input-container'>
                            <button  className='alevel-update-intelligene'>{IdentifyIntelligence(SelectedSubjectData?.mi_3)||'Loading...'}</button>
                            <button  className='alevel-update-score'>{SelectedSubjectData?.mi_percentage3 || 'Loading...'}</button>
                    </div>

                    <div className='alevel-update-btn-container'>
                        <button className='alevel-update-btn'>Update</button>
                    </div>

                <div className='ol-delete-container'>
                    <button onClick={()=>{handleDelete(SelectedSubjectData.subject_id,SelectedSubjectData.subject)}} className='login-btn ol-delete-btn'>Delete</button>
                    <img className='ol-delete-icon'  src={DeleteIcon} alt="Delete icon"/>
                </div>

                </div>
           </div>
        </>

    )
}

export default ALevelUpdate