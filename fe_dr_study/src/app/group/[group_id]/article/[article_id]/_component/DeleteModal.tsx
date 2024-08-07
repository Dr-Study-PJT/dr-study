import React from 'react';
import { Button } from '@/components/atoms';

interface DeleteModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="bg-black bg-opacity-50 absolute inset-0"
                onClick={onClose}
            ></div>
            <div className="bg-gray-800 rounded-lg p-4 z-50">
                <p className="text-white mb-4">삭제 하시겠습니까?</p>
                <div className="flex justify-end space-x-2">
                    <Button color="gray" onClick={onClose}>
                        취소
                    </Button>
                    <Button color="red" onClick={onDelete}>
                        삭제
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
