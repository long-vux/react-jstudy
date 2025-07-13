import axiosClient from '@/services/axios-client';

const commentApi = {
  fetchCommentsByExerciseId: async (exerciseId: string) => {
    const res = await axiosClient.get(`/comment/exercise/${exerciseId}`);
    return res.data;
  },

  createComment: async (content: string, exerciseId: string, parentCommentId?: string) => {
    const res = await axiosClient.post('/comment/create-comment', {
      content,
      exerciseId,
      parentComment: parentCommentId, // parentComment will be null if it's a top-level comment
    });
    return res.data;
  },

  updateComment: async (commentId: string, content: string) => {
    const res = await axiosClient.patch(`/comment/update-comment/${commentId}`, { content });
    return res.data;
  },

  deleteComment: async (commentId: string) => {
    const res = await axiosClient.delete(`/comment/delete-comment/${commentId}`);
    return res.data;
  }

};

export default commentApi;
