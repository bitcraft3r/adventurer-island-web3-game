import React from 'react';
import './footer.css';
import adv3Logo from '../../assets/adv3nture-logo.png';

const Footer = () => {
  return (
    <div className="adv3__footer section__padding">
        <div className="adv3__footer-heading">
          <h1 className="gradient__text">Be the first to hear about all the exciting adventures that await!</h1>
        </div>
        <div className="adv3__footer-btn">
          <p><a href="#home">Request Early Access</a></p>
        </div>
        <div className="adv3__footer-links">
          <div className="adv3__footer-links_logo">
            <img src={adv3Logo} alt="logo" />
            <p>© Adv3nture.xyz 🗺️</p>
          </div>
          <div className="adv3__footer-links_div">
            <h4>Links</h4>
            <p><a href="https://opensea.io/collection/adventurer-eth" target="_blank" rel="noopener noreferrer">ADV (OpenSea)</a></p>
            <p><a href="https://opensea.io/collection/adv3nturers" target="_blank" rel="noopener noreferrer">aADV (OpenSea)</a></p>
            {/* <p><a href="https://coinmarketcap.com/currencies/adventurer-gold/" target="_blank" rel="noopener noreferrer">$GOLD (CoinMarketCap)</a></p>
            <p><a href="https://coinmarketcap.com/currencies/adv3nturer-silver/" target="_blank" rel="noopener noreferrer">$SILVER (CoinMarketCap)</a></p> */}
            {/* <p><a href="#home">Home</a></p>
            <p><a href="#vision">Vision</a></p>
            <p><a href="#features">Features</a></p>
            <p><a href="#games">Community Games</a></p>
            <p><a href="#blog">Blog</a></p> */}
          </div>
          <div className="adv3__footer-links_div">
            <h4>dApps & Games</h4>
            {/* <p><a href="https://adv3nture-vaults.vercel.app/" target="_blank" rel="noopener noreferrer">ibVaults</a></p> */}
            {/* <p><a href="https://adventurer-game.vercel.app/" target="_blank" rel="noopener noreferrer">Adv3nture Island</a></p> */}
            <p><a href="https://docs.adv3nture.xyz/introduction/gemscape" target="_blank" rel="noopener noreferrer">GemScape MMORPG (Coming soon)</a></p>
            <p><a href="https://twitter.com/sov3333/status/1601011596272095232" target="_blank" rel="noopener noreferrer">Battle.sol</a></p>
            <p><a href="https://vanilla-raiders-nine.vercel.app/" target="_blank" rel="noopener noreferrer">VanillaRaiders.sol</a></p>
          </div>
          <div className="adv3__footer-links_div">
            <h4>Get in Touch</h4>
            <p><a href="https://twitter.com/adv3nturers" target="_blank" rel="noopener noreferrer">Twitter: @adv3nturers</a></p>
            <p><a href="https://t.me/adv3nturers" target="_blank" rel="noopener noreferrer">Telegram: @adv3nturers</a></p>
            {/* <p>Email: imagine@adv3nture.xyz</p> */}
          </div>
        </div>
        <div className="adv3__footer-copyright">
          <p>© 2023 Adv3nture.xyz 🗺️ All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer;