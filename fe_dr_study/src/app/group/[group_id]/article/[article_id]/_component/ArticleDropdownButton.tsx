import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const ArticleDropdownButton: React.FC<{
    articleId: number;
    onDelete: () => void;
    groupId: number; // groupId를 props로 받습니다.
}> = ({ articleId, onDelete, groupId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
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
                    <div className="flex flex-col py-1">
                        <Link
                            href={`/group/${groupId}/article/${articleId}/edit`}
                        >
                            <span className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                                수정
                            </span>
                        </Link>
                        <Link href={`/group/${groupId}`} onClick={handleDelete}>
                            <span className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer">
                                삭제
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleDropdownButton;
