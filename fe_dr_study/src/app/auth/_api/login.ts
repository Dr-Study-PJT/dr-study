import Cookies from 'js-cookie';

import { ILogInReq } from '@/interfaces/members';
import {
    removeMemberData,
    setSessionStorageItem,
} from '@/utils/sessionStorage';

import { authAPI as API } from '@/utils/axios/axiosInstanceManager';

API.interceptors.response.use(
    (response) => {
        if (
            response.config.url === '/login' ||
            response.config.url === '/refresh'
        ) {
            const { accessToken } = response.data;
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

export const login = async (memerData: ILogInReq) => {
    const response = await API.post(
        'https://api.dr-study.kro.kr/v1/auth/login',
        memerData,
    );
    setSessionStorageItem('memberData', {
        id: response.data.id,
        email: response.data.email,
        nickname: response.data.nickname,
    });
    return response.data;
};

export const logout = async (memberId: string) => {
    await API.post('/logout', { memberId });
    removeMemberData();
};

export const refreshAccessToken = async () => {
    const response = await API.post('/refresh');
    return response.data.accessToken;
};
