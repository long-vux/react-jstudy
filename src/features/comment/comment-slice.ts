import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentState } from '../../types/comment-type';
import {
    fetchCommentsByExerciseId,
    createComment,
    updateComment,
    deleteComment,
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

            // Update Comment
            .addCase(updateComment.pending, (state) => {
                state.updatingComment = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.updatingComment = false;
                const updatedComment = action.payload;

                // find in top level comments (parent comment)
                const parentIndex = state.comments.findIndex(c => c._id === updatedComment._id);
                if (parentIndex !== -1) {
                    state.comments[parentIndex].content = updatedComment.content;
                    state.comments[parentIndex].updatedAt = updatedComment.updatedAt;
                    return;
                }

                // find in replies (child comment)
                for (const parent of state.comments) {
                    const replyIndex = parent.replies?.findIndex(r => r._id === updatedComment._id);
                    if (typeof replyIndex === 'number' && replyIndex !== -1 && parent.replies) {
                        parent.replies[replyIndex].content = updatedComment.content;
                        parent.replies[replyIndex].updatedAt = updatedComment.updatedAt;
                        break;
                    }
                }
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.updatingComment = false;
                state.error = action.payload as string;
            })

            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.deletingComment = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
                state.deletingComment = false;
                const deletedId = action.payload;

                // delete if it is a parent comment
                const parentIndex = state.comments.findIndex(c => c._id === deletedId);
                if (parentIndex !== -1) {
                    state.comments.splice(parentIndex, 1);
                    return;
                }

                // delete if it is a reply
                for (const parent of state.comments) {
                    const replyIndex = parent.replies?.findIndex(r => r._id === deletedId);
                    if (replyIndex !== undefined && replyIndex !== -1 && parent.replies) {
                        parent.replies.splice(replyIndex, 1);
                        break;
                    }
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.deletingComment = false;
                state.error = action.payload as string;
            });

    },
});

export default commentSlice.reducer;
