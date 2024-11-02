import './Assesment.styles.css';
import QuestionContainer from '../QuestionContainer/Question-container.components';
import UserInformation from '../user-information-box/user-infor.components';
import Image from '../Image/Image.components';

 const Assesment = ()=>{
    return(
        <div className="question-user-container">
            <Image/>
            <QuestionContainer/>
            <UserInformation/>
            

        </div>
    )
 }

 export default Assesment;