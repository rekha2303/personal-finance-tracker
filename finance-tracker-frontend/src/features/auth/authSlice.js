import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 🔹 API base
const API_URL = "http://127.0.0.1:8000/users";

// ✅ Register thunk
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!res.ok) throw new Error((await res.json()).detail || "Registration failed");
        return await res.json();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// ✅ Login thunk
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
        return await res.json();
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.status = "loading";
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.access_token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
