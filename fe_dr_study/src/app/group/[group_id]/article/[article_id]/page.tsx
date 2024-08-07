import { Button, Heading, Span } from '@/components/atoms';
import { Box } from '@/components/atoms/Box/Box';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { readingArticle } from './_api/ssr';
import { register } from '@/app/auth/register/_api/register';
// import CommentForm from './_api/CommentForm';

interface MemberInfo {
    id: number;
    email: string;
    nickname: string;
    imageUrl: string;
    regDate: string | null;
    leavedDate: string | null;
    leaved: boolean;
}

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    memberInfo: MemberInfo;
}

interface Article {
    title: string;
    content: string;
    createdAt: string;
    viewCount: number;
    memberInfo: MemberInfo;
    comments: Comment[];
    tags: string[];
}

const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateString));
};

export default async function ArticleDetailPage({
    params,
}: {
    params: { article_id: string };
}) {
    const articleId = params.article_id;
    const article = await readingArticle(articleId);

    const errors = {
        comment_content: null,
    };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="articleDetail" className="">
                <Heading
                    variant="h2"
                    color="white"
                    className="flex flex-row justify-center items-center"
                >
                    {article.title}
                </Heading>
                <Box
                    variant="articleCreateAtAndViews"
                    className="flex flex-row justify-between"
                >
                    <Heading
                        variant="h5" // 이거 필요없는 거임.
                        className="text-gray-400 text-sm"
                    >
                        {formatDate(article.createdAt)}
                    </Heading>
                    <Heading
                        variant="h5"
                        className="text-gray-400 text-sm"
                    >
                        조회수: {article.viewCount}
                    </Heading>
                </Box>
                <div className="w-1/2 border-t border-[#5E658B]"></div>
                <Box variant="articleContentsSection">
                    <Span variant="b3" color="white">
                        {article.content}
                    </Span>
                </Box>
                <Box variant="commentCreateContainer">
                    <img
                        src="/path/to/your/image.jpg"
                        alt="author"
                        className="flex flex-row rounded-full w-auto h-full mr-2 object-cover"
                    />
                    <form
                        // onSubmit={handleSubmit(() => {})}
                        className="w-full flex items-center"
                    >
                        <div className="flex flex-col w-full">
                            <InputWithLabelAndError
                                label={''}
                                id="comment_content"
                                placeholder="댓글을 입력해주세요."
                                {...register('comment_content', {
                                    required: '댓글 내용을 입력해주세요.',
                                })}
                                error={errors.comment_content}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                                <Button color="red">취소</Button>
                                <Button type="submit">댓글 작성</Button>
                            </div>
                        </div>
                    </form>
                </Box>
                <Box variant="articleCommentsListContainer">
                    <Box variant="commentPDP">
                        {article.comments.map((comment, index) => (
                            <Box key={index} className="flex flex-row">
                                <div className="w-full flex flex-col">
                                    <Box variant="commentPDPHeader">
                                        <Box variant="commentProfileLeft">
                                            <img
                                                src={
                                                    comment.memberInfo.imageUrl
                                                }
                                                alt="author"
                                                className="flex flex-row justify-center rounded-full w-[60px] h-[60px] mr-2 object-cover"
                                            />
                                            <Box variant="commentProfileWithNickAndTime">
                                                <Span color="white">
                                                    {
                                                        comment.memberInfo
                                                            .nickname
                                                    }
                                                </Span>
                                                <Span color="white">
                                                    {formatDate(
                                                        comment.createdAt,
                                                    )}
                                                </Span>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        variant="commentText"
                                        className="w-full"
                                    >
                                        <Span color="white">
                                            {comment.content}
                                        </Span>
                                    </Box>
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <Button color="red">삭제</Button>
                                        <Button type="submit">수정</Button>
                                    </div>
                                </div>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </PageContainer>
    );
}
