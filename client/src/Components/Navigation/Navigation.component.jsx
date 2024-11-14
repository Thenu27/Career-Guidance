import './Navigation.style.css';
import ProgressBar from '../Progress bar/Progressbar.component';

const Navigation = ()=>{
    return(
             <>
                  <div className="nav-container">
                        <div className="logos">
                            <a href="/">CI</a>    
                            <a href="/"><span>University Guidance</span></a>
                        </div>
                        <div className="nav-links">
                            <a href="/">Home</a>
                            <a href="/">Contact</a>
                            <a href="/">About Us</a>
                            <a href="/">Information</a>
                        </div>   

                   </div>
                    {/* <hr/> */}
                    <ProgressBar/>
                   
                </>                  
        
    )
}

export default Navigation;