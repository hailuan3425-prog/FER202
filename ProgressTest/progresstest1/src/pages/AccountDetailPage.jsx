import React, { useEffect, useState } from "react";
import { Container, Card, Button, Image, Spinner, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccountDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/accounts/${id}`)
      .then((res) => setAccount(res.data))
      .catch(() => setAccount(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!account) {
    return (
      <Container className="mt-5">
        <p>Account not found.</p>
        <Button variant="secondary" onClick={() => navigate("/accounts")}>
          Back to list
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h4 className="mb-0">Account Details</h4>
        </Card.Header>

        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <Image
                src={`/images/users/${account.avatar}`}
                roundedCircle
                fluid
                style={{ maxWidth: "200px" }}
              />
            </Col>

            <Col md={8}>
              <p><strong>Username:</strong> {account.username}</p>
              <p><strong>Email:</strong> {account.email}</p>
              <p><strong>Role:</strong> {account.role}</p>
              <p><strong>Status:</strong> {account.status}</p>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer>
          <Button variant="secondary" onClick={() => navigate("/accounts")}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}