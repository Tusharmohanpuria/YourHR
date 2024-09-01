import axios from 'axios';
import { getToken } from './auth';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/user/profile');
export const updateProfile = (profileData) => api.put('/user/profile', profileData);

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  return api.post('/user/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};