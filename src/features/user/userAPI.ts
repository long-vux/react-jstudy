import axiosClient from '../../services/axiosClient';

export const loginAPI = async (email: string, password: string) => {
  const res = await axiosClient.post('/auth/login', { email, password });
  return res.data; // contains token and user
};
