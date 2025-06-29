import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, fetchUserProfileAPI } from './userAPI';

interface Profile {
  fullName: string;
  avatar: string;
  bio?: string;
}

interface UserStats {
  totalPoints: number;
  solvedExercises: number;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  profile: Profile;
  stats: UserStats;
}

interface UserState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registerMessage: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  registerMessage: null,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await loginAPI(email, password);
      localStorage.setItem('token', res.token);
      return { token: res.token, user: res.user };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const register = createAsyncThunk(
  'user/register',
  async (
    { fullName, email, password, username }: { fullName: string; email: string; password: string; username: string },
    thunkAPI
  ) => {
    try {
      const res = await registerAPI(fullName, email, password, username);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }


    const userId = JSON.parse(atob(token.split('.')[1])).id;
    console.log('Fetching profile for user ID:', userId);

    try {
      const res = await fetchUserProfileAPI(userId);
      console.log('Fetched user profile:', res.user);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Create a slice for user state management
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerMessage = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;