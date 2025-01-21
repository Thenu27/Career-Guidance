import './App.css'
import Singin from './components/Signin/Signin'
import Home from './Pages/Home page/Home'
import {Route,Routes} from 'react-router-dom'
import Options from './Pages/Options-page/Options'
import IntelligencePage from './Pages/intelligence-page/intelligence'
function App() {

  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Singin/>}/>
      <Route path='/option' element={<Options/>}/>
      <Route path='/intelligence' element={<IntelligencePage/>}/>

    </Routes>
   </div>
  )
}

export default App
