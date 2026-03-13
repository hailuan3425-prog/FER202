import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const API = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000
});

// Thêm interceptor để log request/response (debug)
API.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

API.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

export const getUsers = () => API.get('/users');
export const getExpenses = () => API.get('/expenses');
export const addExpense = (expense) => API.post('/expenses', expense);
export const updateExpense = (id, expense) => API.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);