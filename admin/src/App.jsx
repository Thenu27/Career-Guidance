import './App.css'
import Singin from './components/Signin/Signin'
import Home from './Pages/Home page/Home'
import {Route,Routes} from 'react-router-dom'
import Options from './Pages/Options-page/Options'
import IntelligencePage from './Pages/intelligence-page/intelligence'
import Questions from './Pages/Questions-page/Questions';
import OLevelPage from './Pages/OLevelPage/OLevelPage';
import OLevelSubject from './components/OLevel/OLevelSubjects/OLevelSubjects';
import OLevelStream from './components/OLevel/OLevelStream/OLevelStream';
import Activities from './Pages/Activities-page/Activities';
import OLevelEdit from './components/OLevel/OLevelEdit/OLevelEdit'

function App() {


  return (
   <div>
    <Routes>
      <Route path='/admin' element={<Home/>}/>
      <Route path='/login' element={<Singin/>}/>
      <Route path='/option' element={<Options/>}/>
      <Route path='/intelligence' element={<IntelligencePage/>}/>
      <Route path='/questions' element={<Questions/>}/>
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
