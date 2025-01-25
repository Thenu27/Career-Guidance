import './App.css'
import Singin from './components/Signin/Signin'
import Home from './Pages/Home page/Home'
import {Route,Routes} from 'react-router-dom'
import Options from './Pages/Options-page/Options'
import IntelligencePage from './Pages/intelligence-page/intelligence';
import QuestionPage from './Pages/Questions-page/QuestionPage'
import OLevelPage from './Pages/OLevelPage/OLevelPage';
import OLevelSubject from './components/OLevel/OLevelSubjects/OLevelSubjects';
import OLevelStream from './components/OLevel/OLevelStream/OLevelStream';
import Activities from './Pages/Activities-page/Activities';
import OLevelEdit from './components/OLevel/OLevelEdit/OLevelEdit';
import QuestionUpdate from './components/Questions/QuestionUpdate/QuestionUpdate';
import CurrentQuestions from './components/Questions/CurrentQuestions/CurrentQuestions'

function App() {


  return (
   <div>
    <Routes>
      <Route path='/admin' element={<Home/>}/>
      <Route path='/login' element={<Singin/>}/>
      <Route path='/option' element={<Options/>}/>
      <Route path='/intelligence' element={<IntelligencePage/>}/>
      <Route path='/questions' element={<QuestionPage/>}>
          <Route index element={<CurrentQuestions/>}/>
          <Route path="add" element={<QuestionUpdate/>}/>

       </Route>
      

      <Route path='/ordinarylevel' element={<OLevelPage/>}>
         <Route index element={<OLevelStream />} />
         <Route path="subjects" element={<OLevelSubject />} />
         <Route path="update" element={<OLevelEdit/>} />

      </Route>
      <Route path='/activities' element={<Activities/>}/>

    </Routes>
   </div>
  )
}

export default App
