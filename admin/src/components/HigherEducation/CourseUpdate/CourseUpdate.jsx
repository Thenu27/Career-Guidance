import { useEffect,useState} from 'react';
import './CourseUpdate.css'
import axiosInstance from '../../AxiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CourseUpdate= () => {

    const [Edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseDetails, setCourseDetails] = useState({});
    const [AllSpecializations, setAllSpecializations] = useState([]);

    const [CourseName,setCourseName] = useState();
    const [CourseField,setCourseField] = useState();
    const [CourseLevel,setCourseLevel] = useState();
    const [CourseUrl,setCourseUrl] = useState();
    const [CourseDuration,setCourseDuration] = useState();
    const [Courseinstitute,setCourseinstitute] = useState();
    const [CourseMinimumLevel,setCourseMinimumLevel] = useState();
    const [CourseSpecialization01,setCourseSpecialization01] = useState();
    const [CourseSpecialization02,setCourseSpecialization02] = useState();
    const [CourseSpecialization03,setCourseSpecialization03] = useState();
    const [CourseSpecialization04,setCourseSpecialization04] = useState();
    const [CourseSpecialization01Id,setCourseSpecialization01Id] = useState();
    const [CourseSpecialization02Id,setCourseSpecialization02Id] = useState();
    const [CourseSpecialization03Id,setCourseSpecialization03Id] = useState();
    const [CourseSpecialization04Id,setCourseSpecialization04Id] = useState();
    const [Coursetitle,setCoursetitle] = useState();
    const [CourseUniversity,setCourseUniversity] = useState();
    const [InstituteWebsite,setInstituteWebsite] = useState();
    const [CourseFees,setCourseFees] = useState();

useEffect(() => {
  const info = courseDetails?.course_info?.[0];

  if (!info) return;
        const spec = courseDetails?.specialization_names || [];
        setCourseName(info.course_name || '');
        setCourseField(info.course_field || '');
        setCourseLevel(info.course_level || '');
        setCourseUrl(info.course_url || '');
        setCourseDuration(info.duration || '');
        setCourseinstitute(info.institute || '');
        setCourseMinimumLevel(info.minimum_level_category || '');
        setCoursetitle(info.title || '');
        setCourseUniversity(info.university || '');
        setInstituteWebsite(info.website || '');
        setCourseFees(info.fees || '');

        setCourseSpecialization01(spec[0]?.name || '');
        setCourseSpecialization02(spec[1]?.name || '');
        setCourseSpecialization03(spec[2]?.name || '');
        setCourseSpecialization04(spec[3]?.name || '');

        setCourseSpecialization01Id(spec[0]?.id || null);
        setCourseSpecialization02Id(spec[1]?.id || null);
        setCourseSpecialization03Id(spec[2]?.id || null);
        setCourseSpecialization04Id(spec[3]?.id || null);        

}, [courseDetails]);


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
        fetchAllSpecilization();
    },[])



    useEffect(()=>{
      const storedResult=localStorage.getItem('SelectedAdminCourseId');
        if(storedResult){
            setSelectedCourseId(storedResult);
        }

    },[])

    useEffect(()=>{
        console.log("Course Details", courseDetails);
    },[courseDetails])

    useEffect(()=>{
        console.log("Selected Course:", selectedCourseId);
    },[selectedCourseId])


    const fetchCourseDetails = async()=>{
          if (!selectedCourseId || isNaN(selectedCourseId)) return;
        try{
            const response = await axiosInstance.get(`/api/v1/admin/higher-education/course-details?courseId=${selectedCourseId}`);
            setCourseDetails(response.data); 
            setIsLoading(false)// Assuming the response is an array with one object
        }catch(error){
            console.error("Error fetching course details", error);
        }
    }


const sendUpdatedDataToBE = async () => {
    try {
        const response = await axiosInstance.post(`/api/v1/admin/higher-education/course-update`, {
            course_id: selectedCourseId,
            course_name: CourseName.trim(),
            course_level: CourseLevel.trim(),
            course_url: CourseUrl.trim(),
            duration: (Number(CourseDuration) || null),
            institute: Courseinstitute.trim(),
            minimum_level_category: CourseMinimumLevel.trim(),
            s1: Number(CourseSpecialization01Id)|| null,
            s2: Number(CourseSpecialization02Id)|| null,
            s3: Number(CourseSpecialization03Id)|| null,
            s4: Number(CourseSpecialization04Id)|| null,
            title: Coursetitle.trim(),
            course_university: CourseUniversity.trim(),
            institute_website:InstituteWebsite.trim() , 
            fees: (Number(CourseFees) || null)
        });

        console.log("Course updated successfully:", response);
        if(response.status===200){
            alert("Course updated successfully!!");
        }
    window.location.reload();
    } catch (error) {
        console.error("Error updating course:", error.response?.data || error.message);
        alert('Error Updating Course!')
    }
};




const handleUpdateClick = () => {

    if(!window.confirm("Are you sure you want to update this course?")) {
        return
    }
    sendUpdatedDataToBE()
}

    useEffect(()=>{
        fetchCourseDetails();
    },[selectedCourseId])


    const handleEditClick = () => {
        setEdit(!Edit);
    }

    const handleCourseNameChange=(event)=>{
        setCourseName(event)
    }

    const handleCourseFieldChange=(event)=>{
        setCourseField(event)
    }

    const handleCourseLevelChange=(event)=>{
        setCourseLevel(event)
    }

    const handleCourseDuration=(event)=>{
        setCourseDuration(event)
    }

    const handleCourseInstituteChange = (value) => {
    setCourseinstitute(value);
    };

    const handleCourseMinimumLevelChange = (value) => {
        setCourseMinimumLevel(value);
    };

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

    const handleCourseTitleChange = (value) => {
        setCoursetitle(value);
    };

    const handleCourseUniversityChange = (value) => {
        setCourseUniversity(value);
    };

    const handleInstituteWebsiteChange = (value) => {
        setInstituteWebsite(value);
    };

    const handleCourseFeesChange = (value) => {
        setCourseFees(value);
    };

    const handleCourseUrlChange = (value) => {
        setCourseUrl(value);
    };   

    useEffect(()=>{
        console.log('Course Specialization 01 Id:', CourseSpecialization01Id);
    },[CourseSpecialization01Id])

    const deleteCourse = async () => {
        if(!window.confirm("Are you sure you want to delete this course?")) {
            return
        }
        try {
            const response = await axiosInstance.delete(`/api/v1/admin/higher-education/course-delete?courseId=${selectedCourseId}`);
            console.log("Course deleted successfully:", response);
            if(response.status===200){
                alert("Course deleted successfully!!");
                navigate('/admin/higher-education/courses')

            }
        } catch (error) {
            console.error("Error deleting course:", error.response?.data || error.message);
            alert('Error Deleting Course!')
        }
    }


if(isLoading) {
    return (
        <div className='loading-container'>
            <h1 className='loading-text'>Loading...</h1>
        </div>
    );
}



 return(
            <>
    
                   <div className='login-container career-update-container'>
                   <div className='career-update-title-container'>
                        <h1 className='career-update-title'>Update Course</h1>
                    </div>
                    <div className='career-update-inner-container' >
        
                        <div className='career-update-bnt-container'>
                            <label className='career-update-label'>Course Name</label>
        
                            {Edit ?<input onChange={(event)=>handleCourseNameChange(event.target.value)} value={CourseName} type='text'  className='career-update-bnt2 career-name-btn career-input'/>:
                            <button className='career-update-bnt '>{CourseName}</button>
                            }
                            
                    </div>
    
{/*     
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Field</label>
                        {Edit?<input onChange={(event)=>handleCourseFieldChange(event.target.value)} value={CourseField} className='career-update-bnt career-input' type='text'/>:
                        <button  className='career-update-bnt2'>{CourseField}</button>}
 
    
                    </div> */}
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Level</label>
                        {Edit?<input onChange={(event)=>handleCourseLevelChange(event.target.value)} value={CourseLevel} className='career-update-bnt career-input' type='text'/>:
                        <button  className='career-update-bnt2'>{CourseLevel}</button>}    
    
                    </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Duration</label>
                        {Edit?<input onChange={(event)=>handleCourseDuration(event.target.value)} value={CourseDuration} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{CourseDuration}</button>}    
                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Minimum_Level</label>
                        {Edit?<input onChange={(event)=>handleCourseMinimumLevelChange(event.target.value)} value={CourseMinimumLevel} className='career-update-bnt career-input' type='text'/>:
                        <button  className='career-update-bnt2'>{CourseMinimumLevel}</button>}    
    
                    </div>
                    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label '>Institute</label>
                        {Edit?<input onChange={(event)=>handleCourseInstituteChange(event.target.value)} value={Courseinstitute} className='career-update-bnt career-input' type='text'/>:
                        <button  className='career-update-bnt2 course-update-label'>{Courseinstitute}</button>}    
    
                    </div>
     
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course University</label>
                        {Edit?<input onChange={(event)=>handleCourseUniversityChange(event.target.value)} value={CourseUniversity} className='career-update-bnt career-input' type='text'/>:
                        <button  className='career-update-bnt2 course-university'>{CourseUniversity}</button>}    
    
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
                            <option className='specialization-name career-input' value="">{CourseSpecialization03}</option>
                                {AllSpecializations.map((spec) => (
                                <option className='specialization-name career-input' key={spec.id} value={spec.id}>
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


                    {Edit?<button onClick={()=>navigate('/admin/add-specialization')} className='career-update-bnt2 add-spatialization-btn'>
                        Add New Spatialization
                    </button>  :null}       

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Title</label>
                            {Edit?<input onChange={(event)=>handleCourseTitleChange(event.target.value)} value={Coursetitle} className='career-input career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {Coursetitle}
                        </button>}

                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Fees</label>
                            {Edit?<input type='number' onChange={(event)=>handleCourseFeesChange(event.target.value)} value={CourseFees} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseFees}
                        </button>}

                    </div>     

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Institute Website</label>
                            {Edit?<input type='text' onChange={(event)=>handleInstituteWebsiteChange(event.target.value)} value={InstituteWebsite} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {InstituteWebsite}
                        </button>}

                    </div>   

                     <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course URL</label>
                            {Edit?<input type='text' onChange={(event)=>handleCourseUrlChange(event.target.value)} value={CourseUrl} className='career-update-bnt2 career-input '/>:
                            <button className='career-update-bnt2 course-url'>
                                {CourseUrl}
                        </button>}

                    </div>                    
    
                    </div>
    
                <div className='alevel-update-btn-container career-edit-delete-container'>
                        <div className='career-edit-btn-container'>
                            {Edit?<button onClick={handleUpdateClick} className='career-edit-btn'>Update</button>:
                            <button onClick={handleEditClick}   className='career-edit-btn'>Edit</button>}
                        </div>
                        <div className='ol-delete-container career-delete-container'>
                            <button
                               className='login-btn ol-delete-btn career-delete-btn'
                               onClick={deleteCourse}
                            >
                                Delete
                            </button>
    
                        </div>
                </div>
    
                </div>
            </>
 )
}

export default CourseUpdate;