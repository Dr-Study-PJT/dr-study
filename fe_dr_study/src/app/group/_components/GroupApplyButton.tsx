'use client';
import React, { useState } from 'react';
import { Button } from '@/components/atoms';
import Modal from 'react-modal';
import { GET, POST } from '@/app/api/routeModule';
import { groupAPI as API } from '@/app/api/axiosInstanceManager';

interface GroupApplyButtonProps {
    groupId: string;
}

const GroupApplyButton: React.FC<GroupApplyButtonProps> = ({ groupId }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const onClickApplyHandler = async () => {
        await postGroupAdmissionApply({
            studyGroupId: parseInt(groupId),
            message: message,
        });
        setModalIsOpen(false);
    };

    return (
        <div>
            <Button onClick={() => setModalIsOpen(true)}>
                스터디 가입 신청
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal"
                overlayClassName="modal-overlay"
                contentLabel="Study Group Application"
            >
                <h2 className="text-lg font-semibold mb-4">
                    스터디 그룹 가입 신청
                </h2>
                <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded"
                    placeholder="가입 신청 메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => setModalIsOpen(false)}
                        className="mr-2"
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

const postGroupAdmissionApply = async ({
    studyGroupId,
    message,
}: {
    studyGroupId: number;
    message: string;
}) => {
    try {
        const response = await POST({
            API,
            endPoint: 'admission/apply',
            isAuth: true,
            body: {
                studyGroupId,
                message,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('가입신청실패! : ', error);
    }
};
