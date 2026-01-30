import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

function QuantityEditor() {
  const [count, setCount] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // chỉ cho nhập số >= 0
    if (value === '' || Number(value) >= 0) {
      setCount(value === '' ? '' : Number(value));
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Quantity Editor</h2>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button
          size="lg"
          onClick={() => setCount(count > 0 ? count - 1 : 0)}
        >
          -
        </Button>

        <Form.Control
          type="number"
          min="0"
          value={count}
          onChange={handleInputChange}
          style={{
            width: '120px',
            margin: '0 15px',
            textAlign: 'center',
            fontSize: '20px'
          }}
        />

        <Button
          size="lg"
          onClick={() => setCount(Number(count) + 1)}
        >
          +
        </Button>
      </div>
    </Container>
  );
}

export default QuantityEditor;
