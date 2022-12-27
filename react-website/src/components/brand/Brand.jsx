import React from 'react';
import { uniswap, opensea, coinmarketcap, coingecko, dextools, arbitrum } from './imports';
import './brand.css';

const Brand = () => {
  return (
    <div className="gpt3__brand section__padding">
      <div>
        <img src={uniswap} alt="uniswap" />
      </div>
      <div>
        <a href="https://opensea.io/collection/adventurer-eth" target="_blank" rel="noopener noreferrer"><img src={opensea} alt="opensea" /></a>
      </div>
      <div>
        <img src={coinmarketcap} alt="coinmarketcap" />
      </div>
      <div>
        <img src={coingecko} alt="coingecko" />
      </div>
      <div>
        <img src={dextools} alt="dextools" />
      </div>
      <div>
        <img src={arbitrum} alt="arbitrum" />
      </div>
    </div>
  )
}

export default Brand;