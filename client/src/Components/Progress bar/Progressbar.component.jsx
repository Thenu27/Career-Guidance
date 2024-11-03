import { useContext, useState } from 'react';
import './Progressbar.styles.css';
import { ProgressContext } from '../../context/progress.context';

const ProgressBar =() =>{

  const {visitedPages} = useContext(ProgressContext)

    return(
        <div className="progress-bar"> 

            <div className={`progress-item  ${visitedPages["home"]===true?"active":""}`}>
              <label>Welcome page</label>
            </div>   

            <div className={`progress-item  ${visitedPages["assessment"]===true?"active":""}`}>
              <label>Assessment page</label>
            </div>  

            <div className={`progress-item  ${visitedPages["option"]===true?"active":""}`}>
              <label>Options page</label>
            </div> 

            <div className={`progress-item  ${visitedPages["extraCurricular"]===true?"active":""}`}>
              <label>ExtraCurrucluar page</label>
            </div> 

            <div className={`progress-item  ${visitedPages["OLevelPage"]===true?"active":""}`}>
              <label>Ordinary Level page</label>
            </div> 

            <div className={`progress-item  ${visitedPages["ALevelPage"]===true?"active":""}`}>
              <label>Advance Level </label>
            </div> 

            <div className={`progress-item  ${visitedPages["CalculatingPage"]===true?"active":""}`}>
              <label>Calculating </label>
            </div> 

            <div className={`progress-item  ${visitedPages["IntelligencePage"]===true?"active":""}`}>
              <label>Intelligence Page </label>
            </div> 
            {/* <div className={`progress-item  ${visitedPages["CalculatingPage"]===true?"active":""}`}>
              <label>Intelligence page </label>
            </div>  */}
            {/* <div className={`progress-item  ${visitedPages["CalculatingPage"]===true?"active":""}`}>
              <label>Calculating </label>
            </div> 
            <div className={`progress-item  ${visitedPages["CalculatingPage"]===true?"active":""}`}>
              <label>Calculating </label>
            </div>  */}


        
      </div>
    )
}

export default ProgressBar;