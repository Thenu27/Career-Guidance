import { useState } from 'react';
import './CareerDropDown.css';
const CareerFieldsBtnList = [
    "Career field 1",
    "Career field 2",
    "Career field 3",
    "Career field 4",
    "Career field 5",
    "Career field 6",
    "Career field 7",
    "Career field 8",
]

const CareerDropdownContainer = () =>{

    const [showMatchedProfileMsg,setshowMatchedProfileMsg] = useState(false);
    const DropdwonsubmitHandler = () =>{
        setshowMatchedProfileMsg(true);
    }
    return(
        <div>
            <h2 className='career-field-dropdown-container-title'>Select 3 Career Fields from the dropdown</h2>
            <div className='career-field-dropdown-container'>
                <div className='career-field-dropdown-btn-container'>
                    {CareerFieldsBtnList.map(career=>{
                        return <div className='career-field-dropdown-btn-set'>
                            <button className='career-field-dropdown-btn'>{career}</button>
                            <div className='career-btn-set'>
                                <button>Career1</button>
                                <button>Career2</button>
                                <button>Career3</button>
                            </div>
                        </div>
                    })}
                </div>
                <button onClick={DropdwonsubmitHandler} className='nextbtn career-field-dropdown-submit-btn'>Submit</button>
            </div>
        </div>
    )
} 

export default CareerDropdownContainer;