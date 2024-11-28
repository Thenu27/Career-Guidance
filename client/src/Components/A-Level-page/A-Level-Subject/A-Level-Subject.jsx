import './A-Level-Subject.css';
import ALevelMathsLocalSubjects from '../A-Level-Local-CommonSubjects/A-Level-Maths-Subjects';
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext } from 'react';
import ALevelLocalScienceSubject from '../A-Level-Local-Science-Subjects/A-Level-Local-Science-Subject';
import ALevelLocalCommerceSubject from '../A-Level-Local-Commerce/ALevelLocalCommerce';

const ALevelSubject =()=>{

    const {showALevelMathsLocal,showALevelLocalScience,showALevelLocalCommerce} = useContext(ALevelContext);

    const renderComponents=()=>{
        if(showALevelMathsLocal){
            return <ALevelMathsLocalSubjects/>;
        }if(showALevelLocalScience){
            return <ALevelLocalScienceSubject/>
        }if(showALevelLocalCommerce){
            return <ALevelLocalCommerceSubject/>
        }
    }
    return(
        <>
          {renderComponents()}
        </>

    )
}

export default ALevelSubject;