import './App.css'
import Singin from './components/Signin/Signin'
import Home from './Pages/Home page/Home'
import {Route,Routes} from 'react-router-dom'
import Options from './Pages/Options-page/Options'
import IntelligencePage from './Pages/intelligence-page/intelligence'
import Questions from './Pages/Questions-page/Questions'
function App() {

  return (
   <div>
    <Routes>
      <Route path='/admin' element={<Home/>}/>
      <Route path='/login' element={<Singin/>}/>
      <Route path='/option' element={<Options/>}/>
      <Route path='/intelligence' element={<IntelligencePage/>}/>
      <Route path='/questions' element={<Questions/>}/>

    </Routes>
   </div>
  )
}

export default App
