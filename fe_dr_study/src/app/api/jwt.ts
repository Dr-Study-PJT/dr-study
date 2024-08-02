// fe_dr_study/src/app/api/jwt.ts
import { POST } from '@/app/api/routeModule';
import { IMemberData } from '@/interfaces/members';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { authAPI as API } from './axiosInstanceManager';
import { logout } from '@/app/auth/_api/login';

// 로컬 스토리지에서 액세스 토큰을 저장하고 불러오는 유틸리티 함수 추가
const ACCESS_TOKEN_KEY = 'access_token';

export const saveAccessTokenToLocalStorage = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const fetchAccessToken = async (
    memberId: string | null,
): Promise<string> => {
    const member = getSessionStorageItem('memberData');
    try {
        const response = await POST({
            API,
            endPoint: 'access-token',
            isAuth: false,
            body: {
                email: member.email,
            },
        });
        const newAccessToken: string = response.data;
        return newAccessToken;
    } catch (error: any) {
        if (error.response && error.response.data === 'Expired token') {
            // Refresh 토큰이 만료된 경우
            if (memberId) {
                await logout(memberId);
                return '토큰 만료로 로그아웃됩니다.';
            }
            return '유저 데이터를 찾을 수 없습니다.';
        }
        return '토큰 갱신에 실패했습니다.';
    }
};

let currentAccessToken: string | null = null;
export const getAccessToken = (): string | null => currentAccessToken;
export const setAccessToken = (token: string | null) => {
    currentAccessToken = token;
    if (token) {
        saveAccessTokenToLocalStorage(token);
    }
};

export async function handleAuthentication(isAuth: boolean): Promise<any> {
    const headers: any = {};

    if (!isAuth) return headers;

    const memberData: IMemberData = getSessionStorageItem('memberData');
    if (!memberData) return headers;

    let token = getAccessToken();

    if (!token) {
        token = getAccessTokenFromLocalStorage();
    }

    if (!token || !isTokenValid(token)) {
        try {
            const newToken = await fetchAccessToken(memberData.email);
            setAccessToken(newToken);
            token = newToken;
        } catch (error) {
            console.error(
                '새로운 access token을 가져오는데 실패했습니다.:',
                error,
            );
            throw error;
        }
    }

    headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

const isTokenValid = (token: string): boolean => {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const currentTime = Math.floor(Date.now() / 1000);

        return decodedPayload.exp > currentTime;
    } catch (e) {
        console.error('Error while checking token:', e);
        return false;
    }
};
