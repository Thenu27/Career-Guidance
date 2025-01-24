import './OLevelEdit.css';
import { useContext ,useEffect} from 'react';
import { OLevelContext } from '../../../Context/OLevel.context';

const OLevelEdit =()=>{

    const {OLevelIndex,OLevelCoreLocal} = useContext(OLevelContext)

    const IdentifyIntelligence = (value) => {
        switch (value) {
            case 1:
                return 'Logical-Mathematical';
            case 2:
                return 'Linguistic';
            case 3:
                return 'Spatial';
            case 4:
                return 'Musical';
            case 5:
                return 'Bodily-Kinesthetic';
            case 6:
                return 'Interpersonal';
            case 7:
                return 'Intrapersonal';
            case 8:
                return 'Naturalistic';
            case 9:
                return 'Existential';
            default:
                return 'Unknown';
        }
    };

    return(
        <div>
            <h1 className='welcome-title olevel-title '>Update OLevel Subject</h1>
            <div className='update-container'>

                <div className='update-intlligence-container'>
                    
                    <button className='intelligence-btn'>{IdentifyIntelligence(OLevelCoreLocal[OLevelIndex].mi_1)}</button>
                </div>

                <div className='update-intlligence-container'>
                <button className='intelligence-btn'>{ IdentifyIntelligence(OLevelCoreLocal[OLevelIndex].mi_2)}</button>

                </div>

                <div className='update-intlligence-container'>
                <button className='intelligence-btn'>{ IdentifyIntelligence(OLevelCoreLocal[OLevelIndex].mi_3)}</button>

                </div>
            </div>
        </div>
    )
}

export default OLevelEdit