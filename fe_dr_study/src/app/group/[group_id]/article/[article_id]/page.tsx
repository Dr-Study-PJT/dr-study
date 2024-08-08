// page.tsx
import { fetchingArticle } from './_api/ssr';
import ArticleDetail from './_component/\bArticleDetailSsr';
import ArticleCommentsList from './_component/ArticleCommentsListSsr';
import ArticleCommentsForm from './_component/ArticleCommentsFormCsr';

export default async function ArticleDetailPage({
    params,
}: {
    params: { article_id: string };
}) {
    const articleId = Number(params.article_id);
    const article = await fetchingArticle(articleId);

    // Article 객체가 없을 때 예외 처리
    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div>
            <ArticleDetail article={article} />
            {/* article.comments가 존재할 때만 ArticleCommentsList 렌더링 */}
            {article.comments ? (
                <ArticleCommentsList comments={article.comments} />
            ) : (
                <div>No comments available</div>
            )}
            <ArticleCommentsForm articleId={articleId} />
        </div>
    );
}

// // page.tsx
// import { fetchingArticle } from './_api/ssr';
// import ArticleDetail from './_component/\bArticleDetailSsr';
// import ArticleCommentsList from './_component/ArticleCommentsListSsr';
// import ArticleCommentsForm from './_component/ArticleCommentsFormCsr';

// export default async function ArticleDetailPage({
//     params,
// }: {
//     params: { article_id: string };
// }) {
//     const articleId = Number(params.article_id);
//     const article = await fetchingArticle(articleId);

//     return (
//         <div>
//             <ArticleDetail article={article} />
//             <ArticleCommentsList comments={article.comments} />
//             <ArticleCommentsForm articleId={articleId} />
//         </div>
//     );
// }
