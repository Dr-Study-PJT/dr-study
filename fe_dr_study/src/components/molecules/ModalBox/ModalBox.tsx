'use client';

import Icon from '@/components/atoms/Icon/Icon';
import CreateConferenceForm from '@/components/organisms/forms/CreateConferenceForm/CreateConferenceForm';
import CreateConferenceProgress from '@/components/organisms/forms/CreateConferenceForm/CreateConferenceProgress';
import { RootState } from '@/store';
import { setCloseModal, setIsModalOpen } from '@/store/slices/modalSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ModalBoxProps {}

const ModalBox = ({}: ModalBoxProps) => {
    const pathname = usePathname();

    const dispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    const modalContent = useSelector((state: RootState) => state.modal.content);

    const closeModal = () => {
        dispatch(setCloseModal());
    };

    useEffect(() => {
        dispatch(setCloseModal());
    }, [pathname]);

    if (!isModalOpen) {
        return null;
    }

    // 렌더링 할 컴포넌트를 결정하는 함수
    const renderModalContent = () => {
        switch (modalContent) {
            case 'CreateConferenceForm':
                return <CreateConferenceProgress />;
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
                className="relative bg-gray-800 text-white  rounded-lg  max-w-lg mx-auto shadow-lg min-w[50%]"
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
