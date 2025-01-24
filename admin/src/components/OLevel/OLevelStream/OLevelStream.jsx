import { useEffect,useContext} from 'react';
import './OLevelStream.css';
import { useNavigate } from 'react-router-dom';
import { OLevelContext } from '../../../Context/OLevel.context';


const OLevelStream=()=>{
    const {ShowOLStream,setShowOLStream} = useContext(OLevelContext)
    const navigate = useNavigate();

    const goToSelectOptionPage=()=>{
        navigate('/option');
    }

    useEffect(()=>{
        setShowOLStream(true);    
    },[])
        return(
        <div> 
            <h1 className='stream-title'>Select Category</h1>
            <div className='options-container stream-container'>
                    <button  className='login-btn'>Local</button>
                    <button className='login-btn'> London</button>

            </div>
        </div>
    )
}

export default OLevelStream;