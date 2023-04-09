import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Container";
import { default as ButtonMui } from "@mui/material/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import logo from "../logo.png";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "rgba(0, 212, 255, 1)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Navigation() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  // const logout = () => {
  //   // destroy the cookie
  //   cookies.remove("TOKEN", { path: "/" });
  //   // redirect user to the landing page
  //   window.location.href = "/";
  // };
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadProfile = () => {
    const configuration = {
      method: "get",
      url: "/api/account",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setLoading(false);
        setName(result.data.name);
        setEmail(result.data.email);
      })
      .catch((error) => {
        error = new Error();
      });
  };
  const handleOpen = () => {
    setOpen(true);
    loadProfile();
  };
  const handleClose = () => setOpen(false);

  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  };
  const forgetful = () => {
    window.location.href = "/forgot";
  };
  if (token) {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        bsPrefix="navbar"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt=""
              width={110}
              height={40}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <MenuIcon />
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link bsPrefix="nav-item" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link bsPrefix="nav-item" as={Link} to="/news">
                News
              </Nav.Link>
              <Nav.Link bsPrefix="nav-item" as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link bsPrefix="nav-item" as={Link} to="/partners">
                Partners
              </Nav.Link>
              <Nav.Link
                bsPrefix="nav-item"
                as={Button}
                onClick={() => handleOpen()}
              >
                Profile
              </Nav.Link>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                {loading ? (
                  <CircularProgress
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      borderRadius: "50%",
                      boxShadow: "inset 0 0 1px 5px blu",
                      backgroundColor: "transparent",
                    }}
                  />
                ) : (
                  <Box sx={style}>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          color: "black",
                          letterSpacing: "5px",
                          fontSize: "30px",
                          marginBottom: "10px",
                        }}
                      >
                        {name}
                      </Typography>
                      <TextField
                        id="outlined-read-only-input"
                        label="Email"
                        defaultValue={email}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ color: "white" }}
                      />{" "}
                      <TextField
                        type={showPassword ? "text" : "password"}
                        sx={{
                          fieldset: { borderColor: "blue" },
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        id="password"
                        value="hawiduhaiwhdiua"
                        className="password-tf"
                      />
                      <Grid
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <ButtonMui
                          type="submit"
                          variant="contained"
                          onClick={() => logout()}
                          sx={{
                            mt: 3,
                            mb: 2,
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          Logout
                        </ButtonMui>
                        <ButtonMui
                          type="submit"
                          variant="contained"
                          onClick={() => forgetful()}
                          sx={{
                            mt: 3,
                            mb: 2,
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          Reset Password
                        </ButtonMui>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Modal>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="lg"
          fixed="top"
          bsPrefix="navbar"
          variant="dark"
        >
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                alt=""
                width={110}
                height={40}
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav">
              <MenuIcon />
            </Navbar.Toggle>

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link bsPrefix="nav-item" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link bsPrefix="nav-item" as={Link} to="/news">
                  News
                </Nav.Link>
                <Nav.Link bsPrefix="nav-item" as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link bsPrefix="nav-item" as={Link} to="/partners">
                  Partners
                </Nav.Link>
                <Nav.Link bsPrefix="nav-item" as={Link} to="/login">
                  Log In/Sign Up
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navigation;
