import axiosClient from '@/services/axios-client';


const fetchExerciseById = async (id: string) => {
  const res = await axiosClient.get(`/exercise/${id}`);
  return res.data;
};

const submitCode = async (exerciseId: string, userCode: string) => {
  const res = await axiosClient.post('/submission/submit', {
    exerciseId,
    userCode,
  });
  return res.data;
};

const exerciseAPI = {
  fetchExerciseById,
  submitCode,
};

export default exerciseAPI