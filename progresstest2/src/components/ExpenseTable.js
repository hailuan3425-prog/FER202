import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { formatDate } from '../utils/format';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount (VND)</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.name}</td>
                        <td>{expense.amount.toLocaleString('vi-VN')}</td>
                        <td>{expense.category}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => onEdit(expense)}
                            >
                                <Pencil />
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this expense?')) {
                                        onDelete(expense.id);
                                    }
                                }}
                            >
                                <Trash />
                            </Button>
                        </td>
                    </tr>
                ))}
                {expenses.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No expenses found
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ExpenseTable;