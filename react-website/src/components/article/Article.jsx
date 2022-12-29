import React from 'react';
import './article.css';

const Article = ({ imgUrl, tag, url, title }) => {
  return (
    <div className="gpt3__blog-container_article">
        <div className="gpt3__blog-container_article-image">
          <img src={imgUrl} alt="blog" />
        </div>
        <div className="gpt3__blog-container_article-content">
          <div>
            <p>{tag}</p>
            <h3><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h3>
          </div>
          <p><a href={url} target="_blank" rel="noopener noreferrer">Learn More</a></p>
        </div>
    </div>
  )
}

export default Article;