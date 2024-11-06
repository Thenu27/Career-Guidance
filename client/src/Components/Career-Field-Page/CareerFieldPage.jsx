import './CareerFieldPage.css';
import CareerFieldBox from './Career-Field-Box/CareerFieldBox';
import Image from '../Image/Image.components';
import CareerDropdownContainer from './Career-Dropdown-Container/CareerDropdown';
import { useEffect, useState,useContext } from 'react';
import ProfileMatchBox from '../Profile-Match/ProfileMatchBox';
import { ProgressContext } from '../../context/progress.context';

const CareerFieldPage=()=>{
    
    const [showCareerFieldBox,setshowCareerFieldBox] = useState(true);
    const [showCareerDropdown,setShowCareerDropdown]= useState(false);
    const [showMatchedProfileMsg,setshowMatchedProfileMsg] =useState(false);

    const {setVisitedPages} = useContext(ProgressContext)

    useEffect(() => {
        setVisitedPages(() => ({
            home: true,
            assessment: true,
            option:true,
            extraCurricular:true,
            OLevelPage:true,
            ALevelPage:true,
            CalculatingPage:true,
            IntelligencePage:true,
            CareerFieldPage:true,
            CareersPage:false   
        }));
    }, []); 
    

    const BoxRender=() =>{
        if(showCareerFieldBox){
            return  <CareerFieldBox setshowCareerFieldBox={setshowCareerFieldBox} setShowCareerDropdown={setShowCareerDropdown}  setshowMatchedProfileMsg={setshowMatchedProfileMsg}/>
        }else if(showCareerDropdown){
           return <CareerDropdownContainer setShowCareerDropdown={setShowCareerDropdown} setshowMatchedProfileMsg={setshowMatchedProfileMsg}/>
        }else if(showMatchedProfileMsg){
            return <ProfileMatchBox/>
        }
    }
    return(
        <div className='Career-Field-Page'>
            <Image/>
            <div className='frog-comment-career-field-page'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia sit quidem maxime corrupti officia eaque tempore nihil quam? Ipsum tenetur, sunt doloremque labore itaque ducimus dolor. Reprehenderit, temporibus cupiditate!</p>                
                
            </div>
            <div>
            {BoxRender()}
            </div>


        </div>

        
    )
}

export default CareerFieldPage;