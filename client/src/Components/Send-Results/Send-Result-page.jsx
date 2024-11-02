import './Send-Results-page.css';
import Image from '../Image/Image.components';

const SendResultToEmail = ()=>{
    return(
        <div className='send-results-page'>
            <div className='details-container'>
                <form className='details-form'>
                    <label for="first-name">First Name</label>
                    <input required className='input-box' type='text' id="first-name" /><br/>

                    <label for="last-name">Last Name</label>
                    <input required className='input-box' type='text' id="last-name" /><br/>

                    <label for="email">Email</label>
                    <input required className='input-box' id="email" type='email' /><br/>

                    <input  className='input-box' type='submit' value="Submit"/>



                </form>
            </div>

            <div className='send-results-page-frog-comment'>

            </div>

            <div className="send-results-page-frog">               
                <Image />
            </div>
            
            
            
        </div>
    )
}

export default SendResultToEmail