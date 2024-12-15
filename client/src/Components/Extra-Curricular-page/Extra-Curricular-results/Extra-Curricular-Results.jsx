import './Extra-Curricular-results.css';

const ExtraCurricularResults=({SelectedExtraActivities})=>{
    return(
             <>
                
                    <div className='extra-curricular-title-container'>
                    <h2 className='extra-curricular-title'>Select the Level you have done from the following</h2>
                </div>
                        <div className='extra-curricular-container'>
                            <div className='extra-curricular-btn-container ecb-container'>
            
                                {SelectedExtraActivities.map((activity,index)=>{
                                    return <button 
                                                key={index} 
                                                
                                                className={`extra-curricular-btn ecb `}>
                                                <p>{activity}</p>
                                                <label class="dropdown-wrapper">

                                                    <div class="dropdown-button">
                                                        Level
                                                    </div>

                                                    <input type="checkbox" class="dropdown-input" id="test"/>

                                                    <ul class="dropdown-menu">
                                                        <li>School</li>
                                                        <li>National</li>
                                                        <li>Club</li>
                                                        <li>International</li>
                                                    </ul>

                                                    </label>


                                              </button>
                                          })}
            
                            </div>
                        </div>
                        </>
    )
}

export default ExtraCurricularResults;