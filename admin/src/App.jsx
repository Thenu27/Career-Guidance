import Singin from './components/Signin/Signin';
import Home from './Pages/Home page/Home';
import {Route,Routes} from 'react-router-dom';
import Options from './Pages/Options-page/Options';
import IntelligencePage from './Pages/intelligence-page/intelligence';
import QuestionPage from './Pages/Questions-page/QuestionPage';
import OLevelPage from './Pages/OLevelPage/OLevelPage';
import OLevelSubject from './components/OLevel/OLevelSubjects/OLevelSubjects';
import OLevelStream from './components/OLevel/OLevelStream/OLevelStream';
import Activities from './Pages/Activities-page/Activities';
import OLevelEdit from './components/OLevel/OLevelEdit/OLevelEdit';
import QuestionUpdate from './components/Questions/QuestionUpdate/QuestionUpdate';
import CurrentQuestions from './components/Questions/CurrentQuestions/CurrentQuestions';
import OLevelAdd from './components/OLevel/OLevelAdd/OLevelAdd';
import ALevelPage from './Pages/ALevelPage/ALevelPage';
import ALevelPath from './components/ALevel/ALevelPath/ALevelPath';
import ALevelSubjects from './components/ALevel/ALevelSubjects/ALevelSubjects';
import ALevelStream from './components/ALevel/ALevelStream/ALevelStream';
import ALevelAdd from './components/ALevel/ALevelAdd/ALevelAdd';
import CareerPage from './Pages/CareerPage/CareerPage';
import CareerField from './components/Career/CareerFields/CareerField';
import Career from './components/Career/Careers/Career';
import CareerAdd from './components/Career/CareerAdd/CareerAdd';
import CareerUpdate from './components/Career/CareerUpdate/CareerUpdate';
import ALevelUpdate from './components/ALevel/ALevelUpdate/ALevelUpdate';
import MainActivities from './components/Activities/Main-Activities/MainActivities';
import MainActivityAdd from './components/Activities/MainActivityAdd/MainActivityAdd';
import SubActivities from './components/Activities/SubActivites/SubActivites';
import SubActivityEdit from './components/Activities/SubActivityEdit/SubActivityEdit';
import SubActivitiesAdd from './components/Activities/SubActivitiesAdd/SubActivitiesAdd';
import CareerFieldAdd from './components/Career/CareerFieldAdd/CareerFieldAdd';
import Courses from './components/Courses/Courses';
import HigherEducationPage from './Pages/HigherEducationPage/HigherEducationPage';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


import './App.css'
import Spinner from '../../client/src/Components/Spinner/Spinner';
import DegreeField from './components/DegreeField/DegreeField';

function App() {

  return (
   <div className='app'>
    
    <Routes>

      <Route path='/admin' element={<Home/>}/>
      <Route path='/admin/login' element={<Singin/>}/>

      {/* <Route element={<ProtectedRoute/>}> */}
        <Route path='/admin/option' element={<Options/>}/>
        
        <Route path='/admin/intelligence' element={<IntelligencePage/>}/>
        <Route path='/admin/questions' element={<QuestionPage/>}>
            <Route index element={<CurrentQuestions/>}/>
            <Route path="add" element={<QuestionUpdate/>}/>

        </Route>
        

        <Route path='/admin/ordinarylevel' element={<OLevelPage/>}>
          <Route index element={<OLevelStream />} />
          <Route path="add" element={<OLevelAdd/>}/>
          <Route path="subjects" element={<OLevelSubject />} />
          <Route path="update" element={<OLevelEdit/>} />

        </Route>
        <Route path='/admin/activities' element={<Activities/>}>
          <Route index element={<MainActivities/>} />
          <Route path='add-main-activity' element={<MainActivityAdd/>}/>
          <Route path='sub-activities' element={<SubActivities/>}/>
          <Route path='sub-activity-update' element={<SubActivityEdit/>}/>
          <Route path='sub-activity-add' element={<SubActivitiesAdd/>}/>

        </Route>
        
        <Route path='/admin/advancedlevel' element={<ALevelPage/>}>
          <Route index element={<ALevelPath/>}/>
          <Route path='add' element={<ALevelAdd/>}/>
          <Route path='stream' element={<ALevelStream/>}/>
          <Route path='subjects' element={<ALevelSubjects/>}/>
          <Route path='update' element={<ALevelUpdate/>}/>

        </Route>

        <Route path='/admin/careerfield' element={<CareerPage/>}>
          <Route index element={<CareerField/>}/>
          <Route path='career-field-add' element={<CareerFieldAdd/>}/>
          <Route path='career' element={<Career/>}/>
          <Route path='add' element={<CareerAdd/>}/>
          <Route path='update' element={<CareerUpdate/>}/>
        </Route>

        <Route path='/admin/higher-education' element={<HigherEducationPage/>}>
          <Route index element={<DegreeField/>}/>   
          <Route path='courses' element={<Courses/>}/>   
        
        </Route>
      
      {/* </Route> */}
      
     </Routes>

   </div>
  )
}

export default App;
