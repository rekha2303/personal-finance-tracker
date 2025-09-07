import api from './api';


// Expenses
export async function getExpenses() { const { data } = await api.get('/expenses'); return data; }
export async function createExpense(payload) { const { data } = await api.post('/expenses', payload); return data; }
export async function updateExpense(payload) { const { data } = await api.put(`/expenses/${payload._id}`, payload); return data; }
export async function deleteExpense(id) { await api.delete(`/expenses/${id}`); return id; }


// Incomes
export async function getIncomes() { const { data } = await api.get('/incomes'); return data; }
export async function createIncome(payload) { const { data } = await api.post('/incomes', payload); return data; }
export async function updateIncome(payload) { const { data } = await api.put(`/incomes/${payload._id}`, payload); return data; }
export async function deleteIncome(id) { await api.delete(`/incomes/${id}`); return id; }