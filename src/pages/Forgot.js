import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import logo from "../logo.png";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import "../components/css/login.css";

const theme = createTheme();

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "/api/forgot",
      data: {
        email,
      },
    };

    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <div className="login-container">
      <ThemeProvider theme={theme}>
        <Grid
          component="main"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            [theme.breakpoints.down("lg")]: {
              height: "40%",
            },
          }}
        >
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              background: "rgba(255, 255, 255, 0.5)",
              maxWidth: "80%",
              marginTop: "10vh",
              borderRadius: "10px",
              [theme.breakpoints.down("lg")]: {
                width: "80%",
                marginTop: "1vh",
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "0.8em",
              },
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "blue", marginTop: "0" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <Link component={RouterLink} to="/">
                {<img alt="logo" src={logo} className="logo-login" />}
              </Link>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => handleSubmit(e)}
                sx={{ mt: 1 }}
              >
                <TextField
                  sx={{
                    fieldset: { borderColor: "blue" },
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send Reset Code
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
