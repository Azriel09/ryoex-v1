import React from "react";
import "./App.css";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Withnav from "./pages/Withnav";
import Withoutnav from "./pages/Withoutnav";
import { Partners } from "./pages/Partners";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { About } from "./pages/About";
import Forgot from "./pages/Forgot";
import SignInSide from "./components/Signinside";
import Reset from "./pages/Reset";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Notfound />} />
      <Route element={<Withoutnav />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />

        <Route
          path="/auth"
          element={
            <ProtectedRoutes>
              <AuthComponent />
            </ProtectedRoutes>
          }
        />
        <Route path="/free" component={FreeComponent} />
      </Route>
      <Route element={<Withnav />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/signinside" element={<SignInSide />} />
      </Route>
    </Routes>
  );
}

export default App;
