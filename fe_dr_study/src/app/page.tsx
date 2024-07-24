import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import CreateStudyGroupProgress from '@/components/organisms/forms/CreateStudyGroupProgress/CreateStudyGroupProgress';
import React from 'react';

const MyPage: React.FC = () => {
    return (
        <PageContainer className="bg-[#36393E]">
            <CreateStudyGroupProgress />
        </PageContainer>
    );
};

export default MyPage;
