// import { logout } from "../accounts/login/api/login";

import { POST } from '@/utils/axios/routeModule';
import { IMemberData } from '@/interfaces/members';
import { getSessionStorageItem } from '@/utils/sessionStorage';


import { authAPI as API } from './axiosInstanceManager';
import { logout } from '@/app/auth/_api/login'; 

export const fetchAccessToken = async (
    userId: string | null,
): Promise<string> => {
    try {
        const response = await POST({
            API,
            endPoint: 'refresh',
            isAuth: false,
        });
        const newAccessToken: string = response.data;
        return newAccessToken;
    } catch (error: any) {
        if (error.response && error.response.data === 'Expired token') {
            // Refresh 토큰이 만료된 경우
            // 사용자 데이터를 가져와서 로그아웃 함수를 호출합니다.
            if (userId) {
                await logout(userId);
                return '토큰 만료로 로그아웃됩니다.';
            }
            return '유저 데이터를 찾을 수 없습니다.';
        }
        return '토큰 갱신에 실패했습니다.';
    }
};

/*= ========================================================== */
// 기존의 recoil상태 또는 훅 사용 대신, 모든 API 인스턴스 & GET(= using fetch())를 위한 함수의 공통스코프에서 관리되는 파일에서 accessToken을 변수로 공통적으로 사용 및 관리하도록 설계

let currentAccessToken: string | null = null;
export const getAccessToken = (): string | null => currentAccessToken;
export const setAccessToken = (token: string | null) => {
    currentAccessToken = token;
};

export async function handleAuthentication(isAuth: boolean): Promise<any> {
    const headers: any = {};

    if (!isAuth) return headers;

    const memberData: IMemberData = getSessionStorageItem('memberData');
    if (!memberData) return headers;

    let token = getAccessToken();

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

    headers.Authorization = `Bearer ${token}`;
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
        return false; // 토큰이 유효하지 않거나 파싱 중 오류 시
    }
};
