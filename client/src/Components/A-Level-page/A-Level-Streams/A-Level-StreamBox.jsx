import './A-Level-StreamBox.css'
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext } from 'react';

const ALevelStreamBox=()=>{

   const {goToALevelCategory,goToALevelLocalMaths,goToALevelScience,goToALevelLocalCommerce} = useContext(ALevelContext);
    return(
            <>
                <h2 className='A-Level-Stream-title'>A Level Stream</h2>
                <div className='A-Level-Stream-btn-container'>
                    <button onClick={goToALevelLocalMaths} className='A-Level-Stream-btn'>Maths</button>
                    <button onClick={goToALevelScience} className='A-Level-Stream-btn'>Science</button>
                    <button onClick={goToALevelLocalCommerce} className='A-Level-Stream-btn'>Commerce</button>
                </div>   
                <div className='A-level-category-back-btn'>
                <button onClick={goToALevelCategory} className='backbtn A-Level-Stream-backbtn'>Back</button>
                </div>
     
            
            </>
    )
}

export default ALevelStreamBox;