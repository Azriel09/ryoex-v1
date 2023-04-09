import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
export default function AuthComponent() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  const [rates, setRates] = useState([]);

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setRates(result.data.rates);
        console.log(result.data.rates);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <div className="text-center">
      <h1>Login Successful!</h1>

      {/* logout */}
      {<Navigate to="/" />}
    </div>
  );
}
