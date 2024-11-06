import './A-Level-StreamBox.css'
import { ALevelContext } from '../../../context/ALevel.context';
import { useContext } from 'react';

const ALevelStreamBox=()=>{

   const {goToALevelCategory} = useContext(ALevelContext);
    return(
            <>
                <h2 className='A-Level-Stream-title'>A Level Stream</h2>
                <div className='A-Level-Stream-btn-container'>
                    <button  className='A-Level-Stream-btn'>Maths</button>
                    <button className='A-Level-Stream-btn'>Science</button>
                    <button className='A-Level-Stream-btn'>Commerce</button>
                </div>   
        
                <button onClick={goToALevelCategory} className='backbtn A-Level-Stream-backbtn'>Back</button>
     
            
            </>
    )
}

export default ALevelStreamBox;