import React from 'react';
import { Article } from '../../components';
import { token01, token02, token03, token04, token05 } from './imports';
import './tokenomics.css';

const Blog = () => {
  return (
    <div className="gpt3__blog section__padding" id="tokenomics">
        <div className="gpt3__blog-heading">
          <h1 className="gradient__text">Reimagining an Open World of Gaming.</h1>
        </div>
        <div className="gpt3__blog-container">
          <div className="gpt3__blog-container_groupA">
            <Article imgUrl={token01} tag="Tokenomics" url="https://twitter.com/adv3nturers" title="Laying the Foundations for GameFi on Arbitrum: ADV, $GOLD and $SILVER" />
          </div>
          <div className="gpt3__blog-container_groupB">
            <Article imgUrl={token02} tag="GameFi Building Blocks" url="https://twitter.com/sov3333/status/1605799206655913984" title="P2E: Battle.sol and VanillaRaiders.sol" />
            <Article imgUrl={token03} tag="Composable Gaming" url="https://twitter.com/sov3333/status/1599758121173667840" title="Adv3nture Island: Alpha testers wanted!" />
            <Article imgUrl={token04} tag="Rewards" url="https://twitter.com/sov3333/status/1600014126842945540" title="1,000 $GOLD claimable for each ADV NFT" />
            <Article imgUrl={token05} tag="NFT Collectibles" url="https://twitter.com/sov3333/status/1599667440577056768" title="Adv3nturers Genesis NFT collection minted out in 12 hours!" />
          </div>
        </div>
    </div>
  )
}

export default Blog;