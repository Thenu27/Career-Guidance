import './ProfileMatchBox.css';
import { useNavigate } from 'react-router-dom';

const ProfileMatchBox=()=>{
    const navigate = useNavigate();
 const careerBtnHandler=()=>{
    
    navigate("/Careers")
 }
    
    return(
        <>  
        <div className='career-field-box-title-container'>
              <h2 >We've Found Careers That Match Your Profile!</h2>
        </div>
            <div className='career-field-box-container'>
                 <div className='career-btn-container '>

                <p>Based on your Multiple Intelligence Profile (MIP) Score, we’ve identified careers that are a great fit for your unique skills and strengths. To see your personalized career recommendations, 
    Simply click the button below.
    Each career has been carefully matched to align with your potential, offering you opportunities where you can excel and grow.</p>
            </div>
            </div>
            <div className='career-fieldBox-navigation'>
                    <button   className='nextbtn '>Back</button>
                    <button className='nextbtn carrer-matches-btn' onClick={careerBtnHandler}>See My Career Matches</button>
                    </div>

            </>    
    )
}

export default ProfileMatchBox;