import './Footer.styles.css';

const Footer = () =>{
    return(
        <div className='footer-container'>
             
              <div className='m-auto flex flex-row gap-2 h-full w-[95%] text-sm'>
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
                </div> 
            
        </div>
    )
}

export default Footer;