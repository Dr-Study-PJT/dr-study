import Cookies from 'js-cookie';

import { ILogInReq } from '@/interfaces/members';
import {
    removeMemberData,
    setSessionStorageItem,
} from '@/utils/sessionStorage';

import { authAPI as API } from '@/utils/axios/axiosInstanceManager';
import { GET } from '@/utils/axios/routeModule';

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
    const response = await API.post('/login', memerData);
    console.log('멤버데이터:' + Object.entries(response.data.data));
    setSessionStorageItem('memberData', {
        id: response.data.data.id,
        email: response.data.data.email,
        nickname: response.data.data.nickname,
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
    const response = await API.post('/refresh');
    return response.data.accessToken;
};
