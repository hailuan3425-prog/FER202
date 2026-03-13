import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const ExpenseForm = ({ onSubmit, editingExpense, setEditingExpense }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        date: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                name: editingExpense.name,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date
            });
        }
    }, [editingExpense]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.amount) {
            newErrors.amount = 'Amount is required';
        } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        }
        if (!formData.date) newErrors.date = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                amount: Number(formData.amount)
            });
            setFormData({ name: '', amount: '', category: '', date: '' });
            setEditingExpense(null);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{editingExpense ? 'Edit Expense' : 'Add Expense'}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    isInvalid={!!errors.amount}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.amount}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    isInvalid={!!errors.category}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    isInvalid={!!errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.date}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button type="submit" variant="primary" className="w-100">
                                {editingExpense ? 'Update' : 'Add'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ExpenseForm;