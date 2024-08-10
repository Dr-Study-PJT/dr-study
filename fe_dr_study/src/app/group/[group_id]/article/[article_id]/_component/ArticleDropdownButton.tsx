import React, { useEffect, useRef, useState } from 'react';

const ArticleDropdownButton: React.FC<{
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

    const handleEdit = () => {
        onEdit();
        setIsOpen(false); // 드롭다운 닫기
    };

    const handleDelete = () => {
        onDelete();
        setIsOpen(false); // 드롭다운 닫기
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
                            onClick={handleEdit}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
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

export default ArticleDropdownButton;
