import './Extra-Curricular-page.css';
import ExtraCurricularBox from '../Extra-Curricular-Box/Extra-Curricular-Box.components';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import { ProgressContext } from '../../context/progress.context';

 const ExtraCurricularPage = () =>{

   const {visitedPages,setVisitedPages} = useContext(ProgressContext)

   useEffect(()=>{

      setVisitedPages((prev)=>({
          ...prev,
          extraCurricular:true,
          option:true,
          home:true,
          assessment:true
          

      }))
  },[])
    const navigate =useNavigate();
    const skipbtnHandler=()=>{
       navigate("/Ordinarylevelpage");
    }
    return(
        <>
        <div className='extra-curricular-image'>
            <ExtraCurricularBox/>
            <Image/>
            
            </div>   
            <div className='extra-curricular-back-next-btn'>
                <button className='backbtn'>Back</button>
                <button onClick={skipbtnHandler} className='nextbtn'>Skip</button>
            </div>
         </>
        
    )
 }

 export default ExtraCurricularPage;