import './Assesment.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';
import UserInformation from '../user-information-box/user-infor.components';
import Image from '../Image/Image.components';
import { useContext,useEffect, } from 'react';
import { ProgressContext } from '../../context/progress.context';
 const Assesment = ()=>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext)

    useEffect(()=>{
        setVisitedPages((prev)=>({
            ...prev,
            assessment:true,
            option:false,
            extraCurricular:false
            

        }))
    },[])

    return(
        <div className="question-user-container">
            <Image/>
            <QuestionContainer/>
            <UserInformation/>
            

        </div>
    )
 }

 export default Assesment;