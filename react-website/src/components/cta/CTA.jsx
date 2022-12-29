import React from 'react';
import './cta.css';

const CTA = () => {
  return (
    <div className="adv3__cta">
        <div className="adv3__cta-content">
          <p>Join the Adventure Now</p>
          <h3>Unlock Early Access to Epic Adventures</h3>
        </div>
        <div className="adv3__cta-btn">
          <button type="button"><a href="#home">Get Started</a></button>
        </div>
    </div>
  )
}

export default CTA;