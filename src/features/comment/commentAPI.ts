import axiosClient from '@/services/axiosClient';

const fetchCommentsByExerciseId = async (exerciseId: string) => {
  const res = await axiosClient.get(`/comment/exercise/${exerciseId}`);
  return res.data;
};

const commentAPI = {
  fetchCommentsByExerciseId,
};

export default commentAPI;