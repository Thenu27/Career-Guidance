import Image from '../Image/Image.components';
import './home.styles.css';
import { useNavigate } from 'react-router-dom';


const Home = () =>{
    const navigate = useNavigate();

    const HandleNavigation = ()=>{
    navigate("/Assesment")
     }

    return(
        <div className="home-container">
            <Image/>
            <div className="home-content">
            <h1>Welcome to the Career <br/>Guidance Platform</h1>
      
                <div className='allp'>
                    <p >Discover careers that match your abilities through the Multiple Intelligence Profile (MIP).<br/> Here's how it works:</p>
                       <div className='steps'>
                        
                            <b>1.Answer Questions:</b> Start by answering a few questions to assess your intelligence.<br/>
                            <b>2.Optional Improvement:</b> You can answer additional questions to refine your score.<br/>
                            <b>3.Career Suggestions:</b> Based on your MIP score, we'll recommend suitable careers.<br/>
                        </div> 
                    <p> Take your time for the best results. Let’s begin your career journey!</p>
                </div>

            <button className='btn_TakeQuiz' onClick={HandleNavigation} >Take the Quiz</button>
        </div>
        </div>
    )
}

export default Home;