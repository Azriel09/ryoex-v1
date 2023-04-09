import React, { useState, useEffect } from "react";
import "../components/css/news.css";
import Newscardleft from "../components/Newscard-left";
import Newscardright from "../components/Newscard-right";
import Footer from "../components/Footer";
export function News() {
  const [news1, setNews1] = useState([]);
  const [news2, setNews2] = useState([]);
  const [news3, setNews3] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json(res))
      .then((data) => {
        console.log(data);
        setNews1(data.data1);
        setNews2(data.data2);
        setNews3(data.data3);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <main className="main-news">
        <section className="main-container-left">
          <h2 className="top-story">Top Stories</h2>
          <div className="container-top-left">
            {news1 &&
              news1.map((article) => {
                return (
                  <Newscardleft
                    key={article.uuid}
                    title={article.title}
                    image={article.image_url}
                    url={article.url}
                    description={article.description}
                  />
                );
              })}
          </div>
        </section>
        <section className="main-container-right">
          {news2 &&
            news2.map((article) => {
              return (
                <Newscardright
                  key={article.uuid}
                  title={article.title}
                  image={article.image_url}
                  url={article.url}
                  description={article.description}
                />
              );
            })}
          {news3 &&
            news3.map((article) => {
              return (
                <Newscardright
                  key={article.uuid}
                  title={article.title}
                  image={article.image_url}
                  url={article.url}
                  description={article.description}
                />
              );
            })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
