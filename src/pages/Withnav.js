import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar";
import { Outlet } from "react-router";
export default function Withnav() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
