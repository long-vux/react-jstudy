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
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
        }
    }
);

export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async ({ commentId, content }: { commentId: string; content: string }, { rejectWithValue }) => {
        try {
            const res = await commentApi.updateComment(commentId, content);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update comment');
        }
    }
);

export const deleteComment = createAsyncThunk<
    string, // Payload return: commentId đã xóa
    string, // Input: commentId
    { rejectValue: string }
>('comment/deleteComment', async (commentId, { rejectWithValue }) => {
    try {
        await commentApi.deleteComment(commentId);
        return commentId; // trả về id để Redux xóa ở state
    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Xóa bình luận thất bại.');
    }
});