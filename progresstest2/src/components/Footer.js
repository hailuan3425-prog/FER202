import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto">
            <div className="text-center p-3" style={{ backgroundColor: '#f5f5f5' }}>
                <Container>
                    <Row>
                        <Col>
                            © {new Date().getFullYear()} PersonalBudget - All rights reserved
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;