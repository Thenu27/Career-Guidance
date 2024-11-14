import './Footer.styles.css';

const Footer = () =>{
    return(
        <div className='footer-container'>
             <footer>
               
                <ul>
                    <li><strong>Contact Us</strong></li>
                    <li><a href="mailto:email@gmail.com">email@gmail.com</a></li>
                    <li>07123455</li>
                </ul>

                <ul>
                    <li><strong>About Us</strong></li>
                    <li>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</li>
                </ul>

                <ul>
                    <li><strong>Information</strong></li>
                    <li>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer;