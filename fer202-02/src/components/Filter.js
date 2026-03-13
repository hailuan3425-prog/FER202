import { Card, Form } from "react-bootstrap";

export default function Filter({ category, setCategory }) {
  return (
    <Card className="mb-3">
      <Card.Body>

        <Card.Title>Filter</Card.Title>

        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All categories</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </Form.Select>

      </Card.Body>
    </Card>
  );
}