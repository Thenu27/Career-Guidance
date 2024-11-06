import './A-Level-London-Category.css';
import { useContext } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';

const ALevelLondonCategory = ()=>{
    const { goToALevelCategory}=useContext(ALevelContext)
    return(
        <>
           <h2>Select London Category</h2> 
           <div className='O-level-btn-container'>

                <button  className='O-level-btn'>Cambridge</button>
                <button  className='O-level-btn'>Pearson</button>
                <button onClick={ goToALevelCategory} className='backbtn'>Back</button>

            </div>

            </>
    )
}

export default ALevelLondonCategory;