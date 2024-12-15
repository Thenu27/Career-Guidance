import './Extra-Curricular-page.css';
import ExtraCurricularBox from './Extra-Curricular-Box/Extra-Curricular-Box.components';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { ProgressContext } from '../../context/progress.context';
import axios from 'axios';
import ExtraCurricularResults from './Extra-Curricular-results/Extra-Curricular-Results';


 const ExtraCurricularPage = () =>{

   const {setVisitedPages} = useContext(ProgressContext);
   const[SelectedExtraActivities,setSelectedExtraActivities] = useState([]);
   const [showExtraLevelsPage,setshowExtraLevelsPage] = useState(false)


 
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

    const goToECListPage=()=>{
      setshowExtraLevelsPage(false);
  }

    const goToOLPage=()=>{
       navigate("/Ordinarylevelpage");
    }

    const goToExtraLevelsPage = ()=>{
      setshowExtraLevelsPage(true);
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

  const renderBox=()=>{
    if(showExtraLevelsPage===false){
      return <ExtraCurricularBox  setshowExtraLevelsPage={setshowExtraLevelsPage} showExtraLevelsPage={showExtraLevelsPage} SelectedExtraActivities={SelectedExtraActivities} setSelectedExtraActivities={setSelectedExtraActivities} />

    }
    else if(showExtraLevelsPage===true){
      return <ExtraCurricularResults SelectedExtraActivities={SelectedExtraActivities}/>
    }
  }



    return(
        <div className='extra-curricular-page'>

            <div className='extra-curricular-image'>
               <Image/>           
              </div>   

              {renderBox()};
              

              <div className='extra-curricular-back-next-btn'>
                  <button onClick={()=>{goToECListPage()}} className='nextbtn'>Back</button>
                  {SelectedExtraActivities.length>0?
                  <button onClick={()=>{sendToBackend();{showExtraLevelsPage?goToOLPage():goToExtraLevelsPage()}}} className='nextbtn'>Next</button>
                  :<button onClick={()=>{sendToBackend();goToOLPage()}} className='nextbtn'>Skip</button>
                  }
 
              </div>
              
         </div>
        
    )
 }

 export default ExtraCurricularPage;