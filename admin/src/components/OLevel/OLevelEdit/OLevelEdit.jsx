import './OLevelEdit.css';
import { useContext, useEffect, useState } from 'react';
import { OLevelContext } from '../../../Context/OLevel.context';
import axios from 'axios';
import DeleteIcon from '../../../assets/icon.svg';

const OLevelEdit = () => {
    // Extracting values from the OLevelContext for use in the component
    const { OLevelIndex, OLevelCoreLocal, ShowlocalCoreOL, OLevelBasketLocal } = useContext(OLevelContext);

    const [Edit,setEdit] = useState(false);


    const [Score1,setScore1] = useState()
    const [Score2,setScore2] = useState()
    const [Score3,setScore3] = useState()


    // Determine which subject data to display based on the ShowlocalCoreOL flag
    const activeSubject = ShowlocalCoreOL ? OLevelCoreLocal[OLevelIndex] : OLevelBasketLocal[OLevelIndex];

    const [OLSubject,setOLSubject] = useState(activeSubject?activeSubject.subjects:'Loading...')


    // Function to map intelligence type values (1-9) to their corresponding labels
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

    const [Intelligence1,setIntelligence1] = useState(activeSubject?IdentifyIntelligence(activeSubject[`mi_1`]):'Loading')
    const [Intelligence2,setIntelligence2] = useState(activeSubject?IdentifyIntelligence(activeSubject[`mi_2`]):'Loading');
    const [Intelligence3,setIntelligence3] = useState(activeSubject?IdentifyIntelligence(activeSubject[`mi_3`]):'Loading');


    // Function to send a POST request to delete the selected subject
    const sendSubjectToDelete = async (subject_id, subject) => {
        try {
            // Make the POST request to delete the subject using subject_id and subject name
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/olevel/delete`, {
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

    const handleEdit=()=>{
        if(Edit===false){
            setEdit(true);
        }else{
            setEdit(false);
        }
    }




    useEffect(()=>{
        console.log('Intelliegence1 ',Intelligence1)
    },[Intelligence1])

    useEffect(()=>{
        console.log('Intelliegence2 ',Intelligence2)
    },[Intelligence2])

    useEffect(()=>{
        console.log('Intelliegence3 ',Intelligence3)
    },[Intelligence3])


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

    const handleScoreChange=(index,value)=>{
        if(index===1){
            setScore1(value)
            return
        }
        if(index===2){
            setScore2(value)
            return
        }
        if(index===3){
            setScore3(value)
            return
        }
    }

    useEffect(()=>{
        if(Edit){
            setScore1(activeSubject[`mi_percentage1`])
            setScore2(activeSubject[`mi_percentage2`])
            setScore3(activeSubject[`mi_percentage3`])
        }
    },[Edit])


    const sendToBackEnd=async()=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/o-level/update`,{
                Intelligence1,
                Intelligence2,
                Intelligence3,
                Score1,
                Score2,
                Score3,
                OLSubject
            });
            if(response.data==='Subject Updated Succesfully'){
                alert('Subject Updated Succesfully')
            }
        }catch(error){
            console.log(error)
        }

    }

    const updateSubject=async()=>{
        if(OLSubject===''){
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

    const handleNameChange=(value)=>{
        setOLSubject(value)
    }

    useEffect(()=>{
        console.log(OLSubject)
    },[OLSubject])

    return (
        <div>
            {/* Displaying the active subject being edited */}
 
            <div className=' login-container update-container'>
            <h1 className='welcome-title olevel-title'>
                Update Subject
                {/* Update Subject - {activeSubject?activeSubject.subjects:'Loading...'} */}
            </h1>
                <div className='ol-name-update-container'>
                    <label className='ol-name-update-label'>Subject Name</label>
                    {Edit?<input onChange={(e)=>handleNameChange(e.target.value)}  className='ol-name-update-btn' type='text' value={OLSubject}/>:
                    <button className='ol-name-update-btn'>{OLSubject}</button>}
                </div>
                {/* Dynamically rendering intelligence details using map to reduce repetitive code */}
                {[1, 2, 3].map((index) => (
                    <div className='update-intlligence-container' key={index}>
                        {Edit?
                            <label className="dropdown intelligence-input-btn">

                                    <div class="dd-button intelligence-input">
                                    {index===1?Intelligence1:index===2?Intelligence2:Intelligence3}
                                    </div>

                                    <input type="checkbox" className="dd-input" id="test"/>

                                    {dropdownData(index)}

                                    </label>                        :
                        <button className='intelligence-btn'>
                            {activeSubject?IdentifyIntelligence(activeSubject[`mi_${index}`]):'Loading...'}
                        </button>
                            }
                        {Edit?<input type='number' className='mi_score score-input' onChange={(e)=>{handleScoreChange(index,e.target.value)}} 
                        value={index===1?Score1:index===2?Score2:Score3} />:<button className='mi_score'>
                            {activeSubject?activeSubject[`mi_percentage${index}`]:'Loading...'}
                        </button>}

                    </div>
                ))}

                {/* Displaying the category or pathline information */}
                <div className='update-intlligence-container update-category-container'>
                    <button className='intelligence-btn'>Category</button>
                    <button className='mi_score category'>{activeSubject?activeSubject.pathline:'Loading..'}</button>
                </div>

                {/* Delete button and icon for deleting the subject */}
                <div className='ol-btn-container'>
                    <div className='ol-delete-container'>
                        <button
                            onClick={() => handleDelete(activeSubject.subject_id, activeSubject.subjects)}
                            className='login-btn ol-delete-btn'
                        >
                            Delete
                        </button>

                    </div>
                    <div className='ol-edit-btn-container'>
                    
                        {Edit?<button onClick={updateSubject}  className='ol-edit-btn'>Update</button>:
                        <button onClick={handleEdit}  className='ol-edit-btn'>Edit Subject</button>        }
                    </div>
                </div>
               

            </div>
        </div>
    );
};

export default OLevelEdit;
