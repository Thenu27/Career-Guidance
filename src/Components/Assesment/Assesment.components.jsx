import './Assesment.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';
import UserInformation from '../user-information-box/user-infor.components';

 const Assesment =()=>{
    return(
        <div className="question-user-container">
            <QuestionContainer/>
            <UserInformation/>

        </div>
    )
 }

 export default Assesment;