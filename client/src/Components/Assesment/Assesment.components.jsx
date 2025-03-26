// import './Assesment.styles.css';

// // Importing necessary components
// import QuestionContainer from '../QuestionContainer/Question-container.components';
// import UserInformation from '../user-information-box/user-infor.components';
// import Image from '../Image/Image.components';
// import { useContext, useEffect } from 'react';
// import { ProgressContext } from '../../context/progress.context';
// import { useAuth } from '../../context/Auth.context';
// import { useNavigate } from 'react-router-dom';

// const Assesment = () => {
//     // Accessing context to update visited pages
//     const { setVisitedPages } = useContext(ProgressContext);
//     const { user, loading } = useAuth();


//     const navigate = useNavigate()

//     // useEffect(() => {
//     //     if (!loading && !user) {
//     //       navigate('/Assesment'); // ✅ Only redirect after loading is finished
//     //     }
//     //   }, [user,loading]);


//     // useEffect to update visited pages when the component mounts
//     useEffect(() => {
//         setVisitedPages(() => ({
//             home: true,
//             assessment: true,
//             option: false,
//             extraCurricular: false,
//             OLevelPage: false,
//             ALevelPage: false,
//             CalculatingPage: false,
//             IntelligencePage: false,
//             CareerFieldPage: false,
//             CareersPage: false,
//         }));
//     }, []);


//     return (
//         <div className="question-user-container">
//             {/* Frog Image Section */}
//             {/* <div className='question-page-frog'>
//                 <Image />
//             </div> */}

//             {/* Question Container */}
//             <QuestionContainer />

//             {/* User Information Box */}
//             {/* <div className='user-info-container'>
//                 <UserInformation />
//             </div> */}
//         </div>
//     );
// };

// export default Assesment;
