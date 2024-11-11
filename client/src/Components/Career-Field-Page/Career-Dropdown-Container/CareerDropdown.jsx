import { useContext, useState } from 'react';
import './CareerDropDown.css';
import { CareerContext } from '../../../context/Career.context';



const CareerDropdownContainer = () =>{

    const {setShowCareerDropdown,setshowMatchedProfileMsg,SelectedCareerField} = useContext(CareerContext);

    const submitBtnHandler=()=>{
        setShowCareerDropdown(false);
        setshowMatchedProfileMsg(true);
        
    }

    return(
    
        <div>
            <h2 className='career-field-dropdown-container-title'>Select 3 Career Fields from the dropdown</h2>
            <div className='career-field-dropdown-container'>
                <div className='career-field-dropdown-btn-container'>
                    {SelectedCareerField.map((career,index)=>{
                        return <div className='career-field-dropdown-btn-set'>
                                    <button className='career-field-dropdown-btn'>{career}</button>
                                    <div className='career-btn-set'>
                                    <div className="dropdown">
                                        <button className="dropbtn">Carrer 01</button>
                                        <div className="dropdown-content">
                                            <a >Link 1</a>
                                            <a >Link 2</a>
                                            <a >Link 3</a>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <button className="dropbtn">Career 02</button>
                                        <div className="dropdown-content">
                                            <a >Link 1</a>
                                            <a >Link 2</a>
                                            <a> Link 3 </a>
                                        </div>
                                    </div>

                                    <div className="dropdown">
                                        <button className="dropbtn">Career 03</button>
                                        <div className="dropdown-content">
                                            <a >Link 1</a>
                                            <a >Link 2</a>
                                            <a >Link 3</a>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    })}
                </div>
                <button onClick={submitBtnHandler}  className='nextbtn career-field-dropdown-submit-btn'>Submit</button>
            </div>
        </div>
    )
} 

export default CareerDropdownContainer;