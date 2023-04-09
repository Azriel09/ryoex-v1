import React from "react";

function Newscardright(article) {
  return (
    <article>
      <h4 className="news-date2">just in</h4>
      <div>
        <h2 className="news-heading2">{article.title}</h2>
        <p className="news-desc2">{article.description}</p>
        <a
          href={article.url}
          className="news-src2 rm"
          target="_blank"
          rel="noreferrer"
        >
          Read More <span>&gt;&gt;</span>
        </a>
      </div>
      <img src={article.image} className="news-img2" />
    </article>
  );
}

export default Newscardright;
