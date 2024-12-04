import { useContext, useState } from 'react';
import './CareerDropDown.css';
import { CareerContext } from '../../../context/Career.context';



const CareerDropdownContainer = () =>{

    const {setShowCareerDropdown,setshowMatchedProfileMsg,SelectedCareerField,setshowCareerFieldBox} = useContext(CareerContext);

    const submitBtnHandler=()=>{
        setShowCareerDropdown(false);
        setshowMatchedProfileMsg(true);
        
    }

    const goToCareerFieldBox =()=>{
        setshowCareerFieldBox(true);
        setShowCareerDropdown(false);

    }

    return(
    <>
           <div className='career-field-box-title-container'>
                <h2 className='career-field-box-title'>Select 3 Career  That You Like</h2>
           </div> 
            <div className='career-field-box-container'>
                <div className='career-btn-container '>
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

            </div>
            <div className='career-fieldBox-navigation'>
                    <button onClick={goToCareerFieldBox}  className='nextbtn '>Back</button>
                    <button onClick={submitBtnHandler}  className='nextbtn '>Submit</button>
            </div>
        </>
    )
} 

export default CareerDropdownContainer;