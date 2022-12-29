import React from 'react';
import { Feature } from '../../components';
import './Vision.css';

const Vision = () => {
  return (
    <div>
        <div className="gpt3__whatgpt3 section__margin" id="vision">
          <div className="gpt3__whatgpt3-feature">
            <Feature title="Adv3nture.xyz" text="A unique and exciting gaming experience through collaboration, customization, and rewards in a fully immersive and interactive on-chain ARG featuring composable and collectible NFTs." />

          </div>
          <div className="gpt3__whatgpt3-heading">
            <h1 className="gradient__text">Composable tools for building a new world of gaming possibilities.</h1>
            <p><a href="#games">Explore Games Created by the Community</a></p>
          </div>
          <div className="gpt3__whatgpt3-container">
            <Feature title="Game-Fi Building Blocks" text="Our APIs and SDKs allow developers to easily build games with DeFi integration, enabling players to earn and use blockchain-based assets." />
            <Feature title="Composable On-Chain Games" text="By building more composable games, we aim to create a vibrant and dynamic gaming community that empowers players and developers." />
            <Feature title="Open and Interoperable" text="Our goal is to create a new generation of games that are more open, interoperable, and engaging for players, and that provide developers with greater creative freedom and control." />
          </div>
        </div>
    </div>
  )
}

export default Vision;