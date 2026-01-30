import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    category: ''
  });

  return (
    <Container className="mt-5">
      <h2>Product Form</h2>

      <Form>
        {/* Tên sản phẩm */}
        <Form.Group className="mb-3">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Nhập tên sản phẩm"
          />
        </Form.Group>

        {/* Giá */}
        <Form.Group className="mb-3">
          <Form.Label>Giá</Form.Label>
          <div className="d-flex align-items-center">
            <Button
              variant="secondary"
              onClick={() =>
                setForm({
                  ...form,
                  price: form.price > 0 ? form.price - 1 : 0
                })
              }
            >
              -
            </Button>

            <Form.Control
              type="number"
              min="0"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Number(e.target.value)
                })
              }
              style={{ width: '150px', margin: '0 10px' }}
            />

            <Button
              variant="secondary"
              onClick={() =>
                setForm({ ...form, price: form.price + 1 })
              }
            >
              +
            </Button>
          </div>
        </Form.Group>

        {/* Danh mục */}
        <Form.Group className="mb-3">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Food">Food</option>
            <option value="Drink">Drink</option>
            <option value="Others">Others</option>
          </Form.Select>
        </Form.Group>
      </Form>

      {/* Hiển thị kết quả */}
      <p>
        <strong>Kết quả:</strong>{' '}
        {form.name || '(chưa nhập tên)'} – {form.price} –{' '}
        {form.category || '(chưa chọn danh mục)'}
      </p>
    </Container>
  );
}

export default ProductForm;
