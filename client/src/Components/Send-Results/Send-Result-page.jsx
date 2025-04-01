import './Send-Results-page.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../API/Api';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';


const SendResultToEmail = ()=>{

    const [email,setEmail] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [score,setScore] = useState();
    const [careers,setCareers] = useState([])

    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const storedData = localStorage.getItem('intelligenceObject');
        if(storedData){
            setScore(JSON.parse(storedData))
        }

        const storedCareers= localStorage.getItem('careerData');
        if(storedCareers){
            setCareers(JSON.parse(storedCareers))
        }
    },[])

    useEffect(()=>{
        console.log("Careers:",careers)
    },[careers])

    const handleFirstNameChange=(e)=>{
        setFirstName(e.target.value)
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const handleLastNameChange=(e)=>{
        setLastName(e.target.value)
    }

    const navigate = useNavigate();
    const goToCareerPage=()=>{
        navigate("/Careers")
    }

    const sendEmail=async()=>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
          alert('Please enter a valid email address!');
          return;
        }
        if(firstName===''){
            alert('Please enter a valid first name!');
            return;

        }

        if(lastName===''){
            alert('Please enter a valid last name!');
            return;

        }
        setLoading(true);

        try{
            const response = await API.post(`${process.env.REACT_APP_URL}/api/email`,{email,firstName,lastName,score,careers});
            setLoading(true);
            if(response.status===200){
                setLoading(false);
                navigate('/success')
            }
            if(response.status===400){
                setLoading(false);
                alert("Error Occured when sending Email!")
            }
        }catch(err){
            console.log(err)
            if(err.response.status===500){
                setLoading(false);
                alert("Internal server error!")
            }
        }
    }

    useEffect(()=>{
        console.log('Email:',email)
    })

    if(loading){
        return(
            <div className='spinner-container'>
                <Spinner/>
            </div>
        ) 
    }

    return(
        <div className='send-results-page'>
            <div className='career-field-box-title-container send-title'>
                  <h2 className='career-field-box-title'>Fill the following details So We can send the Results to You</h2> 
            </div>
            <div className='details-container'>
                <form className='details-form'>
                    <div className='input'>
                        <label  className='label' for="first-name">First Name</label>
                        <input onChange={handleFirstNameChange} className='input-box' required  type='text' id="first-name" /><br/>
                    </div>

                    <div className='input'>
                        <label className='label' for="last-name">Last Name</label>
                        <input onChange={handleLastNameChange} required className='input-box' type='text' id="last-name" /><br/>
                    </div>

                    <div className='input'>
                        <label className='label' for="email">Email</label>
                        <input onChange={handleEmailChange} required className='input-box' id="email" type='email' /><br/>
                    </div>
                
                </form>
            </div>   
            
            <div className='career-fieldBox-navigation send-page-navigation'>
                        <button onClick={goToCareerPage} className='nextbtn '>Back</button>
                        <button onClick={sendEmail} className='nextbtn '>Send Results</button>
            </div>         
            
            
        </div>
    )
}

export default SendResultToEmail