import React from "react";
import "../components/css/about.css";
import Footer from "../components/Footer";
export function About() {
  return (
    <div className="about">
      <main className="about-main">
        <div className="about-square">
          <h2>About Us</h2>
          <p>
            RyoEX gives you the power of our most up to date, reputable currency
            information and offer you secure, reliable, easy to use website
            dedicated to making your life easier.
          </p>
        </div>
        <div className="about-p">
          <p>
            Founded by Jhan Marmel C. Ubay, the company was born out of the
            belief that the Internet and technology would open up the markets
            for accurate currency data
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
