import './Extra-Curricular-Box.styles.css';
import Image from '../Image/Image.components';
import { ExtraCurricularList } from '../../Extra-Curricular-List';

const ExtraCurricularBox=()=>{
    return(
        <div>
            <div className='title-container'>
            <h2 className='extra-curricular-title'>Select the Extra Curricular Activities you have done from the following</h2>
            </div>
            <div className='extra-curricular-container'>
                <div className='extra-curricular-btn-container'>
                {ExtraCurricularList.map(activity=>{
                    return <button className='extra-curricular-btn'>{activity}</button>
                                                   
                })}
                </div>
            </div>

        </div>
    )
}

export default ExtraCurricularBox;