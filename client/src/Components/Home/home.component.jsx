// import Image from '../Image/Image.components';
// import './home.styles.css';
// import { useNavigate } from 'react-router-dom';
// import { useContext, useEffect } from 'react';
// import { ProgressContext } from '../../context/progress.context';
// import { useAuth } from '../../context/Auth.context';

// const Home = () => {
//     // Accessing context values
//     const { setVisitedPages } = useContext(ProgressContext);
//     // Hook for navigation
//     const navigate = useNavigate();
//     const {user,checkAuth} = useAuth()

//     // useEffect to update visited pages when the component mounts
//     useEffect(() => {
//         setVisitedPages((prev) => ({
//             ...prev,
//             home: true,
//             assessment: false,
//             option: false,
//             extraCurricular: false
//         }));  
//     }, []);

//     // Function to navigate to the Assessment page
//     const HandleNavigation = () => {
//         if(!user){
//             navigate('/login')
//         }else{
//             navigate("/Assesment");
//         }
//     };


//     return (
//         <div className="home-container">
//             {/* Frog Image Section */}
//             <div className='home-page-frog'>
//                 <Image />
//             </div>

//             {/* Welcome Title */}
//             <div className='welcome-title'>
//                 <h1>Welcome to Your Personalized Career Journey!<br/>UniversityGuide</h1>
//             </div>
            
//             {/* Introduction Section */}
//             <div className='allp'>
//                 <p className='intro-text'>
//                     Are you ready to unlock your potential and discover the careers that align with your unique abilities?
//                     Our platform is designed to guide you through this exciting process, based on your Multiple Intelligence Profile (MIP).
//                     Here's how we help:
//                 </p>

//                 {/* Steps for career guidance */}
//                 <div className='step-container'>
//                     <div>
//                         <p><b>1. Assess Your Strengths:</b> Start by answering a few insightful questions to reveal your intelligence profile.</p>
//                     </div>
//                     <div>
//                         <p><b>2. Enhance Your Results:</b> Want to improve your initial assessment? You have the option to 
//                             answer more questions for a refined and accurate score.<br/>
//                         </p>
//                     </div>
//                     <div>
//                         <p><b>3. Discover Your Career Match:</b> Based on your customized MIP, we’ll suggest career paths that are aligned with your strengths and passions.</p> 
//                     </div>
                    
//                     {/* Closing text */}
//                     <div className='ending-text'>
//                         <p>
//                             This journey is all about you, so take your time and explore the best career options 
//                             tailored just for you. Let's get started!
//                         </p>
//                     </div>
//                 </div> 
//             </div>

//             {/* Button to start assessment */}
//             <div className='take-quiz-btn'>
//                 <button onClick={HandleNavigation}>Take Assessment</button>
//             </div>
//         </div>
//     );
// };

// export default Home;

// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import './home.styles.css';

// // const Home = () => {
// //   return (
// //     <div className="landing-container">
// //       <div className="landing-content">
// //         <div className="landing-header">
// //           <h1 className="landing-title">Welcome to Your Personalized Career Journey!</h1>
// //           <h2 className="landing-subtitle">UniversityGuide</h2>
// //         </div>
        
// //         <div className="landing-description">
// //           <p className="intro-text">
// //             Are you ready to unlock your potential and discover the careers that align with your unique abilities? 
// //             Our platform is designed to guide you through this exciting process, based on your Multiple Intelligence Profile (MIP). 
// //             Here's how we help:
// //           </p>
          
// //           <div className="steps-container">
// //             <div className="step-card">
// //               <div className="step-number">1</div>
// //               <div className="step-content">
// //                 <h3>Assess Your Strengths</h3>
// //                 <p>Start by answering a few insightful questions to reveal your intelligence profile.</p>
// //               </div>
// //             </div>
            
// //             <div className="step-card">
// //               <div className="step-number">2</div>
// //               <div className="step-content">
// //                 <h3>Enhance Your Results</h3>
// //                 <p>Want to improve your initial assessment? You have the option to answer more questions for a refined and accurate score.</p>
// //               </div>
// //             </div>
            
// //             <div className="step-card">
// //               <div className="step-number">3</div>
// //               <div className="step-content">
// //                 <h3>Discover Your Career Match</h3>
// //                 <p>Based on your customized MIP, we'll suggest career paths that are aligned with your strengths and passions.</p>
// //               </div>
// //             </div>
// //           </div>
          
// //           <p className="conclusion-text">
// //             This journey is all about you, so take your time and explore the best career options tailored just for you. Let's get started!
// //           </p>
          
// //           <div className="cta-container">
// //             <Link to="/Assessment" className="assessment-button">
// //               Take Assessment
// //               <span className="button-arrow">→</span>
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="landing-illustrations">
// //         <div className="illustration-bubble illustration-1">🧠</div>
// //         <div className="illustration-bubble illustration-2">🎨</div>
// //         <div className="illustration-bubble illustration-3">🎵</div>
// //         <div className="illustration-bubble illustration-4">🔬</div>
// //         <div className="illustration-bubble illustration-5">🏆</div>
// //         <div className="illustration-bubble illustration-6">🌍</div>
// //         <div className="illustration-bubble illustration-7">🧩</div>
// //         <div className="illustration-bubble illustration-8">💭</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;

import React from 'react';
import './home.styles.css';
import { useNavigate } from 'react-router-dom';
import booklover from '../../assets/book-lover-33.svg';
import { useAuth } from '../../context/Auth.context';

const Home = () => {

    const navigate =useNavigate()
    const {user} = useAuth()

        const HandleNavigation = () => {
        if(!user){
            navigate('/login')
        }else{
            navigate("/Assesment");
        }
    };

  return (
    <div className="landing-container">
      <div className='landing-page-title-container'>
         <h1 className='landing-page-title'>Welcome to Your Personalized Career Journey!</h1>     
      </div>
      <div className="landing-content">
        <div className='book-img-container'>
          <img className='book-img' src={booklover}/>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className='step-title'>Assess Your Strengths</h3>
            <p className='step-paragraph'>Answer insightful questions to reveal your Multiple Intelligence Profile (MIP).</p>
          </div>
          
          {/* <div className="step">
            <div className="step-number">2</div>
            <h3 className='step-title'>Enhance Your Results</h3>
            <p className='step-paragraph'>Dive deeper with additional questions for a more refined and accurate assessment.</p>
          </div> */}
          
          <div className="step">
            <div className="step-number">2</div>
            <h3 className='step-title'>Discover Your Career Match</h3>
            <p className='step-paragraph'>Explore career paths perfectly aligned with your unique strengths and passions.</p>
          </div>
        </div>
        
        
        
        {/* <p className="disclaimer">This journey is all about you. Take your time and explore.</p> */}
      </div>
      <button onClick={()=>{HandleNavigation()}} className="start-journey-btn">Start Your Journey</button>

    </div>
  );
};

export default Home;