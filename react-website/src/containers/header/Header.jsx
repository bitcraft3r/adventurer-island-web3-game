import React from 'react';
import './header.css';
import people from '../../assets/people.png';
import symbol from '../../assets/symbol.png';
import tree from '../../assets/tree.png';
import adventure from '../../assets/adventure.png';

const Header = () => {
  return (
    <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1 className="gradient__text">
            Explore a fantasy world on the blockchain

          </h1>
          <p>Unleash your inner adventurer and explore a vast, fantastical world on the blockchain with Adv3nture by joining a team and working together to conquer quests, defeat monsters, and collect valuable treasure through this immersive and interactive game.</p>
          <div className="gpt3__header-content__input">
            <input type="email" placeholder="Your Email Address" />
            <button type="button">Get Started</button>
          </div>
          <div className="gpt3__header-content__people">
            <img src={people} alt="people" />
            <p>420 people requested early access in the last 24 hours</p>
          </div>
        </div>
        <div className="gpt3__header-image">
          <img src={adventure} alt="adventure" />
        </div>
    </div>
  )
}

export default Header;