import './OLevelEdit.css';
import { useContext, useState } from 'react';
import { OLevelContext } from '../../../Context/OLevel.context';
import axios from 'axios';
import DeleteIcon from '../../../assets/icon.svg';

const OLevelEdit = () => {
    // Extracting values from the OLevelContext for use in the component
    const { OLevelIndex, OLevelCoreLocal, ShowlocalCoreOL, OLevelBasketLocal } = useContext(OLevelContext);

    const [DoubledClicked,setDoubledClicked] = useState(true)

    // Determine which subject data to display based on the ShowlocalCoreOL flag
    const activeSubject = ShowlocalCoreOL ? OLevelCoreLocal[OLevelIndex] : OLevelBasketLocal[OLevelIndex];

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

    return (
        <div>
            {/* Displaying the active subject being edited */}
            <h1 className='welcome-title olevel-title'>
                Update Subject - {activeSubject.subjects}
            </h1>
            <div className='update-container'>
                {/* Dynamically rendering intelligence details using map to reduce repetitive code */}
                {[1, 2, 3].map((index) => (
                    <div className='update-intlligence-container' key={index}>
                        {DoubledClicked?
                        <input type='text' value={IdentifyIntelligence(activeSubject[`mi_${index}`])}/>
                        :
                        <button className='intelligence-btn'>
                            {IdentifyIntelligence(activeSubject[`mi_${index}`])}
                        </button>
                            }

                        <button className='mi_score'>
                            {activeSubject[`mi_percentage${index}`]}
                        </button>
                    </div>
                ))}

                {/* Displaying the category or pathline information */}
                <div className='update-intlligence-container update-category-container'>
                    <button className='intelligence-btn'>Category</button>
                    <button className='mi_score category'>{activeSubject.pathline}</button>
                </div>

                {/* Delete button and icon for deleting the subject */}
                <div className='ol-delete-container'>
                    <button
                        onClick={() => handleDelete(activeSubject.subject_id, activeSubject.subjects)}
                        className='login-btn ol-delete-btn'
                    >
                        Delete
                    </button>
                    <img
                        onClick={() => handleDelete(activeSubject.subject_id, activeSubject.subjects)}
                        className='ol-delete-icon'
                        src={DeleteIcon}
                        alt="Delete icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default OLevelEdit;
