'use client';
import React, { useState } from 'react';
import { Button } from '@/components/atoms';
import Modal from 'react-modal';
import { GET, POST } from '@/app/api/routeModule';
import { groupAPI as API } from '@/app/api/axiosInstanceManager';
import { TextareaWithLabel } from '@/components/molecules/TextareaWithLabel';
import { showToast } from '@/utils/toastUtil';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import { useRouter } from 'next/navigation';

interface GroupApplyButtonProps {
    groupId: string;
}

const GroupApplyButton: React.FC<GroupApplyButtonProps> = ({ groupId }) => {
    const memberData = getSessionStorageItem('memberData');

    const router = useRouter();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onClickApplyHandler = async () => {
        try {
            const response = await postGroupApply({
                studyGroupId: parseInt(groupId),
                applyMessage: message,
            });
            console.log(response.data);
            showToast('success', '가입 요청을 보냈습니다!');
        } catch {
            showToast('error', '이미 가입 요청을 보냈습니다.');
        }

        setModalIsOpen(false);
    };

    const openModal = () => {
        if (!memberData) {
            router.push('/auth/login?error=access_error');
        }
        setModalIsOpen(true);
    };

    return (
        <div>
            <Button onClick={() => openModal()}>스터디 가입 신청</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal !bg-dr-indigo-400"
                overlayClassName="modal-overlay"
                contentLabel="Study Group Application"
            >
                <h2 className="text-dr-header-1 font-bold text-gray-100 mb-4">
                    스터디 그룹 가입 신청
                </h2>
                <TextareaWithLabel
                    label="가입 신청 메시지"
                    placeholder="그룹장에게 보낼 가입 신청 메시지를 작성해주세요."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-3 h-7">
                    <Button
                        onClick={() => setModalIsOpen(false)}
                        className="mr-2"
                        color="dark"
                    >
                        취소
                    </Button>
                    <Button onClick={onClickApplyHandler}>제출</Button>
                </div>
            </Modal>
        </div>
    );
};

export default GroupApplyButton;

//

const postGroupApply = async ({
    studyGroupId,
    applyMessage,
}: {
    studyGroupId: number;
    applyMessage: string;
}) => {
    try {
        const response = await POST({
            API,
            endPoint: `${studyGroupId}/apply`,
            isAuth: true,
            body: {
                applyMessage,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('가입신청실패! : ', error);
    }
};
