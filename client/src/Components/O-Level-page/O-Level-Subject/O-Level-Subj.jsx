import './O-Level-Subj.css';
import OLevelBasketLocal from '../O-Level-Basket-Local/O-Level-Bakset-Local';
import OLevelMainLocalSubjects from '../O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import { useState,createContext, useContext, useEffect } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';
import axios from 'axios';


const OLevelSubj = ()=>{

    const {showOLevelLocalSubj,showOLevelBasketSubjects} = useContext(OLevelContext);
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
        if(showOLevelLocalSubj){

           return <OLevelMainLocalSubjects OLevelLocalCoreSubj={OLevelLocalCoreSubj} />
        }else if(showOLevelBasketSubjects){
            return <OLevelBasketLocal OLevelBasketSubj={OLevelBasketSubj} />
        }
    }

    return(
        <>
            {renderSubject()}
        </>
    )
}

export default OLevelSubj;