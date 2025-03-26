import './App.css';

// Importing components
import Navigation from './Components/Navigation/Navigation.component';
import Home from './Components/Home/home.component';
import Footer from './Components/Footer/Footer.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing different pages of the application
import Assesment from './Components/Assesment/Assesment.components';
import Option from './Components/Options/Option.components';
import ExtraCurricularPage from './Components/Extra-Curricular-page/Extra-Curricular-page';
import OrdinaryLevelPage from './Components/O-Level-page/O-Level-page.component';
import AdvanceLevelPage from './Components/A-Level-page/A-level-page.component';
import CalculatingPage from './Components/CalculatingPage/Calculating-Page.component';
import IntelligencePage from './Components/Multiple Intelligence Page/IntelligencePage.component';
import CareerFieldPage from './Components/Career-Field-Page/CareerFieldPage';
import CareerPage from './Components/Careers-page/CareerPage';
import SendResultToEmail from './Components/Send-Results/Send-Result-page';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Spinner from './Components/Spinner/Spinner';
import QuestionContainer from './Components/QuestionContainer/Question-container.components.jsx'

function App() {
  return (
    <div className="App">
      {/* Wrap the application with Router to enable routing */}
      <Router>
        {/* Navigation bar - always visible */}
        <Navigation/>

        {/* Define all application routes */}
        <Routes>
          <Route path="/" element={<Home/>}/> {/* Home page */}
          <Route path="/Signup" element={<Signup/>}/> {/* Home page */}
          <Route path="/login" element={<Login/>}/> {/* Home page */}
            {/* <Route element={<PrivateRoute/>}> */}
              <Route path="/Assesment" element={<QuestionContainer/>}/> {/* Assessment page */}
              <Route path="/Option" element={<Option/>}/> {/* Options page */}
              <Route path="/ExtraCurricular" element={<ExtraCurricularPage/>}/> {/* Extra Curricular page */}
              <Route path="/Ordinarylevelpage" element={<OrdinaryLevelPage/>}/> {/* Ordinary Level page */}
              <Route path="/Advancelevelpage" element={<AdvanceLevelPage/>}/> {/* Advanced Level page */}
              <Route path="/CalculatePage" element={<CalculatingPage/>}/> {/* Calculation page */}
              <Route path="/IntelligencePage" element={<IntelligencePage/>}/> {/* Intelligence page */}
              <Route path="/CareerFields" element={<CareerFieldPage/>}/> {/* Career Fields page */}
              <Route path="/Careers" element={<CareerPage/>}/> {/* Careers page */}
              <Route path="/SendResults" element={<SendResultToEmail/>}/> {/* Send results to email page */}
              <Route path='/spinner' element={<Spinner/>}/>

            {/* </Route> */}

        </Routes>  

        {/* Footer - always visible */}
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
