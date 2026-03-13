import React, { useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const FilterBar = ({ accounts, setFilteredAccounts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');
    const [sortBy, setSortBy] = useState('username-asc');

    useEffect(() => {
        let filtered = [...accounts];

        // Lọc theo search
        if (searchTerm) {
            filtered = filtered.filter(acc =>
                acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                acc.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo status
        if (statusFilter !== 'All') {
            filtered = filtered.filter(acc => acc.status === statusFilter.toLowerCase());
        }

        // Lọc theo role
        if (roleFilter !== 'All') {
            filtered = filtered.filter(acc => acc.role === roleFilter.toLowerCase());
        }

        // Sắp xếp
        switch (sortBy) {
            case 'username-asc':
                filtered.sort((a, b) => a.username.localeCompare(b.username));
                break;
            case 'username-desc':
                filtered.sort((a, b) => b.username.localeCompare(a.username));
                break;
            case 'role':
                filtered.sort((a, b) => a.role.localeCompare(b.role));
                break;
            case 'status':
                filtered.sort((a, b) => a.status.localeCompare(b.status));
                break;
            default:
                break;
        }

        setFilteredAccounts(filtered);
    }, [searchTerm, statusFilter, roleFilter, sortBy, accounts, setFilteredAccounts]);

    return (
        <Row className="mb-4">
            <Col md={4}>
                <InputGroup>
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </Col>

            <Col md={2}>
                <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Locked">Locked</option>
                </Form.Select>
            </Col>

            <Col md={2}>
                <Form.Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="All">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </Form.Select>
            </Col>

            <Col md={4}>
                <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="username-asc">Username (A → Z)</option>
                    <option value="username-desc">Username (Z → A)</option>
                    <option value="role">Role (Admin/User)</option>
                    <option value="status">Status (Active/Locked)</option>
                </Form.Select>
            </Col>
        </Row>
    );
};

export default FilterBar;   