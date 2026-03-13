import { Card, Form, Button } from "react-bootstrap";

export default function ExpenseForm() {

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Add Expense</Card.Title>

        <Form>

          <Form.Control
            className="mb-2"
            placeholder="Name"
          />

          <Form.Control
            type="number"
            className="mb-2"
            placeholder="Amount"
          />

          <Form.Control
            className="mb-2"
            placeholder="Category"
          />

          <Form.Control
            type="date"
            className="mb-2"
          />

          <Button>Add Expense</Button>

        </Form>
      </Card.Body>
    </Card>
  );
}