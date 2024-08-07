'use client';

import { notificationAPI as API } from '@/app/api/axiosInstanceManager';
import { POST } from '@/app/api/routeModule';
import { setNotifications } from '@/store/slices/notificationSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const fetchNotifications = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await POST({
                API: API,
                endPoint: '',
                body: '',
                isAuth: true,
            });
            const { data } = response;
            console.log('알림 요청 성공 => ', data);

            // 알림 목록을 리듀서에 저장
            dispatch(setNotifications(data)); // data가 알림 목록임을 가정
        } catch (error) {
            console.error('알림 요청 실패 => ', error);
        }
    };
};
