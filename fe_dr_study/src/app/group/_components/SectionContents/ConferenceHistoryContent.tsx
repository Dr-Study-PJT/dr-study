'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trimString } from '@/utils/trimString';
import { ConferenceWithMembersData } from '../../[group_id]/_types';
import { IConference } from '../../[group_id]/dummy';
import { Button } from '@/components/atoms';
import Image from 'next/image';
import { FaUsers } from 'react-icons/fa';
import {
    getConferenceCardClass,
    renderTimeInfo,
} from '../ConferenceWithMembers';

interface ConferenceHistoryContentProps {
    conferences: IConference[];
}

const ConferenceHistoryContent: React.FC<ConferenceHistoryContentProps> = ({
    conferences,
}) => {
    const [closedConferences, setClosedConferences] = useState<IConference[]>(
        [],
    );

    const router = useRouter();

    useEffect(() => {
        const filteredConferences = conferences.filter(
            (conference) => !conference.closeTime,
        );
        setClosedConferences(filteredConferences);
    }, [conferences]);

    const handleConferenceClick = (conferenceId: number) => {
        router.push(`/conference/${conferenceId}/waiting-room`);
    };

    const handleJoinConferenceClick = (
        e: React.MouseEvent<HTMLElement>,
        conferenceId: number,
    ) => {
        e.stopPropagation();
        router.push(`/conference/${conferenceId}/waiting-room`);
    };

    return (
        <div className="LIST-CONFERENCE-TODAY space-y-4">
            {closedConferences?.map((conference, index) => (
                <div
                    key={index}
                    onClick={() => handleConferenceClick(conference.id)}
                    className={`CONFERENCE-CARD h-max min-h-32 p-6 rounded-lg shadow-md cursor-pointer transition-colors duration-200 ${getConferenceCardClass(conference)}`}
                >
                    <div className="flex flex-col justify-between mb-2">
                        <div className="text-white font-bold text-lg">
                            {conference.title}
                        </div>
                        <div className="text-dr-gray-100 text-dr-body-4">
                            {renderTimeInfo(conference)}
                        </div>
                    </div>

                    <div className="mt-4 w-full flex flex-row justify-between items-end">
                        <div className="BL-INFO-MEMBER-LIST flex flex-col gap-1">
                            <div className="flex flex-row gap-1 text-dr-gray-300">
                                <FaUsers className="text-dr-gray-300 text-dr-body-3 self-center pb-0" />
                                <div className="text-dr-body-4 text-dr-gray-300">
                                    {`${conference.participants.length} / ${conference.memberCapacity}`}
                                </div>
                            </div>

                            <ul className="LIST-MEMBER-IMAGES flex flex-row gap-1">
                                {conference.participants
                                    .slice(0, 3)
                                    .map((participant, i) => (
                                        <li key={i}>
                                            <div className="relative overflow-hidden w-10 h-10 rounded-xl">
                                                <Image
                                                    alt="avatar"
                                                    src={participant.imageUrl}
                                                    layout="fill"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                {conference.participants.length > 3 && (
                                    <li key="extra">
                                        <button className="relative overflow-hidden w-10 h-10 rounded-xl border-[1px] border-dr-coral-100 bg-dr-coral-200 hover:bg-dr-coral-100 transition-colors duration-200 flex items-center justify-center">
                                            <span className="text-white font-semibold text-dr-body-3">
                                                +
                                                {conference.participants
                                                    .length - 3}
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ConferenceHistoryContent;

// const ArticleListContent: React.FC<ArticleListContentProps> = ({ groupId }) => {
//     const [articles, setArticles] = useState<
//         IArticleListResponse['data']['content']
//     >([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const router = useRouter();

//     useEffect(() => {
//         fetchArticles(currentPage);
//     }, [currentPage]);

//     const fetchArticles = async (page: number) => {
//         try {
//             const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_HOST}/v1/articles/groups/${groupId}?page=${page}&size=5`,
//             );
//             const data: IArticleListResponse = await response.json();
//             setArticles(data.data.content);
//             setTotalPages(data.data.totalPages);
//         } catch (error) {
//             console.error('에러: 게시글 못가져옴;; :', error);
//         }
//     };

//     return (
//         <div className="bg-dr-dark-200 p-6 rounded-xl border-[1px] border-dr-gray-500 animate-fadeIn">
//             <div className="flex flex-col justify-start gap-4">
//                 {articles.map((article, index) => (
//                     <div
//                         onClick={() => {
//                             router.push(
//                                 `/group/${groupId}/article/${article.id ? article.id : index}`,
//                             );
//                         }}
//                         key={article.id ? article.id : index}
//                         className="p-4 bg-dr-dark-100 hover:bg-dr-dark-300 transition-colors duration-200 border-[1px] border-dr-gray-500 rounded-lg flex flex-col gap-4 cursor-pointer"
//                     >
//                         <div className="flex justify-between mb-2">
//                             <div className="font-bold text-lg text-white">
//                                 {article.title}
//                             </div>
//                             <div className="text-sm text-gray-400">
//                                 {new Date(
//                                     article.createdAt,
//                                 ).toLocaleDateString()}
//                             </div>
//                         </div>
//                         <div className="text-sm text-gray-300 mb-2 w-2/3">
//                             {trimString(article.content, 45)}
//                         </div>
//                         <div className="flex space-x-2">
//                             {article.tags.map((tag, tagIndex) => (
//                                 <span
//                                     key={tagIndex}
//                                     className="px-3 py-1 bg-dr-gray-500 text-dr-body-4 rounded-full text-dr-coral-100 cursor-pointer hover:font-bold transition-all duration-200"
//                                 >
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//                 <div className="mt-4 flex justify-center w-full bg-dr-dark-300 py-1 rounded-md border-[1px] border-dr-gray-300">
//                     <div className="flex space-x-4">
//                         {[...Array(totalPages)].map((_, index) => (
//                             <button
//                                 key={index}
//                                 className={`text-dr-gray-400 w-6 text-center hover:text-dr-white transition-colors duration-150 ${currentPage === index ? 'text-dr-white' : ''}`}
//                                 onClick={() => setCurrentPage(index)}
//                             >
//                                 {index + 1}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ArticleListContent;

// interface ArticleListContentProps {
//     groupId: string;
// }

// export interface IArticleMemberInfo {
//     id: number;
//     email: string;
//     nickname: string;
//     imageUrl: string;
//     regDate?: string | null;
//     leavedDate?: string | null;
//     leaved: boolean;
// }

// export interface IArticleComment {
//     id: number;
//     content: string;
//     createdAt: string;
//     memberInfo: IArticleMemberInfo;
// }

// export interface IArticle {
//     id: number;
//     title: string;
//     content: string;
//     createdAt: string;
//     viewCount: number;
//     memberInfo: IArticleMemberInfo;
//     comments: IArticleComment[];
//     tags: string[];
// }

// export interface IArticleListResponse {
//     message: string;
//     data: {
//         totalElements: number;
//         totalPages: number;
//         pageable: {
//             pageNumber: number;
//             pageSize: number;
//             sort: {
//                 sorted: boolean;
//                 empty: boolean;
//                 unsorted: boolean;
//             };
//             offset: number;
//             paged: boolean;
//             unpaged: boolean;
//         };
//         first: boolean;
//         last: boolean;
//         sort: {
//             sorted: boolean;
//             empty: boolean;
//             unsorted: boolean;
//         };
//         size: number;
//         content: IArticle[];
//         number: number;
//         numberOfElements: number;
//         empty: boolean;
//     };
// }
