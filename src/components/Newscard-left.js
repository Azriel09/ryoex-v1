import React from "react";

function Newscardleft(article) {
  return (
    <article key={article.uuid} className="left-articles">
      <img className="news-img1" src={article.image} alt="Article image" />

      <div>
        <h3 className="news-heading1">{article.title}</h3>

        <p className="news-desc1">{article.description}</p>

        <a
          href={article.url}
          className="news-src1 rm"
          target="_blank"
          rel="noreferrer"
        >
          Read More <span>&gt;&gt;</span>
        </a>
      </div>
    </article>
  );
}

export default Newscardleft;
