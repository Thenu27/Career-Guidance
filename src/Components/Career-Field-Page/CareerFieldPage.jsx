import './CareerFieldPage.css';
import CareerFieldBox from './Career-Field-Box/CareerFieldBox';
import Image from '../Image/Image.components';
import CareerDropdownContainer from './Career-Dropdown-Container/CareerDropdown';
const CareerFieldPage=({showCareerDropdown})=>{
    return(
        <div className='Career-Field-Page'>
            <Image/>
            <div className='frog-comment-career-field-page'>

            </div>
            {showCareerDropdown? <CareerDropdownContainer/> : <CareerFieldBox />}
           
            

        </div>
    )
}

export default CareerFieldPage;