import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commentAPI from './commentAPI';


export const fetchCommentsByExerciseId = createAsyncThunk(
    'comment/fetchCommentsByExerciseId',
    async (exerciseId: string) => {
        const res = await commentAPI.fetchCommentsByExerciseId(exerciseId);
        return res;
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comments: [] as any[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByExerciseId.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.comments = [];

            })
            .addCase(fetchCommentsByExerciseId.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByExerciseId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error fetching comments';
            })
    }

});

export default commentSlice.reducer;