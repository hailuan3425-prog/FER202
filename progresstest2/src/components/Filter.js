import React from 'react';
import { Card, Form } from 'react-bootstrap';

const Filter = ({ filter, setFilter }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Filter by Category</Card.Title>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter category (e.g., Food)"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default Filter;