import api from './base';

const API_URL = '/auth';

export const login = async ({email, password}) => {
  const response = await api.post(`${API_URL}/login`, {email, password});
  return response.data;
};

export const signup = async ({email, password, role}) => {
  const response = await api.post(`${API_URL}/signup`, {
    email,
    password,
    role,
  });
  return response.data;
};

export const updatePassword = async ({email}) => {
  const response = await api.post(`${API_URL}/update-password`, {
    email,
  });
  return response.data;
};
