import React, { useEffect, useState, useRef } from 'react';
import { handleCommentUpdate, handleArticleDelete } from '../_handler';

const CommentDropdownButton: React.FC<{
    onEdit: () => void;
    onDelete: () => void;
}> = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !(dropdownRef.current as any).contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex flex-row justify-end items-end gap-x-2 text-white p-2 hover:bg-gray-700 rounded"
            >
                ⋮
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-40 origin-top-right bg-gray-800 border border-gray-700 rounded-md shadow-lg"
                >
                    <div className="py-1">
                        <button
                            onClick={onEdit}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            수정
                        </button>
                        <button
                            onClick={onDelete}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// 사용 예시 컴포넌트
const CommentDropdownButtonComponent: React.FC<{ articleId: number }> = ({ articleId }) => {
    const handleEdit = () => {
        // 예제 핸들러 - 실제 수정 기능 구현
        handleCommentUpdate(articleId, '새로운 내용'); // 수정 필요!
    };

    const handleDelete = () => {
        // 예제 핸들러 - 실제 삭제 기능 구현
        handleArticleDelete(articleId);
    };

    return (
        <CommentDropdownButton
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};

export default CommentDropdownButtonComponent; // 수정됨!
