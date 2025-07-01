import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchLessons = createAsyncThunk('lessons/fetchAll', async () => {
    const res = await axios.get(`${API_URL}/lesson`);
    return res.data;
});

interface LessonState {
    data: any[]; // Replace 'any' with your lesson type if available
    loading: boolean;
}

const initialState: LessonState = {
    data: [],
    loading: false,
};

const lessonSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                // console.log('[✅ lessons fetched]', action.payload.data); // 👈 log để kiểm tra
                state.loading = false;
                state.data = Array.isArray(action.payload.data) ? action.payload.data : [];
            })

            .addCase(fetchLessons.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default lessonSlice.reducer;