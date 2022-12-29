import React from 'react';
import { Feature } from '../../components';
import './features.css';

const featuresData = [
  {
    title: 'Collaboration',
    text: 'Work with your team to complete quests and challenges, and share your own adventures and puzzles with the community.'
  },
  {
    title: 'Customization',
    text: "Collect and trade NFTs to unlock new abilities and equipment, and create your own unique character."
  },
  {
    title: 'Rewards',
    text: 'Earn rewards, including in-game currency, for your achievements as you explore the game world and complete quests.'
  },
];

const Features = () => {
  return (
    <div className="adv3__features section__padding" id="features">
        <div className="adv3__features-heading">
          <h1 className="gradient__text">Join a Team and Explore the World Together</h1>
          <p><a href="#home">Request Early Access to Get Started</a></p>
        </div>
        <div className="adv3__features-container">
          {featuresData.map((item, index) => (
            <Feature title={item.title} text={item.text} key={item.title + index} />
          ))}
        </div>
    </div>
  )
}

export default Features;