import './CareerPage.css';
import Image from '../Image/Image.components';
import { useNavigate } from 'react-router-dom';

const CareerPage=()=>{

    const navigate = useNavigate();

    const sendResultsHandler=()=>{
        navigate("/SendResults")
    }

    const careerOpenBtnHandler=()=>{
        window.open("http://localhost:3000/","_blank")
    }

    return(
        <div className='Carrer-page'>

            <div className='career-side-description'>
                    <p>Congratulations! Based on your Multiple Intelligence Profile (MIP) Score,</p> we have curated a list of careers that best align with your strengths and abilities. 
                    <p>   These careers offer you the opportunity to pursue a path where you can thrive and grow.</p>

                    <button onClick={sendResultsHandler}>Send Results to Email</button>
            </div>
            <div className='career-box-container'>

                <div className='career-box'>
                    <h2>Top Career</h2>
                    <button onClick={careerOpenBtnHandler}>Career 1</button>
                    <button>Career 2</button>
                    <button>Career 3</button>
                </div>
                <div className='career-box'>
                    <h2>Moderate Career</h2>
                    <button>Career 1</button>
                    <button>Career 2</button>
                    <button>Career 3</button>
                </div>
                <div className='career-box'>
                    <h2>Satisfactory Career</h2>
                    <button>Career 1</button>
                    <button>Career 2</button>
                    <button>Career 3</button>
                </div>
                <div className='career-page-back-next-btn'>
                <button className='backbtn'>Back</button>
                <button className='nextbtn'>Home</button>
                </div>
                               
            </div>
            <div className='career-page-frog'>
                <div className='career-page-frog-comment'>
                    <p>This is the forgs comment</p>
                </div>
                <Image/>
            </div>

        </div>
    )
}

export default CareerPage;