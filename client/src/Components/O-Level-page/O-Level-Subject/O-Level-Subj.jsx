import './O-Level-Subj.css';
import OLevelMainLocalSubjects from '../O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import { useState,createContext, useContext, useEffect } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';
import axios from 'axios';


const OLevelSubj = ()=>{

    const {showOLevelLocalSubj} = useContext(OLevelContext);
    const [OLevelLocalCoreSubj,setOLevelLocalCoreSubjt] = useState([]);
    const [OLevelBasketSubj,setOLevelBasketSubj] = useState([]);

    const fetchOLevelLocalCoreSubjects=async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/Ordinarylevelpage/local-core');
            setOLevelLocalCoreSubjt(response.data);
        }catch(error){
            console.error("Error Fetching Subjects",error.message)
        }

    }


    const fetchOLevelLocalBasketSubjects=async()=>{
        try{
            const response =await axios.get('http://localhost:3000/api/Ordinarylevelpage/local-Basket');
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