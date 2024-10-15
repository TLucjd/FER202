// src/components/LoginModal.js
import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import "../styles/LoginModal.scss"; // Importing custom styles for further adjustments

const LoginModal = ({ show, onHide, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ 
      ...credentials, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userData = await onLoginSuccess(credentials);
      setLoading(false);
      onHide();
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="login-modal">
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginEmail" className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your password" 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 btn-custom" 
            disabled={loading}
          >
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
