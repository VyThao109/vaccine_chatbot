import type { IAuthState } from "../../../interfaces/auth.interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("authToken");

const initialState: IAuthState = {
    accessToken: storedToken || null,
    isAuthenticated: !!storedToken
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            
            localStorage.setItem("authToken", accessToken);
        },

        signOut: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("authToken");
        }
    }
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;