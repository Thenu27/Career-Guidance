import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/axiosInstance';
import './InstituteEdit.css'


const InstituteEdit=()=>{

    const navigate = useNavigate();
    const [InstituteDetails,setInstituteDetails] = useState();

    const [InstituteFullName, setInstituteFullName] = useState();
    const [InstituteAcronym,setInstituteAcronym] = useState();
    const [InstituteWebSite,setInstituteWebSite] = useState();
    const [InstituteId,setInstituteId] = useState();

    useEffect(()=>{
        if(InstituteDetails){
            setInstituteFullName(InstituteDetails.institute_name);
            setInstituteAcronym(InstituteDetails.institute_acronym);
            setInstituteWebSite(InstituteDetails.institute_website);
            setInstituteId(InstituteDetails.institute_id);
        }
    },[InstituteDetails])

    useEffect(()=>{
        const storedData = localStorage.getItem('SelectedInstituteId');
        if (storedData) {
            FetchInstituteToEdit(storedData);
        } else {
            alert("No institute selected for editing. Please select an institute first.");
            navigate('/admin/higher-education/institutes');
        }
    },[])

    const FetchInstituteToEdit = async(id) => {
        try{
            const response = await axiosInstance.post('/api/v1/admin/higher-education/institutes/edit', {
                institute_id: id
            });
            if(response.status === 200){
                console.log(response.data);
                setInstituteDetails(response.data.instituteData);
            }
        }catch(error){
            console.error("Error sending institute ID for edit:", error);
            alert("Error sending institute ID for edit. Please try again.");
        }
    }

    useEffect(()=>{
        console.log(InstituteDetails);
    },[InstituteDetails])

    const handleSubmit = async () => {
        if (!InstituteFullName || !InstituteAcronym || !InstituteWebSite) {
            alert("Please fill all the fields before submitting.");
            return;
        }
        sendUpdatedDataToBE()
    }

    const sendUpdatedDataToBE=async()=>{
        try{
            const response = await axiosInstance.post('/api/v1/admin/higher-education/institutes/edit2', {
                 InstituteId:Number(InstituteId),
                 InstituteFullName,
                 InstituteAcronym,
                 InstituteWebSite
            });
            if(response.status === 200){
                alert("Institute details updated successfully.");
                navigate('/admin/higher-education/institutes');
            }else{
                alert("Failed to update institute details. Please try again.");
            }
        }catch(err){
            console.error("Error sending institute ID for edit:", err);
            alert("Error sending Data. Please try again.");
        }
    }


    const handleInstituteFullNameChange = (event) => {
        setInstituteFullName(event.target.value);
    }

    const handleInstituteAcronymChange = (event) => {
        setInstituteAcronym(event);
    }
    const handleInstituteWebSiteChange = (event) => {
        setInstituteWebSite(event);
    }

  if (!InstituteDetails) {
    return <p>Loading...</p>;
  }

    return(
        <div className="login-container question-container institute-edit-container">
            <h1 className='edit-institute-title'>Edit Institute</h1>
            <div className='institute-edit-inner-container'>
                <div>
                    <label  className='ol-input-label'>Institute Full Name</label>
                    <input onChange={(e)=>handleInstituteFullNameChange(e)} className='ol-input career-input institute-input' value={InstituteFullName}/>    
                </div>

                <div>
                    <label  className='ol-input-label '>Institute Acronym    </label>
                    <input onChange={(e)=>handleInstituteAcronymChange(e.target.value)}  className='ol-input career-input institute-input' value={InstituteAcronym}/>    
                </div>

                <div>
                    <label  className='ol-input-label'>Institute Website     </label>
                    <input onChange={(e)=>handleInstituteWebSiteChange(e.target.value)} className='ol-input career-input institute-input' value={InstituteWebSite}/>    
                </div>

            </div>

            <div>
                <button onClick={handleSubmit} className='login-btn add-question-btn add-career-field' >Submit</button>
            </div>
            
        </div>
    )
}

export default InstituteEdit;