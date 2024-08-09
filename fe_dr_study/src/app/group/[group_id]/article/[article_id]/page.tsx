import { fetchingArticle } from './_api/ssr';
import ArticleDetail from './_component/ArticleDetailSsr';
import ArticleCommentsList from './_component/ArticleCommentsListCsr';
import ArticleCommentsForm from './_component/ArticleCommentsFormCsr';

export default async function ArticleDetailPage({
    params,
}: {
    params: { group_id: string; article_id: string };
}) {
    const groupId = params.group_id;
    const articleId = params.article_id;

    try {
        const article = await fetchingArticle(articleId);

        if (!article) {
            throw new Error('Article not found');
        }

        return (
            <div>
                {/* ArticleDetail은 ssr로 팜 */}
                <ArticleDetail article={article} />
                {/* ArticleCommentsForm은 csr로 팜 */}
                <ArticleCommentsForm articleId={articleId} />
                {/* article.comments가 존재할 때만 ArticleCommentsList 렌더링 */}
                {article.comments && article.comments.length > 0 ? (
                    <ArticleCommentsList comments={article.comments} />
                ) : (
                    <div>No comments available</div>
                )}
            </div>
        );
    } catch (error: any) {
        console.error('Error fetching article:', error);

        return (
            <div>
                <p>Error loading article: {error.message}</p>
            </div>
        );
    }
}