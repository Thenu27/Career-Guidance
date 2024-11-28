import './Extra-Curricular-page.css';
import ExtraCurricularBox from '../Extra-Curricular-Box/Extra-Curricular-Box.components';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { ProgressContext } from '../../context/progress.context';
import axios from 'axios';


 const ExtraCurricularPage = () =>{

   const {setVisitedPages} = useContext(ProgressContext);
   const[SelectedExtraActivities,setSelectedExtraActivities] = useState([]);


   useEffect(()=>{

      setVisitedPages(()=>({
        home: true,
        assessment: true,
        option:true,
        extraCurricular:true,
        OLevelPage:false,
        ALevelPage:false,
        CalculatingPage:false,
        IntelligencePage:false,
        CareerFieldPage:false,
        CareersPage:false

      }))
  },[])
    const navigate =useNavigate();



    const skipbtnHandler=()=>{
       navigate("/Ordinarylevelpage");
    }



    const sendToBackend=async()=>{
      try{
          const response = await axios.post('http://localhost:3000/api/ExtraCurricular',{
          SelectedExtraActivities
      }
  )
  if(response.status===200){
      console.log("Actvities Sent Succesfully")
  }else{
      console.log("Actvities Not Sent Succesfully")

  }
  }catch(error){
      console.log(error,"Error sending Extra Curricular activites to backend")
  }
      
  }




    return(
        <div className='extra-curricular-page'>

            <div className='extra-curricular-image'>
               <Image/>           
              </div>   

            <div className='extra-curricular-title-container'>
                <h2 className='extra-curricular-title'>Select the Extra Curricular Activities you have done from the following</h2>
            </div>
              <ExtraCurricularBox SelectedExtraActivities={SelectedExtraActivities} setSelectedExtraActivities={setSelectedExtraActivities} />
              

              <div className='extra-curricular-back-next-btn'>
                  <button className='nextbtn'>Back</button>
                  <button onClick={()=>{sendToBackend();skipbtnHandler()}} className='nextbtn'>Skip</button>
              </div>
              
         </div>
        
    )
 }

 export default ExtraCurricularPage;