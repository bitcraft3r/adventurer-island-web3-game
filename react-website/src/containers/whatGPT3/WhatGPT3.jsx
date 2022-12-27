import React from 'react';
import { Feature } from '../../components';
import './whatGPT3.css';
import adventure2 from '../../assets/adventure2.png';

const WhatGPT3 = () => {
  return (
    <div>
        <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
          <div className="gpt3__whatgpt3-feature">
            <Feature title="Adv3nture.xyz" text="A unique and exciting gaming experience through collaboration, customization, and rewards in a fully immersive and interactive on-chain ARG featuring composable and collectible NFTs." />

          </div>
          <div className="gpt3__whatgpt3-heading">
            <h1 className="gradient__text">Join a Team and Explore the World Together</h1>
            <p>Explore The Library</p>
          </div>
          <div className="gpt3__whatgpt3-container">
            <Feature title="Collaboration" text="Work with your team to complete quests and challenges, and share your own adventures and puzzles with the community." />
            <Feature title="Customization" text="Collect and trade NFTs to unlock new abilities and equipment, and create your own unique character." />
            <Feature title="Rewards" text="Earn rewards, including in-game currency, for your achievements as you explore the game world and complete quests." />
          </div>
        </div>
    </div>
  )
}

export default WhatGPT3;