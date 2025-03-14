import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fulfilling-dream-fintech.up.railway.app/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful. Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      setMessage("Error signing up");
    }
  };

  return (
    <div style={{ background: "#121212", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", color: "white" }}>
      
      {/* Heading */}
      <h1 className="text-center mb-4">Fintech Platform</h1>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={4} className="p-4 bg-dark text-white shadow-lg rounded">
            <h2 className="text-center mb-3">Signup</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Signup
              </Button>
            </Form>

            {/* Login Link */}
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/" className="text-info">
                  Login here
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

export default Signup;
