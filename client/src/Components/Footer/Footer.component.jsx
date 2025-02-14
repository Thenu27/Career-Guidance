import './Footer.styles.css';

const Footer = () => {
    return (
        <div className='footer-container'>
             
            {/* Footer Content */}
            <div className='m-auto flex flex-row gap-2 h-full w-[95%] text-sm'>

                {/* Contact Us Section */}
                <ul>
                    <li><strong>Contact Us</strong></li>
                    <li><a href="mailto:email@gmail.com">email@gmail.com</a></li> {/* Email Link */}
                    <li>07123455</li> {/* Contact Number */}
                </ul>

                {/* About Us Section */}
                <ul>
                    <li><strong>About Us</strong></li>
                    <li>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</li> {/* Placeholder text */}
                </ul>

                {/* Information Section */}
                <ul>
                    <li><strong>Information</strong></li>
                    <li>Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.</li> {/* Placeholder text */}
                </ul>

            </div> 
            
        </div>
    )
}

export default Footer;
