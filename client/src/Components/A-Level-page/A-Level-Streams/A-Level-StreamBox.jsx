import './A-Level-StreamBox.css'
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext } from 'react';

const ALevelStreamBox=()=>{

   const {goToALevelCategory,goToALevelLocalMaths,goToALevelScience,goToALevelLocalCommerce} = useContext(ALevelContext);
    return(
            <>
                <div className='O-level-box-title-container'>
                         <h2 className='O-level-box-title'>Select Advanced Level Stream from the foloowing</h2>
                 </div>
                 <div className='O-level-box'>
                <div className='O-level-btn-container'>
                    <button onClick={goToALevelLocalMaths} className='O-level-btn'>Maths</button>
                    <button onClick={goToALevelScience} className='O-level-btn'>Science</button>
                    <button onClick={goToALevelLocalCommerce} className='O-level-btn'>Commerce</button>
                </div>   
                <div className='O-level-box-back-btn'>
                <button onClick={goToALevelCategory} className='nextbtn'>Back</button>
                </div>
                </div>
     
            
            </>
    )
}

export default ALevelStreamBox;