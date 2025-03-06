import './ALevelSubjects.css';
import { ALevelContext } from '../../../Context/ALevel.context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ALevelSubjects =()=>{
    const navigate = useNavigate();

    const goToALUpdate=()=>{
      navigate('/admin/advancedlevel/update')
    }

    const {SelectedSubject,setSelectedSubject} = useContext(ALevelContext);

    const { ALevelLocalSubjects,
            ShowArts,
            ShowPhysicalScience,
            ShowCommerce,
            ShowTechnology,
            ShowBioScience
    } = useContext(ALevelContext);

    const ShowSubjects = () => {
        if (ShowPhysicalScience) {
          return ALevelLocalSubjects.filter(item => item.stream === 'Physical Science');
        }
        if (ShowBioScience) {
          return ALevelLocalSubjects.filter(item => item.stream === 'BIO Science');
        }
        if (ShowArts) {
          return ALevelLocalSubjects.filter(item => item.stream === 'Arts');
        }
        if (ShowCommerce) {
          return ALevelLocalSubjects.filter(item => item.stream === 'Commerce');
        }
        if (ShowTechnology) {
          return ALevelLocalSubjects.filter(item => item.stream === 'Technology');
        }
        return []; // Fall Back 
      };    

    const goToAddPage=()=>{
        navigate('/admin/advancedlevel/add')
    }

    const handleSubjectClick=(subject_id)=>{
      setSelectedSubject(subject_id);
    }

      

    useEffect(()=>{
        console.log("ALevelLocalSubjects",ALevelLocalSubjects)
    },[])

    return(
        <>
 
        <div className='login-container subject-container ol-subject-container'>
        <div className='ol-header al-header'>
            <p className='welcome-title olevel-title '>This is the Alevel subjects</p>
                {/* <div  className='switch-container'>
                  <button className='login-btn switch-btn'></button>

                </div> */}
        </div>
            <div className='subject-inner-container al-subject-inner-container'>
                {ShowSubjects().map((subj,index)=>{
                    return<button onClick={()=>{goToALUpdate(); handleSubjectClick(subj.subject_id)}} className='subject' key={index}>{subj.subject}</button>
                })}
            </div>
            <div className='add-ol-subject-container'>
                <button onClick={goToAddPage} className=' login-btn add-ol-subject-btn'> Add subject</button>
            </div>

        </div> 
        </>
    )
}

export default ALevelSubjects