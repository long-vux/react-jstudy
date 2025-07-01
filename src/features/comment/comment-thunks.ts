import { createAsyncThunk } from '@reduxjs/toolkit';
import commentApi from './comment-api';

// Async Thunks
export const fetchCommentsByExerciseId = createAsyncThunk(
    'comment/fetchCommentsByExerciseId',
    async (exerciseId: string, { rejectWithValue }) => {
        try {
            const res = await commentApi.fetchCommentsByExerciseId(exerciseId);
            return res.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
        }
    }
);

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ content, exerciseId, parentCommentId }: { content: string; exerciseId: string; parentCommentId?: string }, { rejectWithValue }) => {
        try {
            const res = await commentApi.createComment(content, exerciseId, parentCommentId);
            return res.data; // Giả sử API trả về comment mới được tạo
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
        }
    }
);