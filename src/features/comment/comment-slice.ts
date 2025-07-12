import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentState } from '../../types/comment-type';
import {
    fetchCommentsByExerciseId,
    createComment,
} from './comment-thunks';

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
    creatingComment: false, // use this to show loading state when creating a comment
    updatingComment: false,
    deletingComment: false,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Comments
            .addCase(fetchCommentsByExerciseId.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.comments = [];
            })
            .addCase(fetchCommentsByExerciseId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByExerciseId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create Comment
            .addCase(createComment.pending, (state) => {
                state.creatingComment = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.creatingComment = false;
                const newComment = action.payload;
                if (newComment.parentComment) {
                    // if comment is a reply, add it to the replies of the parent comment
                    const parentComment = state.comments.find(c => c._id === newComment.parentComment);
                    if (parentComment) {
                        if (!parentComment.replies) {
                            parentComment.replies = [];
                        }
                        parentComment.replies.push(newComment);
                    }
                } else {
                    // else add it to the top level comments
                    state.comments.unshift(newComment); // add new comment to the beginning of the array
                }
            })
            .addCase(createComment.rejected, (state, action) => {
                state.creatingComment = false;
                state.error = action.payload as string;
            })

    },
});

export default commentSlice.reducer;
