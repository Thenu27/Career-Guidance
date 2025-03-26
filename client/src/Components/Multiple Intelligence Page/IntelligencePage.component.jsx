// import './Intelligence.styles.css';

// // Importing necessary dependencies
// import Image from '../Image/Image.components';
// import { useNavigate } from 'react-router-dom';
// import { ProgressContext } from '../../context/progress.context';
// import { useEffect, useContext} from 'react';

// const IntelligencePage = () => {
//     // Accessing context values
//     const { setVisitedPages,intelligenceObject } = useContext(ProgressContext);

//     // useEffect to update visited pages when the component mounts
//     useEffect(() => {
//         setVisitedPages(() => ({
//             OLevelPage: true,
//             ALevelPage: true,
//             extraCurricular: true,
//             option: true,
//             home: true,
//             assessment: true,
//             CalculatingPage: true,
//             IntelligencePage: true,
//         }));
//         // console.log('Newly updated', intelligenceScore); // Log intelligence scores for debugging
//     }, []);

//     const IdentifyIntelligence = (value) => {
//         switch (value) {
//             case 1: return 'Logical-Mathematical';
//             case 2: return 'Linguistic';
//             case 3: return 'Spatial';
//             case 4: return 'Musical';
//             case 5: return 'Bodily-Kinesthetic';
//             case 6: return 'Interpersonal';
//             case 7: return 'Intrapersonal';
//             case 8: return 'Naturalistic';
//             case 9: return 'Existential';
//             default: return 'Unknown';
//         }
//     };
//     // Hook for navigation
//     const navigate = useNavigate();

//     // Function to navigate to A-Level Page
//     const goToAlevelPage = () => {
//         navigate("/Advancelevelpage");
//     };

//     // Function to navigate to Career Selection Page
//     const careerSelectionBtnHandler = () => {
//         navigate("/Careers");
//     };

   
//     return (
//         <div className='intelligence-page-container'>
//                         {/* Page Title */}
//             <div className='intelligence-title-container'>
//                 <h2 className='intelligence-page-title'>Here is Your MIP Score generated from your answers</h2>
//             </div>

//             {/* Intelligence Scores Display */}
//             <div className='intelligence-box-container'>

//                 <div className='intelligence-btns-container'>
//                     {intelligenceObject.map(intelligence => {
//                         return (
//                         <div className='intelligence-btn tooltip' key={intelligence}>
//                             <div className='intelligence'>
//                                 {`${IdentifyIntelligence(Number(intelligence[0]))} is ${intelligence[1].intelligence_percentage.toFixed(0)}%`}
//                             </div>
//                             <div className='tooltip-container'>
//                                 <span className='tooltiptext'>Information about Intelligence</span> 
//                             </div>
//                         </div>
//                         );
//                     })}
//                 </div>


                
//             </div>

//             {/* Page Description */}
//             <div className='intelligence-page-description'>
//                 <p>
//                     Here is your Multiple Intelligence Profile (MIP) Score, 
//                     which reflects your strengths across various intelligence areas. 
//                     This score helps us understand which skills and abilities stand out in your profile, 
//                     allowing us to provide career recommendations that align with your talents.
//                 </p>

//                 {/* Button for Career Selection */}
//                 <h2>Click the above button to answer questions so we can give career guidance</h2>
//             </div>

//             {/* Navigation Buttons */}
//             <div className='intelligence-page-navigation'>
//                 <button onClick={goToAlevelPage} className='nextbtn'>Back</button>
//                 <button className='nextbtn' onClick={careerSelectionBtnHandler}>Career Selection</button>
//             </div>
//         </div>
//     );
// };

// export default IntelligencePage;

import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ProgressContext } from '../../context/progress.context';
import './Intelligence.styles.css';
import mipimg from '../../assets/Mip.svg';
import Spinner from '../Spinner/Spinner';

const IntelligencePage = () => {
    // const { setVisitedPages} = useContext(ProgressContext);
    const navigate = useNavigate();

    const [mipScore,setMipScore] = useState([]);
    const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     setVisitedPages(() => ({
    //         OLevelPage: true,
    //         ALevelPage: true,
    //         extraCurricular: true,
    //         option: true,
    //         home: true,
    //         assessment: true,
    //         CalculatingPage: true,
    //         IntelligencePage: true,
    //     }));
    // }, [setVisitedPages]);



    useEffect(() => {
        setLoading(true);
        const storedData = localStorage.getItem("intelligenceObject");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setMipScore(parsedData);
                }
            } catch (error) {
                console.error("Error parsing intelligenceObject from localStorage", error);
            }
        }
        setLoading(false);
    }, []);


    const IdentifyIntelligence = (value) => {
        const intelligenceTypes = {
            1: 'Logical-Mathematical',
            2: 'Linguistic',
            3: 'Spatial',
            4: 'Musical',
            5: 'Bodily-Kinesthetic',
            6: 'Interpersonal',
            7: 'Intrapersonal',
            8: 'Naturalistic',
            9: 'Existential'
        };
        return intelligenceTypes[value] || 'Unknown';
    };

    const getIconForIntelligence = (type) => {
        const icons = {
            'Logical-Mathematical': '🧮',
            'Linguistic': '📚',
            'Spatial': '🖼️',
            'Musical': '🎵',
            'Bodily-Kinesthetic': '🏀',
            'Interpersonal': '👥',
            'Intrapersonal': '🧘',
            'Naturalistic': '🌿',
            'Existential': '🌌'
        };
        return icons[type] || '❓';
    };

    const goToTestPage = () => {
        navigate("/Assesment");
    };

    const careerSelectionBtnHandler = () => {
        navigate("/Careers");
    };



    if(loading){
        return(
            <div className=''>
            <Spinner/>

            </div>
        )
    }

    return (
        <div className="intelligence-page-wrapper">
            <div className="intelligence-header-container">
                <div className="intelligence-header">
                <h1>Here is your Multiple Intelligence Profile</h1>
                <p>Discover the unique strengths of your intellectual landscape</p>
                </div>
                <div>
                    <img alt="Multiple Image -profile" className='mip-img' src={mipimg}/>
                </div>
                <div className="intelligence-actions">
                    <button 
                        className="btn btn-secondary" 
                        onClick={goToTestPage}
                    >
                        Retake Test
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={careerSelectionBtnHandler}
                    >
                        Explore Careers
                    </button>
                </div>
            </div>

            <div className="intelligence-page-container">
                <div className="intelligence-grid">
                {mipScore.length > 0 ? (
  mipScore.map((intelligence, index) => {
    const intelligenceType = IdentifyIntelligence(Number(intelligence[0]));
    const percentage = intelligence[1].intelligence_percentage.toFixed(0);
    const icon = getIconForIntelligence(intelligenceType);

    return (
      <div key={index} className="intelligence-card">
        <div className="intelligence-card-icon">{icon}</div>
        <div className="intelligence-card-content">
          <h3>{intelligenceType}</h3>
          <div className="percentage-bar">
            <div className="percentage-fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <span className="percentage-text">{percentage}%</span>
        </div>
      </div>
    );
  })
) : (
  <p className="no-score-msg">No MIP score data found. Please retake the test.</p>
)}

                </div>

                {/* <div className="intelligence-description">
                    <p>
                        Your Multiple Intelligence Profile (MIP) reveals a comprehensive view of your 
                        cognitive strengths. These insights help us understand your unique talents 
                        and provide personalized career guidance that aligns with your natural abilities.
                    </p>
                </div> */}

            </div>
        </div>
    );
};

export default IntelligencePage;
