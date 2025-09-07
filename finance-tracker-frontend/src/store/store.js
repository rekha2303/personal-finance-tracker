import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import incomeReducer from '../features/incomes/incomeSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expenseReducer,
        incomes: incomeReducer,
    },
});


export default store;