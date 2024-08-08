// ArticleCommentsList.tsx
import React from 'react';
import { Box } from '@/components/atoms/Box/Box';
import { Button, Span } from '@/components/atoms';
import { CommentData } from '../_types';
import { useHandlers } from '../_handler';

const formatDate = (dateString: string | number | Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
};

interface ArticleCommentsListProps {
    comments: CommentData[];
}

const ArticleCommentsList: React.FC<ArticleCommentsListProps> = ({
    comments,
}) => {
        const { handleCommentDelete, handleCommentUpdate } = useHandlers();

    return (
        <Box variant="articleCommentsListContainer">
            <Box variant="commentPDP">
                {comments.map((comment, index) => (
                    <Box key={index} className="flex flex-row">
                        <div className="w-full flex flex-col">
                            <Box variant="commentPDPHeader">
                                <Box variant="commentProfileLeft">
                                    <img
                                        src={comment.memberInfo.imageUrl ?? ''}
                                        alt="author"
                                        className="flex flex-row justify-center rounded-full w-[60px] h-[60px] mr-2 object-cover"
                                    />
                                    <Box variant="commentProfileWithNickAndTime">
                                        <Span color="white">
                                            {String(
                                                comment.memberInfo.nickname,
                                            )}
                                        </Span>
                                        <Span color="white">
                                            {formatDate(comment.createdAt)}
                                        </Span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box variant="commentText" className="w-full">
                                <Span color="white">
                                    {String(comment.content)}
                                </Span>
                            </Box>
                            <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                    color="red"
                                    onClick={() =>
                                        handleCommentDelete(comment.id)
                                    }
                                >
                                    삭제
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        handleCommentUpdate(
                                            comment.id,
                                            String(comment.content),
                                        )
                                    }
                                >
                                    수정
                                </Button>
                            </div>
                        </div>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ArticleCommentsList;
