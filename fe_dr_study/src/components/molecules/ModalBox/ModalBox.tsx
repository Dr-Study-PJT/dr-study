'use client';

import Icon from '@/components/atoms/Icon/Icon';
import CreateConferenceForm from '@/components/organisms/CreateConferenceForm/CreateConferenceForm';
import { RootState } from '@/store';
import { setIsModalOpen } from '@/store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

interface ModalBoxProps {}

const ModalBox = ({}: ModalBoxProps) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    const modalContent = useSelector((state: RootState) => state.modal.content);

    if (!isModalOpen) {
        return null;
    }

    const closeModal = () => {
        dispatch(setIsModalOpen());
    };

    // 렌더링 할 컴포넌트를 결정하는 함수
    const renderModalContent = () => {
        switch (modalContent) {
            case 'CreateConferenceForm':
                return <CreateConferenceForm />;
            default:
                return null;
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="relative min-w-[50%] bg-gray-800 text-white border-2 border-blue-500 rounded-lg p-5 max-w-lg mx-auto shadow-lg"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
            >
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={closeModal}
                >
                    <Icon icon="xMark" size="sm" />
                </button>
                {renderModalContent()}
            </div>
        </div>
    );
};

export default ModalBox;
