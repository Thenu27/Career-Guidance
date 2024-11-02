import './CareerFieldPage.css';
import CareerFieldBox from './Career-Field-Box/CareerFieldBox';
import Image from '../Image/Image.components';
import CareerDropdownContainer from './Career-Dropdown-Container/CareerDropdown';
import { useState } from 'react';
import ProfileMatchBox from '../Profile-Match/ProfileMatchBox';

const CareerFieldPage=()=>{
    
    const [showCareerFieldBox,setshowCareerFieldBox] = useState(true);
    const [showCareerDropdown,setShowCareerDropdown]= useState(false);
    const [showMatchedProfileMsg,setshowMatchedProfileMsg] =useState(false)

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