import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  isAuthenticated: boolean | null;
  user: { uuid: string; name: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
};

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
      withCredentials: true,
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { uuid: string; name: string; email: string }; isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    });
    builder.addCase(checkAuthStatus.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;