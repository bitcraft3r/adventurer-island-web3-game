import React from 'react';
import './header.css';
import people from '../../assets/people.png';
import symbol from '../../assets/symbol.png';

const Header = () => {
  return (
    <div className="adv3__header section__padding" id="home">
        <div className="adv3__header-content">
          <h1 className="gradient__text">
            Explore a fantasy world on the blockchain

          </h1>
          <p>Unleash your inner adventurer and explore a vast, fantastical world on the blockchain. Join a team and work together to conquer quests, defeat monsters, and collect valuable treasure through this immersive and interactive game.</p>
          <div className="adv3__header-content__input">
            {/* TODO: Use Airtable Webhook to add new subscribers to Airtable
            Webhook: https://hooks.airtable.com/workflows/v1/genericWebhook/appIxfq6Op2r5MWNj/wflpCbDRTufNWz80C/wtrbftfyKxg5c6frm
            Tutorial: https://www.youtube.com/watch?v=TQJz2k9tT8c
            */}
            <input type="email" placeholder="Your Email Address" />
            <button type="button">Get Started</button> {/* onClick={`submit email input field's value to airtable webhook with method="POST"`} */}
          </div>
          <div className="adv3__header-content__people">
            <img src={people} alt="people" />
            <p>1,600 people requested early access in the last 24 hours</p>
          </div>
        </div>
        <div className="adv3__header-image">
          <img src={symbol} alt="symbol" />
        </div>
    </div>
  )
}

export default Header;