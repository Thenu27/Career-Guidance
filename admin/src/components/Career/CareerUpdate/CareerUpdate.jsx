import './CareerUpdate.css';
import { useContext, useEffect } from 'react';
import { CareerContext } from '../../../Context/Career.context';
import axios from 'axios';


const CareerUpdate = () => {
    const { SelectedCareer,SelectedCareerDetails,setSelectedCareerDetails } = useContext(CareerContext);

    const fetchSelectedCareerDetails = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/admin/career/update`, {
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

    return (
        <>
            <div className='career-update-title-container'>
                <h1 className='career-update-title'>Update Career</h1>
            </div>
            <div className='career-update-container'>
                <div className='career-update-bnt-container'>
                    <label className='career-update-label'>Career Name</label>
                    <input type='text' value=                        {SelectedCareerDetails?.length > 0 
                            ? SelectedCareerDetails[0].career 
                            : "No Career Selected"} className='career-update-bnt2'/>
                    
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        {SelectedCareerDetails?.length > 0 
                            ? IdentifyIntelligence(SelectedCareerDetails[0].mi_1) 
                            : "Unknown"}
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].mi_percentage1}%` 
                            : "No Data"}
                    </button>
                </div>

                {/* Intelligence 02 */}
                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        {SelectedCareerDetails?.length > 0 
                            ? IdentifyIntelligence(SelectedCareerDetails[0].mi_2) 
                            : "Unknown"}
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].mi_percentage2}%` 
                            : "No Data"}
                    </button>
                </div>

                {/* Intelligence 03 */}
                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        {SelectedCareerDetails?.length > 0 
                            ? IdentifyIntelligence(SelectedCareerDetails[0].mi_3) 
                            : "Unknown"}
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].mi_percentage3}%` 
                            : "No Data"}
                    </button>
                </div>
                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 01
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].s1}%` 
                            : "No Data"}
                    </button>
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 02
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].s2}%` 
                            : "No Data"}
                    </button>
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 03
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].s3}%` 
                            : "No Data"}
                    </button>
                </div>

                <div className='career-update-bnt-container'>
                    <button className='career-update-bnt'>
                        Specialization 04
                    </button>
                    <button className='career-update-bnt2'>
                        {SelectedCareerDetails?.length > 0 
                            ? `${SelectedCareerDetails[0].s4}%` 
                            : "No Data"}
                    </button>
                </div>

               
            </div>
        </>
    );
};

export default CareerUpdate;
