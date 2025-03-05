import { useEffect, useState } from 'react';
import './OLevelSubjects.css';
import axios from 'axios';
import { useContext } from 'react';
import { OLevelContext } from '../../../Context/OLevel.context';
import { useNavigate } from 'react-router-dom';

const OLevelSubject = ()=>{

    const {OLevelLocalSubj,
        setOLevelLocalSubj,
        setOLevelIndex,
        OLevelIndex,
        OLevelCoreLocal,
        setOLevelCoreLocal,
        ShowlocalCoreOL,
        setShowlocalCoreOL,
        setOLevelBasketLocal,
        OLevelBasketLocal

    } = useContext(OLevelContext);

    const navigate=useNavigate();

    const fetchlocalSubjectsCore=async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/admin/olevel/subjects`);
            console.log(response.data);
            setOLevelLocalSubj(response.data);
        }catch(error){
            console.log("Error Fetching Data from Database",error)
        }

        }
     
        const divideSubjects=()=>{
            const localCore = OLevelLocalSubj.filter((value)=>value.pathline ==='Core')
            setOLevelCoreLocal(localCore);

            const localBasket = OLevelLocalSubj.filter((value)=>value.pathline ==='Basket');
            setOLevelBasketLocal(localBasket);
        }

        const ShowSubjects=()=>{
            if(ShowlocalCoreOL){
                return OLevelCoreLocal
            }else{
                return OLevelBasketLocal
            }
        }

 
    useEffect(()=>{
        fetchlocalSubjectsCore();

    },[])

    useEffect(() => {
        divideSubjects();
    }, [OLevelLocalSubj]);

    useEffect(()=>{
        console.log('OLevelCoreLocal',OLevelCoreLocal)
        console.log('OLevelBasketLocal',OLevelBasketLocal)

    },[OLevelCoreLocal])

    useEffect(()=>{
        console.log("OLevelSubject",OLevelLocalSubj)
    },[OLevelLocalSubj])

    const toggle=()=>{
        if(ShowlocalCoreOL===true){
            setShowlocalCoreOL(false)
        }else{
            setShowlocalCoreOL(true)
        }
    }

    const goToUpdatePage=()=>{
        navigate('/ordinarylevel/update')
    }

    const SelectedButton=(value)=>{
        setOLevelIndex(value)
    }

    useEffect(()=>{
        console.log("OLevelIndex",OLevelIndex)
    },[OLevelIndex])

    const goToAddpage=()=>{
        navigate('/ordinarylevel/add')
    }

    return(
        <>


       


        <div className=' login-container subject-container ol-subject-container'>
        <div className='ol-header'>
            <h1 className='welcome-title olevel-title '>O/Level Subjects</h1>

        </div>
            <div className='subject-inner-container'>
                {ShowSubjects().map((subj,index)=>{
                    return<button onClick={()=>{goToUpdatePage();SelectedButton(index);}} className='subject' key={index}>{subj.subjects}</button>
                })}
            </div>
            <div className='add-ol-subject-container'>
                <div>
                    <button onClick={goToAddpage} className=' login-btn add-ol-subject-btn'> Add subject</button>
                </div>

                <div onClick={toggle} >
                  <button className='login-btn switch-btn'>{ShowlocalCoreOL?'Switch to Basket subjects':'Switch to Core subjects'}</button>
                 </div>

            </div>

        </div> 
        </>
    )
}

export default OLevelSubject