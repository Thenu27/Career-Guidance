
import './App.css';
import Navigation from './Components/Navigation/Navigation.component';
import ProgressBar from './Components/Progress bar/Progressbar.component';
import Home from './Components/Home/home.component';
import Footer from './Components/Footer/Footer.component';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router>
       <Navigation/>
        <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/Assesment"element={<Assesment/>}/>
              <Route path="/Option" element={<Option/>}/>
              <Route path="/ExtraCurricular" element={<ExtraCurricularPage/>}/>
              <Route path="/Ordinarylevelpage" element={<OrdinaryLevelPage/>}/>
              <Route path="/Advancelevelpage" element={<AdvanceLevelPage/>}/>
              <Route path = "/CalculatePage" element={<CalculatingPage/>}/>
              <Route path = "/IntelligencePage" element={<IntelligencePage/>}/>
              <Route path = "/CareerFields" element={<CareerFieldPage/>}/>
              <Route path = "/Careers" element={<CareerPage/>}/>
              <Route path = "/SendResults" element={<SendResultToEmail/>}/>
        </Routes>  
       <Footer/>
      </Router>
     </div>
  );
}

export default App;
