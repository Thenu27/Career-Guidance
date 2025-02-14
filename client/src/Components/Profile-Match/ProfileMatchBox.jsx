import './ProfileMatchBox.css';

// Importing necessary dependencies
import { useNavigate } from 'react-router-dom';

const ProfileMatchBox = () => {
    // Hook for navigation
    const navigate = useNavigate();

    // Function to navigate to the Careers page
    const careerBtnHandler = () => {
        navigate("/Careers");
    };
    
    return (
        <>  
            {/* Title Section */}
            <div className='career-field-box-title-container'>
                <h2>We've Found Careers That Match Your Profile!</h2>
            </div>

            {/* Career Information Box */}
            <div className='career-field-box-container'>
                <div className='career-btn-container'>
                    <p>
                        Based on your Multiple Intelligence Profile (MIP) Score, we’ve identified careers that are a great fit for your unique skills and strengths.
                        To see your personalized career recommendations, simply click the button below.
                        Each career has been carefully matched to align with your potential, offering you opportunities where you can excel and grow.
                    </p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className='career-fieldBox-navigation'>
                <button className='nextbtn'>Back</button> {/* No function assigned to Back button yet */}
                <button className='nextbtn carrer-matches-btn' onClick={careerBtnHandler}>
                    See My Career Matches
                </button>
            </div>
        </>    
    );
};

export default ProfileMatchBox;
