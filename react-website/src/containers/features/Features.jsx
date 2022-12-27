import React from 'react';
import { Feature } from '../../components';
import './features.css';
import adventure from '../../assets/adventure.png'
import adventure2 from '../../assets/adventure2.png'

const featuresData = [
  {
    title: 'Game-Fi Building Blocks',
    text: 'Our APIs and SDKs allow developers to easily build games with DeFi integration, enabling players to earn and use blockchain-based assets.'
  },
  {
    title: 'Composable Games',
    text: "By building more composable games, we aim to create a vibrant and dynamic gaming community that empowers players and developers."
  },
  {
    title: 'Open and Interoperable',
    text: 'Our goal is to create a new generation of games that are more open, interoperable, and engaging for players, and that provide developers with greater creative freedom and control.'
  },
  {
    title: 'On-chain ARG',
    text: "Experience a fully immersive and interactive gaming experience with Adv3nture's on-chain Alternate Reality Game (ARG)."
  },
];

const Features = () => {
  return (
    <div className="gpt3__features section__padding" id="features">
        <div className="gpt3__features-heading">
          <h1 className="gradient__text">Composable tools for building a new world of gaming possibilities.</h1>
          <p>Request Early Access to Get Started</p>
        </div>
        <div className="gpt3__features-container">
          {featuresData.map((item, index) => (
            <Feature title={item.title} text={item.text} key={item.title + index} />
          ))}
        </div>
    </div>
  )
}

export default Features;