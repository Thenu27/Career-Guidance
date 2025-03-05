import { useContext } from 'react';
import './ALevelStream.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ALevelContext } from '../../../Context/ALevel.context';

const ALevelStream = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    setShowArts,
    setShowPhysicalScience,
    setShowCommerce,
    setShowTechnology,
    setShowBioScience,
  } = useContext(ALevelContext);

  // Function to handle navigation
  const nextNavigation = () => {
    if (location.pathname === '/advancedlevel/stream') {
      navigate('/advancedlevel/subjects');
    }
  };

  // Function to set the selected subject stream
  const setSubject = (value) => {
    // Reset all streams
    setShowPhysicalScience(false);
    setShowBioScience(false);
    setShowCommerce(false);
    setShowArts(false);
    setShowTechnology(false);

    // Set the selected stream
    if (value === 1) {
      setShowPhysicalScience(true);
    } else if (value === 2) {
      setShowBioScience(true);
    } else if (value === 3) {
      setShowCommerce(true);
    } else if (value === 4) {
      setShowArts(true);
    } else if (value === 5) {
      setShowTechnology(true);
    }
};

  return (
    <div className='login-container a-level-stream-container'>
      <h1 className="stream-title">Select Stream</h1>
      <div className="options-container stream-container">
        <button
          className="login-btn stream-btn"
          onClick={() => {
            setSubject(1);
            nextNavigation();
          }}
        >
          Physical Science
        </button>
        <button
          className="login-btn stream-btn"
          onClick={() => {
            setSubject(2);
            nextNavigation();
          }}
        >
          Bio Science
        </button>
        <button
          className="login-btn stream-btn"
          onClick={() => {
            setSubject(3);
            nextNavigation();
          }}
        >
          Commerce
        </button>
        <button
          className="login-btn stream-btn"
          onClick={() => {
            setSubject(4);
            nextNavigation();
          }}
        >
          Arts
        </button>
        <button
          className="login-btn stream-btn"
          onClick={() => {
            setSubject(5);
            nextNavigation();
          }}
        >
          Technology
        </button>
      </div>
    </div>
  );
};

export default ALevelStream;
