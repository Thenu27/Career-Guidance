
import './App.css';
import Navigation from './Components/Navigation/Navigation.component';
import ProgressBar from './Components/Progress bar/Progressbar.component';
import Home from './Components/Home/home.component';
import Footer from './Components/Footer/Footer.component';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Assesment from './Components/Assesment/Assesment.components';

function App() {
  return (
    <div className="App">
       <Navigation/>
       <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Assesment"element={<Assesment/>}/>
       </Routes>  
       </Router>
      <Footer/>
     </div>
  );
}

export default App;

        {/* <Navigation/>    
        <ProgressBar/>
        <Home/>
        <Footer/> */}
