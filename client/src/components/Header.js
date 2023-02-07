import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button";
import { useColorScheme } from "@mui/joy/styles";
import Gravatar from "react-gravatar";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

export default function Header() {
  const { mode, setMode } = useColorScheme("dark");
  const { loading, data } = useQuery(GET_USER);
  // keep the question mark
  const userData = data?.user;
  return (
    <Navbar
      bg={mode === "light" ? "light" : "dark"}
      variant={mode === "light" ? "light" : "dark"}
      expand="lg"
      collapseOnSelect
      style={{ fontWeight: 800, fontSize: 20, minHeight: "10vh" }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo192.png"
            alt="logo"
            style={{ height: 40, borderRadius: 10 }}
          />
          FitHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/workouts">Search</Nav.Link>

            {Auth.loggedIn() ? (
              <>
                <Nav.Link href="/myworkout">My Workouts</Nav.Link>
                <Nav.Link
                  className="profile"
                  href="/login"
                  onClick={() => Auth.logout()}
                >
                  Logout
                </Nav.Link>
                <NavDropdown
                  title={
                    // <Avatar
                    //   variant="solid"
                    //   sx={{
                    //     "--Avatar-size": "30px",
                    //   }}
                    //   alt={userData?.username}
                    //   src="http://www.gravatar.com/avatar/cb7a0d2708f69a0b9d68d3224104b096?d=retro&r=g&s=100"
                    // />
                    <Gravatar
                      email={userData?.email}
                      alt={userData?.username}
                      style={{ borderRadius: "50%", width: 30, height: 30 }}
                    />
                  }
                  // title="Profile"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/login" onClick={() => Auth.logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}

            <ModeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
