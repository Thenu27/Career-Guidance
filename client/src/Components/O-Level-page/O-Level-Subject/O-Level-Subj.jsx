import './O-Level-Subj.css';
import OLevelBasketLocal from '../O-Level-Basket-Local/O-Level-Bakset-Local';
import OLevelMainLocalSubjects from '../O-Level-Local-Main-Subjects/O-Level-Local-MainSubjects';
import { useState,createContext, useContext } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';


const OLevelSubj = ()=>{

    const {showOLevelLocalSubj,showOLevelBasketSubjects} = useContext(OLevelContext);

    const renderSubject=()=>{
        if(showOLevelLocalSubj){
            return <OLevelMainLocalSubjects  />
        }else if(showOLevelBasketSubjects){
            return <OLevelBasketLocal />
        }
    }

    return(
        <div className='O-level-subject-component'>
            {renderSubject()}
        </div>
    )
}

export default OLevelSubj;