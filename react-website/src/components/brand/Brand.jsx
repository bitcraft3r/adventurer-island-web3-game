import React from 'react';
import { sushiswap, opensea, coinmarketcap, coingecko, dextools, arbitrum } from './imports';
import './brand.css';

const Brand = () => {
  return (
    <div className="adv3__brand section__padding">
      <div>
        <a href="https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x458a2df1A5C74C5dc9eD6E01Dd1178E6D353243B&chainId=42161" target="_blank" rel="noopener noreferrer">
          <img src={sushiswap} alt="sushiswap" />
        </a>
      </div>
      <div>
        <a href="https://www.dextools.io/app/en/arbitrum/pair-explorer/0xeca2c9d3881df18fb129582b65b82d67edd21d19" target="_blank" rel="noopener noreferrer">
          <img src={dextools} alt="dextools" />
        </a>
      </div>
      <div>
        <a href="https://coinmarketcap.com/currencies/gemstone/" target="_blank" rel="noopener noreferrer">
          <img src={coinmarketcap} alt="coinmarketcap" />
        </a>
      </div>
      <div>
        <a href="https://www.coingecko.com/en/coins/adv3nture-xyz-gemstone" target="_blank" rel="noopener noreferrer">
          <img src={coingecko} alt="coingecko" />
        </a>
      </div>
      <div>
        <a href="https://opensea.io/collection/adv3nturers" target="_blank" rel="noopener noreferrer">
          <img src={opensea} alt="opensea" />
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
