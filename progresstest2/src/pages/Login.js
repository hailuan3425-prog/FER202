import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import * as api from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setLoginError('');

        // Validate form
        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            console.log('Attempting login with:', formData);

            // Gọi API lấy danh sách users
            const response = await api.getUsers();
            console.log('API Response:', response);

            const users = response.data;
            console.log('Users from server:', users);

            // Tìm user với username và password
            const user = users.find(
                u => u.username === formData.username && u.password === formData.password
            );

            console.log('Found user:', user);

            if (user) {
                // Lưu thông tin user vào localStorage
                localStorage.setItem('user', JSON.stringify(user));
                console.log('User saved to localStorage');

                // Chuyển hướng đến home
                navigate('/home');
            } else {
                setLoginError('Invalid username or password');
            }
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response,
                request: error.request,
                config: error.config
            });

            if (error.code === 'ECONNREFUSED') {
                setLoginError('Cannot connect to server. Please make sure JSON Server is running on port 3001');
            } else if (error.response) {
                // Server trả về lỗi
                setLoginError(`Server error: ${error.response.status} - ${error.response.statusText}`);
            } else if (error.request) {
                // Không nhận được response
                setLoginError('No response from server. Check if JSON Server is running');
            } else {
                setLoginError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h2>PersonalBudget</h2>
                        <p className="text-muted">Please login to continue</p>
                    </Card.Title>

                    {loginError && (
                        <Alert variant="danger" onClose={() => setLoginError('')} dismissible>
                            {loginError}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!errors.username}
                                disabled={loading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                                disabled={loading}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </Form>

                    <hr className="my-4" />

                    <div className="text-center text-muted small">
                        <p>Test credentials:</p>
                        <p>Username: john | Password: 123456</p>
                        <p>Username: jane | Password: 123456</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;