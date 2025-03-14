import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fulfilling-dream-fintech.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", color: "white" }}>
      
      {/* Heading */}
      <h1 className="text-center mb-4">Fintech Platform</h1>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={4} className="p-4 bg-dark text-white shadow-lg rounded">
            <h2 className="text-center mb-3">Login</h2>
            {message && <Alert variant="danger">{message}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            {/* Signup Link */}
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-info">
                  Sign up here
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center mt-4 py-3">
        <p>
          Developed by <strong>21BCE3318 Sriharri K</strong> - For XNL-FS-1
        </p>
      </footer>
    </div>
  );
};

export default Login;
