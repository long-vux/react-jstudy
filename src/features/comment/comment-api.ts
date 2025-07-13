import axiosClient from '@/services/axios-client';

const commentApi = {
  fetchCommentsByExerciseId: async (exerciseId: string) => {
    const res = await axiosClient.get(`/comment/exercise/${exerciseId}`);
    return res.data;
  },

  createComment: async (content: string, exerciseId: string, parentCommentId?: string) => {
    const response = await axiosClient.post('/comment/create-comment', {
      content,
      exerciseId,
      parentComment: parentCommentId, // parentComment will be null if it's a top-level comment
    });
    return response.data;
  },

  updateComment: async (commentId: string, content: string) => {
    const response = await axiosClient.patch(`/comment/update-comment/${commentId}`, { content });
    return response.data;
  }

};

export default commentApi;
