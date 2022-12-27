import React from 'react';
import { Article } from '../../components';
import { blog01, blog02, blog03, blog04, blog05 } from './imports'
import './blog.css';

const Blog = () => {
  return (
    <div className="gpt3__blog section__padding" id="blog">
        <div className="gpt3__blog-heading">
          <h1 className="gradient__text">A lot is happening, We are blogging about it.</h1>
        </div>
        <div className="gpt3__blog-container">
          <div className="gpt3__blog-container_groupA">
            <Article imgUrl={blog01} date="Dec 27, 2022" title="Laying the Foundations for GameFi on Arbitrum: ADV, $GOLD and $SILVER" />
          </div>
          <div className="gpt3__blog-container_groupB">
            <Article  imgUrl={blog02} date="Dec 21, 2022" title="P2E: Battle.sol and VanillaRaiders.sol" />
            <Article  imgUrl={blog03} date="Dec 14, 2022" title="Adv3nture Island: Alpha testers wanted!" />
            <Article  imgUrl={blog04} date="Dec 7, 2022" title="1,000 $GOLD claimable for each ADV NFT" />
            <Article  imgUrl={blog05} date="Dec 5, 2022" title="Adv3nturers Genesis NFT collection minted out in 12 hours!" />
          </div>
        </div>
    </div>
  )
}

export default Blog;