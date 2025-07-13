import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginAPI, 
  registerAPI, 
  fetchUserProfileAPI, 
  updateProfileAPI 
} from './user-api';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await loginAPI(email, password);
      localStorage.setItem('token', res.data.token);
      return res.data;
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
      console.log('Fetched user profile:', res.data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, username, fullName }: { userId: string; username: string; fullName: string }, thunkAPI) => {
    try {
      const res = await updateProfileAPI(userId, 
        { username, fullName }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.res?.data?.message || 'Cập nhật thất bại');
    }
  }
);
