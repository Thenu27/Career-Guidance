import { useContext } from 'react';
import './Progressbar.styles.css';
import { ProgressContext } from '../../context/progress.context';

const ProgressBar = () => {
  const { visitedPages } = useContext(ProgressContext);

  return (
    <div className="custom-progress-bar">
      <div className={`custom-progress-item ${visitedPages["home"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Welcome page</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["assessment"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Assessment page</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["option"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Options page</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["extraCurricular"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Extra-Curricular</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["OLevelPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Ordinary Level</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["ALevelPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Advance Level</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["CalculatingPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Calculating</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["IntelligencePage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Intelligence Page</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["CareerFieldPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Career Field Page</label>
      </div>

      <div className={`custom-progress-item ${visitedPages["CareersPage"] === true ? "custom-active" : ""}`}>
        <label className='custom-progress-title'>Career Page</label>
      </div>
    </div>
  );
};

export default ProgressBar;
