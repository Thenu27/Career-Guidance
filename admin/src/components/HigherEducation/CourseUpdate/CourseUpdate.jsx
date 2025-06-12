import { useEffect,useState} from 'react';
import './CourseUpdate.css'
import axiosInstance from '../../AxiosInstance/axiosInstance';

const CourseUpdate= () => {

    const [Edit, setEdit] = useState(false);


    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseDetails, setCourseDetails] = useState({});

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
    const [Coursetitle,setCoursetitle] = useState();
    const [CourseUniversity,setCourseUniversity] = useState();
    const [UniversityWebsite,setUniversityWebsite] = useState();
    const [CourseFees,setCourseFees] = useState();

    useEffect(()=>{
        setCourseName(courseDetails.course_name || '');
        setCourseField(courseDetails.course_field || '');
        setCourseLevel(courseDetails.course_level || '');
        setCourseUrl(courseDetails.course_url || '');
        setCourseDuration(courseDetails.duration || '');
        setCourseinstitute(courseDetails.institute || '');
        setCourseMinimumLevel(courseDetails.minimum_level_category || '');
        setCourseSpecialization01(courseDetails.s1 || '');
        setCourseSpecialization02(courseDetails.s2 || '');
        setCourseSpecialization03(courseDetails.s3 || '');
        setCourseSpecialization04(courseDetails.s4|| '');
        setCoursetitle(courseDetails.title || '');
        setCourseUniversity(courseDetails.university || '');
        setUniversityWebsite(courseDetails.website || '');
        setCourseFees(courseDetails.fees || '');
    },[courseDetails])



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
        try{
            const response = await axiosInstance.get(`/api/v1/admin/higher-education/course-details?courseId=${selectedCourseId}`);
            console.log("Course Details:", response.data);
            setCourseDetails(response.data.course_info[0]); // Assuming the response is an array with one object
        }catch(error){
            console.error("Error fetching course details", error);
        }
    }

    useEffect(()=>{
        fetchCourseDetails();
    },[selectedCourseId])


    const handleEditClick = () => {
        setEdit(!Edit);
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
        
                            {Edit ?<input value={CourseName} type='text'  className='career-update-bnt2 career-name-btn career-input'/>:
                            <button className='career-update-bnt '>{CourseName}</button>
                            }
                            
                    </div>
    
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Field</label>
                        {Edit?<input value={CourseField}  className='career-update-bnt career-input career-input' type='number'/>:
                        <button  className='career-update-bnt'>{CourseField}</button>}    
    
                    </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Level</label>
                        {Edit?<input value={CourseLevel} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{CourseLevel}</button>}    
    
                    </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course Duration</label>
                        {Edit?<input value={CourseDuration} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{CourseDuration}</button>}    
    
                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Minimum_Level</label>
                        {Edit?<input value={CourseMinimumLevel} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{CourseMinimumLevel}</button>}    
    
                    </div>
                    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Institute</label>
                        {Edit?<input value={Courseinstitute} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{Courseinstitute}</button>}    
    
                    </div>
     
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Course University</label>
                        {Edit?<input value={CourseUniversity} className='career-update-bnt career-input' type='number'/>:
                        <button  className='career-update-bnt2'>{CourseUniversity}</button>}    
    
                    </div>
 
        
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 01</label>
                            {Edit?<input value={CourseSpecialization01} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseSpecialization01}
                            </button>}
                      </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 02</label>
                            {Edit?<input value={CourseSpecialization02} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseSpecialization02}
                            </button>}
                      </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 03</label>
                            {Edit?<input value={CourseSpecialization03} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseSpecialization03}
                            </button>}
                      </div>
    
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Specialization 04</label>
                            {Edit?<input value={CourseSpecialization04} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseSpecialization04}
                            </button>}
                    </div>

 
                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Title</label>
                            {Edit?<input value={Coursetitle} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {Coursetitle}
                        </button>}

                    </div>

                    <div className='career-update-bnt-container'>
                        
                        <label className='career-update-label'>Fees</label>
                            {Edit?<input value={CourseFees} className='career-update-bnt2 career-input'/>:
                            <button className='career-update-bnt2'>
                                {CourseFees}
                        </button>}

                    </div>     
    
                    </div>
    
                <div className='alevel-update-btn-container career-edit-delete-container'>
                        <div className='career-edit-btn-container'>
                            {Edit?<button  className='career-edit-btn'>Update</button>:
                            <button onClick={handleEditClick}   className='career-edit-btn'>Edit</button>}
                        </div>
                        <div className='ol-delete-container career-delete-container'>
                            <button
                               className='login-btn ol-delete-btn career-delete-btn'
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