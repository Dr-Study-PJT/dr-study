'use client';

import { Button } from '@/components/atoms';
import axios from 'axios';
import React from 'react';
import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import { GET, POST } from '@/app/api/routeModule';

const CreateConferenceTemplate = () => {
    const handleCreateConference = async () => {
        const conferenceData = {
            studyGroupId: 1,
            aiModeratorId: 1,
            thumbnailImageId: 1,
            title: '정보처리기사 컨퍼런스',
            memberCapacity: 10,
        };

        try {
            const response = await POST({
                API: API, // as API 로 작성,
                endPoint: '',
                body: conferenceData, // body는 body
                isAuth: true, // 항상 true로
            });

            console.log('컨퍼런스 생성 성공:', response);
        } catch (error) {
            console.error('컨퍼런스 생성 실패:', error);
        }
    };

    const handleGetConferenceList = async () => {
        try {
            const response = await GET('v1/conferences', {
                params: '',
                isAuth: true,
                revalidateTime: 10,
            });
            console.log(response);
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
        }
    };
    return (
        <div>
            <h1> 컨퍼런스 생성 페이지 제목</h1>
            <Button onClick={handleGetConferenceList}>컨퍼런스 조회</Button>
            <Button onClick={handleCreateConference}>컨퍼런스 생성</Button>
        </div>
    );
};

export default CreateConferenceTemplate;
