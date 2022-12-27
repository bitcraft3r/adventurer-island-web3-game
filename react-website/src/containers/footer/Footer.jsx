import React from 'react';
import './footer.css';
import gpt3Logo from '../../assets/logo.svg';

const Footer = () => {
  return (
    <div className="gpt3__footer section__padding">
        <div className="gpt3__footer-heading">
          <h1 className="gradient__text">Be the first to hear about all the exciting adventures that await!</h1>
        </div>
        <div className="gpt3__footer-btn">
          <p>Request Early Access</p>
        </div>
        <div className="gpt3__footer-links">
          <div className="gpt3__footer-links_logo">
            <img src={gpt3Logo} alt="logo" />
            <p>Crechterwoord K12 182 DK Alknjkcb, All Rights Reserved</p>
          </div>
          <div className="gpt3__footer-links_div">
            <h4>Links</h4>
            <p>Overons</p>
            <p>Social Media</p>
            <p>Counters</p>
            <p>Contact</p>
          </div>
          <div className="gpt3__footer-links_div">
            <h4>Company</h4>
            <p>Social Terms & Conditions</p>
            <p>Privacy Policy</p>
            <p>Contact</p>
          </div>
          <div className="gpt3__footer-links_div">
            <h4>Get in Touch</h4>
            <p>@adv3nturers</p>
            {/* <p>Telegram: @adv3nturers</p> */}
            {/* <p>Email: imagine@adv3nture.xyz</p> */}
          </div>
        </div>
        <div className="gpt3__footer-copyright">
          <p>© 2023 Adv3nture.xyz. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer;