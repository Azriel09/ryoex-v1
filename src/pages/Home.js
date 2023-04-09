import React, { useEffect, useState } from "react";
import "../blue-background.png";
import GetCurrencies from "../components/Converter";
import "../components/css/home.css";
import "../components/css/banner.css";
import Banner from "../components/Banner";
import TimeChart from "../components/TimeChart";
import Cookies from "universal-cookie";

import Data from "../components/Table";
import Footer from "../components/Footer";
export function Home() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  if (token) {
    return (
      <div className="home">
        <div className="banner">
          <Banner />
          <Data />
        </div>
        <div className="home-sub">
          <GetCurrencies />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div className="home" style={{ height: "150vh" }}>
        <div className="banner">
          <Banner />
        </div>
        <div className="home-sub">
          <GetCurrencies />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}
