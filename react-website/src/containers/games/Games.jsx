import React from 'react';
import adventure2 from '../../assets/adventure2.png';
import './games.css';

const Games = () => {
  return (
    <div className="gpt3__possibility section__padding" id="games">
        <div className="gpt3__possibility-image">
          <img src={adventure2} alt="possibility" />
        </div>
        <div className="gpt3__possibility-content">
          <h4><a href="#home">Request Early Access to Get Started</a></h4>
          <h1 className="gradient__text">Unlimited Fun with Community-Created Games</h1>
          <p>Discover endless possibilities and join the fun with Adv3nture's community-created games featuring composable $GOLD and $SILVER tokens and $ADV nfts, ranging from epic quests to challenging puzzles.</p>
          <h4>[Insert Carousel of Games]</h4>
        </div>
    </div>
  )
}

export default Games;