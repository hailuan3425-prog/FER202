import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../services/api';

export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async () => {
        const response = await api.getExpenses();
        return response.data;
    }
);

export const addExpenseAsync = createAsyncThunk(
    'expenses/addExpense',
    async (expense) => {
        const response = await api.addExpense(expense);
        return response.data;
    }
);

export const updateExpenseAsync = createAsyncThunk(
    'expenses/updateExpense',
    async ({ id, expense }) => {
        const response = await api.updateExpense(id, expense);
        return response.data;
    }
);

export const deleteExpenseAsync = createAsyncThunk(
    'expenses/deleteExpense',
    async (id) => {
        await api.deleteExpense(id);
        return id;
    }
);

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addExpenseAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateExpenseAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default expenseSlice.reducer;