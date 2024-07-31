'use client';

import { Button } from '@/components/atoms';
import axios from 'axios';
import React from 'react';

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
            const response = await axios.post(
                'https://api.dr-study.kro.kr/v1/conferences',
                conferenceData,
            );
            console.log('컨퍼런스 생성 성공:', response.data);
        } catch (error) {
            console.error('컨퍼런스 생성 실패:', error);
        }
    };

    const handleGetConferenceList = async () => {
        try {
            const response = await axios.get(
                'https://api.dr-study.kro.kr/v1/conferences',
            );
            console.log('컨퍼런스 조회 성공:', response.data);
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
