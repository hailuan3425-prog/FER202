import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Wallet2 } from 'react-bootstrap-icons';

const Header = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <Wallet2 className="me-2" size={30} />
                    PersonalBudget
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="text-white me-3">
                        Signed in as: <span className="fw-bold">{user?.fullName}</span>
                    </Navbar.Text>
                    <Button variant="light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;