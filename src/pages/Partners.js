import React from "react";
import "../components/css/partners.css";
import marketaux from "../marketaux-dark.svg";
import Footer from "../components/Footer";
export function Partners() {
  return (
    <div className="partners">
      <div className="main-partners">
        <h1>Our Partners</h1>

        <div className="logo">
          <a href="https://exchangerate.host" target="_blank" rel="noreferrer">
            <h2>exchangerate.host</h2>
          </a>
          <a href="https://www.marketaux.com/" target="_blank" rel="noreferrer">
            <img src={marketaux} alt="" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
