import './A-Level-London-Category.css';
import { useContext } from 'react';
import { ALevelContext } from '../../../context/ALevel.context';

const ALevelLondonCategory = ()=>{
    const { goToALevelCategory}=useContext(ALevelContext)
    return(
        <>
          <div className='O-level-box-title-container'>
            <h2 className='O-level-box-title'>Select Advanced Level Stream ftom the foloowing</h2>
        </div>
        <div className='O-level-box'>

           <div className='O-level-btn-container'>

                <button  className='O-level-btn'>Cambridge</button>
                <button  className='O-level-btn'>Pearson</button>

                

            </div>
            <div className='O-level-box-back-btn'>
                    <button onClick={goToALevelCategory} className='nextbtn'>Back</button>
            </div>
            </div>

            </>
    )
}

export default ALevelLondonCategory;