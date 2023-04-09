import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import logo from "../logo.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link as RouterLink } from "react-router-dom";

const cookies = new Cookies();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        RyoEx
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "/api/login",
      data: {
        email,
        password,
        remember,
      },
    };

    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/auth";

        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
        setIsFormInvalid(true);
      });
  };

  return (
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
            background: "rgba(255, 255, 255, 0.6)",
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
              Sign in
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
                error={isFormInvalid}
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
              <TextField
                type={showPassword ? "text" : "password"}
                sx={{
                  fieldset: { borderColor: "blue" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                error={isFormInvalid}
                helperText={isFormInvalid && "Invalid input credentials"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="password-tf"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    key={Math.random()}
                    value="remember"
                    color="primary"
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => handleSubmit(e)}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs sx={{ marginBottom: "5px", marginTop: "5px" }}>
                  <Link
                    href="/forgot"
                    variant="body2"
                    sx={{ fontSize: "1.2em" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item sx={{ marginTop: "5px" }}>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{
                      fontSize: "1.2em",
                      marginTop: "5vh",
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
