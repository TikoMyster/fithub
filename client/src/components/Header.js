import React, { useEffect } from "react";
import Auth from "../utils/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/joy/Button";
import { useColorScheme } from "@mui/joy/styles";

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
  const { mode, setMode } = useColorScheme();
  return (
    <Navbar
      bg={mode === "light" ? "light" : "dark"}
      variant={mode === "light" ? "light" : "dark"}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#home">FitHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/workouts">Search Workouts</Nav.Link>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link href="/myworkout">Your Workouts</Nav.Link>
                <Nav.Link href="/login" onClick={() => Auth.logout()}>
                  Logout
                </Nav.Link>
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
