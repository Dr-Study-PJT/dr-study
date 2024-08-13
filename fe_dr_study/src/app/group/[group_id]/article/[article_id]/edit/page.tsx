import { fetchingArticle } from '../_api/ssr';
import EditArticle from './_components/EditArticle';
import { PageContainer } from '@/components/atoms/PageContainer/PageContainer';
import { Box } from '@/components/atoms/Box/Box';

interface EditArticlePageProps {
    params: { group_id: number; article_id: number };
}

const EditArticlePage = async ({ params: { group_id, article_id } }: EditArticlePageProps) => {
    const article = await fetchingArticle(article_id);
    const initialData = { title: article.title, content: article.content };

    return (
        <PageContainer className="bg-[#36393E]">
            <Box variant="createStudyGroupStepBox">
                <EditArticle
                    groupId={group_id}
                    articleId={article_id}
                    initialData={initialData}
                />
            </Box>
        </PageContainer>
    );
};

export default EditArticlePage;
