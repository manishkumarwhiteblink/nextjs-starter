import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  firstName: string;
  lastName: string;
  phone: string;
  team: string;
  lastUpdated: string;
  createdTime: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  // Initially, we check if a token exists. (A further expiry check happens on rehydrate.)
  isAuthenticated: !!Cookies.get('auth_token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post('/authenticate', credentials);
    const token = response.data.jwt;
    Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });

    const userResponse = await axiosInstance.get('/account/getAccountDetails');
    return userResponse.data;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // Optionally, call your API endpoint to logout.
  Cookies.remove('auth_token');
});

export const getAccountDetails = createAsyncThunk(
  'auth/getAccountDetails',
  async () => {
    const response = await axiosInstance.get('/account/getAccountDetails');
    return response.data;
  }
);

export const handleGoogleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (code: string) => {
    const response = await axiosInstance.post('/api/auth/google', { code });
    const { token, user } = response.data;
    Cookies.set('auth_token', token, { secure: true, sameSite: 'strict' });
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle rehydration: check if the JWT is expired, and if so, clear the auth state.
    builder.addCase('persist/REHYDRATE', (state, action) => {
      const token = Cookies.get('auth_token');
      console.log(action)
      if (token) {
        try {
          // Decode the token (assuming it has an `exp` field in seconds)
          const { exp } = jwtDecode<{ exp: number }>(token);
          if (Date.now() >= exp * 1000) {
            // Token is expired; remove it and reset state
            Cookies.remove('auth_token');
            return { ...initialState };
          }
        } catch (error) {
          // If token is invalid, also reset state
          console.log(error)
          Cookies.remove('auth_token');
          return { ...initialState };
        }
      }
      return state;
    });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(handleGoogleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGoogleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(handleGoogleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { setError, clearError } = authSlice.actions;
export default authSlice.reducer;
