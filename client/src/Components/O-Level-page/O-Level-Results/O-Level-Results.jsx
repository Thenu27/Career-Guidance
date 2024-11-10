import './O-Level-Results.css'
import { useContext } from 'react';
import { OLevelContext } from '../../../context/OLevel.context';

const OLevelResults =()=>{
const {OLevelResultsArray} = useContext(OLevelContext);

    return(
        <div>
            <div className='O-Level-result-container'>
                <h2>O Level Results</h2>
                <div className='O-Level-result-btn-container'>
                    {OLevelResultsArray.map((result,index)=>{
                    return(
                        <div className='O-level-result-btn'>
                        <h4 className={"O-level-result-name"} key={index}>{result}</h4>
                        <div class="dropdown">
                            <button class="dropbtn">Select Grade ▼</button>
                            <div class="dropdown-content">
                            <a>Link 1</a>
                            <a>Link 2</a>
                            <a >Link 3</a>
                            </div>
                        </div>
                        </div>
                    ) 
                    

                    })}
                </div>
                <div className='O-Level-result-NextAndBackbtn-container'>
                     <button className='backbtn'>Back</button>
                     <button className='nextbtn'>Next</button>
                </div>

            </div>
        </div>
    )
}

export default OLevelResults;