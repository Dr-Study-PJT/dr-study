// src/app/accounts/login/api/login.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import { ILogIn } from '@/interfaces/accounts';
import { removeUserData, setSessionStorageItem } from '@/utils/sessionStorage';

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/auth`,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => {
    if (
      response.config.url === '/login' ||
      response.config.url === '/refresh'
    ) {
      const accessToken = response.data.accessToken;
      if (accessToken) {
        Cookies.set('access_token', accessToken);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const login = async (userData: ILogIn) => {
  const response = await API.post('/login', userData);
  setSessionStorageItem('userData', {
    email: response.data.email,
    nickname: response.data.nickname,
    imgUrl: response.data.imgUrl,
  });
  return response.data;
};

export const logout = async (userId: string) => {
  await API.post('/logout', { userId });
  removeUserData();
};

export const refreshAccessToken = async () => {
  const response = await API.post('/refresh');
  return response.data.accessToken;
};
