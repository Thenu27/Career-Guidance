import './CareerFieldPage.css';
import CareerFieldBox from './Career-Field-Box/CareerFieldBox';
import Image from '../Image/Image.components';
import CareerDropdownContainer from './Career-Dropdown-Container/CareerDropdown';
import { useEffect,useContext } from 'react';
import ProfileMatchBox from '../Profile-Match/ProfileMatchBox';
import { ProgressContext } from '../../context/progress.context';
import { CareerContext } from '../../context/Career.context';

const CareerFieldPage=()=>{
    
    const {showCareerFieldBox,showCareerDropdown,showMatchedProfileMsg} = useContext(CareerContext);

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
            return  <CareerFieldBox/>
        }else if(showCareerDropdown){
           return <CareerDropdownContainer/>
        }else if(showMatchedProfileMsg){
            return <ProfileMatchBox/>
        }
    }
    return(
        <div className='career-Field-Page'>
            <div className='career-page-frog'>
                <Image/>

            </div>
            <div className='frog-comment-career-field-page'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia sit quidem maxime corrupti officia eaque tempore nihil quam? Ipsum tenetur, sunt doloremque labore itaque ducimus dolor. Reprehenderit, temporibus cupiditate!</p>                
                
            </div>
            {BoxRender()}


        </div>

        
    )
}

export default CareerFieldPage;