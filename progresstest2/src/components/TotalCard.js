import React from 'react';
import { Card } from 'react-bootstrap';
import { formatVND } from '../utils/format';

const TotalCard = ({ total }) => {
    return (
        <Card className="mb-3 bg-success text-white">
            <Card.Body>
                <Card.Title>Total Expenses</Card.Title>
                <Card.Text className="h2">{formatVND(total)}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TotalCard;