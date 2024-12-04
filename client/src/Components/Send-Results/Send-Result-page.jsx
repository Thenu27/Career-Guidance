import './Send-Results-page.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';
const SendResultToEmail = ()=>{

    const navigate = useNavigate();
    const goToCareerPage=()=>{
        navigate("/Careers")
    }

    return(
        <div className='send-results-page'>
            <div className='career-field-box-title-container send-title'>
                  <h2 className='career-field-box-title'>Fill the following details So We can send the Results to You</h2> 
            </div>
            <div className='career-page-frog send-image'>
                <Image/>

            </div>
            <div className='details-container'>
                <form className='details-form'>
                    <div className='input'>
                        <label  className='label' for="first-name">First Name</label>
                        <input className='input-box' required  type='text' id="first-name" /><br/>
                    </div>

                    <div className='input'>
                        <label className='label' for="last-name">Last Name</label>
                        <input required className='input-box' type='text' id="last-name" /><br/>
                    </div>

                    <div className='input'>
                        <label className='label' for="email">Email</label>
                        <input required className='input-box' id="email" type='email' /><br/>
                    </div>
                
                </form>
            </div>   
            
            <div className='career-fieldBox-navigation send-page-navigation'>
                        <button onClick={goToCareerPage} className='nextbtn '>Back</button>
                        <button className='nextbtn '>Send Results</button>
            </div>         
            
            
        </div>
    )
}

export default SendResultToEmail