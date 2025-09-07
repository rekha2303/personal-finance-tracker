import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as txService from '../../services/transactionService';


export const fetchExpenses = createAsyncThunk('expenses/fetchAll', txService.getExpenses);
export const addExpense = createAsyncThunk('expenses/add', txService.createExpense);
export const updateExpense = createAsyncThunk('expenses/update', txService.updateExpense);
export const deleteExpense = createAsyncThunk('expenses/delete', txService.deleteExpense);


const slice = createSlice({
    name: 'expenses',
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (s) => { s.status = 'loading'; })
            .addCase(fetchExpenses.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload; })
            .addCase(fetchExpenses.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
            .addCase(addExpense.fulfilled, (s, a) => { s.items.unshift(a.payload); })
            .addCase(updateExpense.fulfilled, (s, a) => { s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i); })
            .addCase(deleteExpense.fulfilled, (s, a) => { s.items = s.items.filter(i => i._id !== a.meta.arg); });
    },
});


export default slice.reducer;