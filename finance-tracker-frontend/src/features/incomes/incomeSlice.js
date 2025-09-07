import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as txService from '../../services/transactionService';


export const fetchIncomes = createAsyncThunk('incomes/fetchAll', txService.getIncomes);
export const addIncome = createAsyncThunk('incomes/add', txService.createIncome);
export const updateIncome = createAsyncThunk('incomes/update', txService.updateIncome);
export const deleteIncome = createAsyncThunk('incomes/delete', txService.deleteIncome);


const slice = createSlice({
    name: 'incomes',
    initialState: { items: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomes.pending, (s) => { s.status = 'loading'; })
            .addCase(fetchIncomes.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload; })
            .addCase(fetchIncomes.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
            .addCase(addIncome.fulfilled, (s, a) => { s.items.unshift(a.payload); })
            .addCase(updateIncome.fulfilled, (s, a) => { s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i); })
            .addCase(deleteIncome.fulfilled, (s, a) => { s.items = s.items.filter(i => i._id !== a.meta.arg); });
    },
});


export default slice.reducer;