import React from 'react';
import { uniswap, opensea, coinmarketcap, coingecko, dextools, arbitrum } from './imports';
import './brand.css';

const Brand = () => {
  return (
    <div className="gpt3__brand section__padding">
      <div>
        <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc4be0798e5b5b1c15eda36d9b2d8c1a60717fa92" target="_blank" rel="noopener noreferrer">
          <img src={uniswap} alt="uniswap" />
        </a>
      </div>
      <div>
        <a href="https://opensea.io/collection/adventurer-eth" target="_blank" rel="noopener noreferrer">
          <img src={opensea} alt="opensea" />
        </a>
      </div>
      <div>
        <a href="https://coinmarketcap.com/currencies/adventurer-gold/" target="_blank" rel="noopener noreferrer">
          <img src={coinmarketcap} alt="coinmarketcap" />
        </a>
      </div>
      <div>
        <a href="https://www.coingecko.com/en/coins/adventurer-gold" target="_blank" rel="noopener noreferrer">
          <img src={coingecko} alt="coingecko" />
        </a>
      </div>
      <div>
        <a href="https://www.dextools.io/app/en/arbitrum/pair-explorer/0x2297c88f8e505ce9f45a01d11e6448525b2d2e7e" target="_blank" rel="noopener noreferrer">
          <img src={dextools} alt="dextools" />
        </a>
      </div>
      <div>
        <a href="https://portal.arbitrum.one/" target="_blank" rel="noopener noreferrer">
          <img src={arbitrum} alt="arbitrum" />
        </a>
      </div>
    </div>
  )
}

export default Brand;