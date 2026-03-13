import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalCard from '../components/TotalCard';
import Filter from '../components/Filter';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import {
    fetchExpenses,
    addExpenseAsync,
    updateExpenseAsync,
    deleteExpenseAsync
} from '../store/expenseSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);
    const expenses = useSelector(state => state.expenses.items);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
        dispatch(fetchExpenses());
    }, [dispatch, navigate]);

    const userExpenses = expenses.filter(exp => exp.userId === user?.id);

    const filteredExpenses = userExpenses.filter(expense =>
        expense.category.toLowerCase().includes(filter.toLowerCase())
    );

    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const handleAddExpense = (expenseData) => {
        const newExpense = {
            ...expenseData,
            userId: user.id,
            id: Date.now()
        };
        dispatch(addExpenseAsync(newExpense));
    };

    const handleEditExpense = (expenseData) => {
        dispatch(updateExpenseAsync({
            id: editingExpense.id,
            expense: { ...expenseData, userId: user.id }
        }));
        setEditingExpense(null);
    };

    const handleDeleteExpense = (id) => {
        dispatch(deleteExpenseAsync(id));
    };

    if (!user) return null;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header user={user} />
            <Container className="flex-grow-1 py-4">
                <Row>
                    <Col md={4}>
                        <TotalCard total={totalExpenses} />
                        <Filter filter={filter} setFilter={setFilter} />
                    </Col>
                    <Col md={8}>
                        <ExpenseForm
                            onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
                            editingExpense={editingExpense}
                            setEditingExpense={setEditingExpense}
                        />
                        <ExpenseTable
                            expenses={filteredExpenses}
                            onEdit={setEditingExpense}
                            onDelete={handleDeleteExpense}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Home;