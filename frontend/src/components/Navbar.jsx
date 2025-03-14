import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">FinTech Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
