import './O-Level-Subj.css';
import OLevelMainLocalSubjects from '../O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import { useState,useEffect } from 'react';
import axios from 'axios';


const OLevelSubj = ()=>{

    const [OLevelLocalCoreSubj,setOLevelLocalCoreSubjt] = useState([]);
    const [OLevelBasketSubj,setOLevelBasketSubj] = useState([]);

    const fetchOLevelLocalCoreSubjects=async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/Ordinarylevelpage/local-core`);
            setOLevelLocalCoreSubjt(response.data);
        }catch(error){
            console.error("Error Fetching Subjects",error.message)
        }

    }


    const fetchOLevelLocalBasketSubjects=async()=>{
        try{
            const response =await axios.get(`${process.env.REACT_APP_URL}/api/Ordinarylevelpage/local-Basket`);
            setOLevelBasketSubj(response.data);
        }catch(error){
            console.error("Error Fetching Subjects",error.message)

        }
    }



    useEffect(() => {
        const fetchData = async () => {
            await fetchOLevelLocalCoreSubjects();
            await fetchOLevelLocalBasketSubjects();
        };
    
        fetchData(); // Call the async function
    }, []);

    useEffect(()=>{
        console.log("thenu",OLevelBasketSubj)

    },[OLevelBasketSubj])

    const renderSubject=()=>{

           return <OLevelMainLocalSubjects OLevelBasketSubj={OLevelBasketSubj} OLevelLocalCoreSubj={OLevelLocalCoreSubj} />
        
    }

    return(
        <>
            {renderSubject()}
        </>
    )
}

export default OLevelSubj;