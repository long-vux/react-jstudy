import axiosClient from '@/services/axios-client';

export const loginAPI = async (email: string, password: string) => {
  const res = await axiosClient.post('/auth/login', { email, password });
  return res.data; // contains token and user
};

export const registerAPI = async (fullName: string, email: string, password: string, username: string) => {
  const res = await axiosClient.post('/auth/register', { fullName, email, password, username });
  return res.data; // contains message
};

export const fetchUserProfileAPI = async (id: string) => {
  const res = await axiosClient.get(`/user/${id}`);
  return res.data; // contains user profile
};

export const updateProfileAPI = async (id: string, data: any) => {
  const res = await axiosClient.put(`/user/update/${id}`, data);
  return res.data; // contains updated user profile
};