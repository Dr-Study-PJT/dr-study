import Cookies from 'js-cookie';

import { ILogInReq } from '@/interfaces/members';
import {
    removeMemberData,
    setSessionStorageItem,
} from '@/utils/sessionStorage';

import { authAPI as API } from '@/app/api/axiosInstanceManager';
import { GET } from '@/app/api/routeModule';
import { setAccessToken } from '@/app/api/jwt';

API.interceptors.response.use(
    (response) => {
        if (
            response.config.url === '/login' ||
            response.config.url === '/access-token'
        ) {
            const { accessToken, refreshToken } = response.data;
            if (accessToken) {
                Cookies.set('access_token', accessToken);
            }
            if (refreshToken) {
                Cookies.set('refresh_token', refreshToken);
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
    console.log(response.data.data);
    setAccessToken(response.data.data.tokens.accessToken);
    setSessionStorageItem('memberData', {
        id: response.data.data.member.id,
        email: response.data.data.member.email,
        nickname: response.data.data.member.nickname,
    });

    return response.data;
};

export const getLoginedMemberInfo = async () => {
    try {
        const response = await GET('v1/members', {
            isAuth: true,
        });
        return response.data;
    } catch {
        console.log('로그인사용자 정보 가져오기 실패');
    }
};

export const logout = async (memberId: string) => {
    await API.post('/logout', { memberId });
    removeMemberData();
};

export const refreshAccessToken = async () => {
    const response = await API.post('/access-token');
    return response.data.accessToken;
};
