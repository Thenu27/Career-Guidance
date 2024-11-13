import Image from '../Image/Image.components';
import './home.styles.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProgressContext } from '../../context/progress.context';
import { useEffect } from 'react';
import Assesment from '../Assesment/Assesment.components';

const Home = () =>{

    const {visitedPages,setVisitedPages} = useContext(ProgressContext)
    const navigate = useNavigate();

    useEffect(()=>{
        setVisitedPages((prev)=>({
            ...prev,
            home:true,
            assessment:false,
            option:false,
            extraCurricular:false
       }));  

    },[])

    const HandleNavigation = ()=>{
    navigate("/Assesment")
     }

    return(
        <div className="home-container">
            <Image/>
            <div className="home-content">
            <h1> Welcome to Your Personalized Career Journey!<br/>UniversityGuide</h1>
      
                <div className='allp'>
                    
                    <p >Are you ready to unlock your potential and discover the careers that align with your unique abilities? Our platform is designed to guide you
                        through this exciting process, based on your Multiple Intelligence Profile (MIP). Here's how we help:</p>
                       <div className='steps'>
                            <div className='step-1'>
                                <p><b>1.Assess Your Strengths:</b> Start by answering a few insightful questions to reveal your intelligence profile.</p>
                            </div>
                            <div className='step-1'>
                                <p><b>2.Enhance Your Results:</b> Want to improve your initial assessment? You have the option to 
                                    answer more questions for a refined and accurate score.<br/></p>
                            </div>
                            <div className='step-1'>
                                <p><b>3.Discover Your Career Match:</b> Based on your customized MIP, we’ll suggest career paths that are aligned with your strengths and passions.</p> 
                            </div>
                        </div> 
                    <p className='last-p'> This journey is all about you, so take your time and explore the best career options 
                        tailored just for you. Let's get started</p>
                </div>
                <div className='btn_TakeQuiz'>
                  <button  onClick={HandleNavigation} >Take the Quiz</button>
                </div>
        </div>
        </div>
    )
}

export default Home;