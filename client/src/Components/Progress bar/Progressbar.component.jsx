import { useContext } from 'react';
import './Progressbar.styles.css';

// Importing ProgressContext to track visited pages
import { ProgressContext } from '../../context/progress.context';

const ProgressBar = () => {
  // Accessing visitedPages from ProgressContext
  const { visitedPages } = useContext(ProgressContext);

  return (
    <div className="custom-progress-bar">
      {/* Progress bar items - Each item represents a page in the process */}

      {/* Welcome Page */}
      <div className={`custom-progress-item ${visitedPages["home"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Welcome Page</label>
      </div>

      {/* Assessment Page */}
      <div className={`custom-progress-item ${visitedPages["assessment"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Assessment Page</label>
      </div>

      {/* Options Page */}
      <div className={`custom-progress-item ${visitedPages["option"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Options Page</label>
      </div>

      {/* Extra-Curricular Page */}
      <div className={`custom-progress-item ${visitedPages["extraCurricular"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Extra-Curricular</label>
      </div>

      {/* Ordinary Level Page */}
      <div className={`custom-progress-item ${visitedPages["OLevelPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Ordinary Level</label>
      </div>

      {/* Advance Level Page */}
      <div className={`custom-progress-item ${visitedPages["ALevelPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Advance Level</label>
      </div>

      {/* Calculating Page */}
      <div className={`custom-progress-item ${visitedPages["CalculatingPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Calculating</label>
      </div>

      {/* Intelligence Page */}
      <div className={`custom-progress-item ${visitedPages["IntelligencePage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Intelligence Page</label>
      </div>

      {/* Career Field Page */}
      <div className={`custom-progress-item ${visitedPages["CareerFieldPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Career Field Page</label>
      </div>

      {/* Career Page */}
      <div className={`custom-progress-item ${visitedPages["CareersPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Career Page</label>
      </div>
    </div>
  );
};

export default ProgressBar;
