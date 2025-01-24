import { useEffect, useState } from 'react';
import './OLevelSubjects.css';
import axios from 'axios';
import { useContext } from 'react';
import { OLevelContext } from '../../../Context/OLevel.context';
import { useNavigate } from 'react-router-dom';

const OLevelSubject = ()=>{

    const {OLevelLocalSubj,setOLevelLocalSubj,setOLevelIndex,OLevelIndex,OLevelCoreLocal,setOLevelCoreLocal} = useContext(OLevelContext);
    const [OLevelBasketLocal,setOLevelBasketLocal] = useState([]);
    const [ShowlocalCoreOL,setShowlocalCoreOL] = useState(true);

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

    return(
        <>
            <p className='welcome-title olevel-title '>This is the olevel subjects</p>
            <div onClick={toggle} className='switch-container'>
            <button className='login-btn switch-btn'>{ShowlocalCoreOL?'Switch to Basket subjects':'Switch to Core subjects'}</button>

            </div>
       


        <div className='subject-container'>
            <div className='subject-inner-container'>
                {ShowSubjects().map((subj,index)=>{
                    return<button onClick={()=>{goToUpdatePage();SelectedButton(index);}} className='subject' key={index}>{subj.subjects}</button>
                })}
            </div>

        </div> 
        </>
    )
}

export default OLevelSubject