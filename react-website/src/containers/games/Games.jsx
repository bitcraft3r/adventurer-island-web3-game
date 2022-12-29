import React from 'react';
import adventure02 from '../../assets/adventure02.png';
import './games.css';

const Games = () => {
  return (
    <div className="adv3__games section__padding" id="games">
        <div className="adv3__games-image">
          <img src={adventure02} alt="gaming" />
        </div>
        <div className="adv3__games-content">
          {/* <h4><a href="#home">Request Early Access to Get Started</a></h4> */}
          <h1 className="gradient__text">Unlimited Fun with Community-Created Games</h1>
          <p>Discover endless possibilities and join the fun with Adv3nture's community-created games featuring composable $GOLD and $SILVER tokens and $ADV nfts, ranging from epic quests to challenging puzzles.</p>
          <h4><a href="#home">Request Early Access to Get Started</a></h4>
        </div>
    </div>
  )
}

export default Games;