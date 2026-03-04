import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MessageModal from "../components/MessageModal";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const form = event.currentTarget;

    if (!identifier || !password) {
      setValidated(true);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/accounts");
      const accounts = res.data;

      const user = accounts.find(
        (acc) =>
          (acc.username === identifier || acc.email === identifier) &&
          acc.password === password
      );

      if (!user) {
        alert("Invalid username/email or password!");
        return;
      }

      if (user.role !== "admin") {
        alert("Access denied. Only admin users can log in.");
        return;
      }

      if (user.status === "locked") {
        alert("Account is locked. Please contact admin.");
        return;
      }

      login(user);
      setModalMessage(`Welcome, ${user.username}! Login successful.`);
      setShowModal(true);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group controlId="identifier" className="mb-3">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Username or Email is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password is required.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill">
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    className="flex-fill"
                    onClick={() => {
                      setIdentifier("");
                      setPassword("");
                      setValidated(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <MessageModal
        show={showModal}
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
          navigate("/accounts");
        }}
      />
    </Container>
  );
}

export default LoginForm;