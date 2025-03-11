// import './Navigation.style.css';
// import ProgressBar from '../Progress bar/Progressbar.component';

// const Navigation = ()=>{
//     return(
//              <>
//                   <div className="nav-container">
//                         <div className="logos">
//                             <a href="/">CI</a>    
//                             <a href="/"><span>University Guidance</span></a>
//                         </div>
//                         <div className="nav-links">
//                             <a href="/">Home</a>
//                             <a href="/">Contact</a>
//                             <a href="/">About Us</a>
//                             <a href="/">Information</a>
//                         </div>   

//                    </div>
//                     {/* <ProgressBar/> */}
                   
//                 </>                  
        
//     )
// }

// export default Navigation;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.style.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo">UG</div>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isMenuOpen ? 'hamburger active' : 'hamburger'}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Navigation menu */}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;