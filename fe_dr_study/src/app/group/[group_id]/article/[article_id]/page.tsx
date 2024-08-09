// page.tsx
import { fetchingArticle } from './_api/ssr';
import ArticleDetail from './_component/ArticleDetailSsr';
import ArticleCommentsList from './_component/ArticleCommentsListSsr';
import ArticleCommentsForm from './_component/ArticleCommentsFormCsr';

export default async function ArticleDetailPage({
    params,
}: {
    params: { group_id: string; article_id: string };
}) {
    const groupId = params.group_id;
    const articleId = params.article_id;
    const article = await fetchingArticle(articleId);

    return (
        <div>
            {/* ArticleDetail은 ssr로 팜 */}
            <ArticleDetail article={article} />
            {/* article.comments가 존재할 때만 ArticleCommentsList 렌더링 */}

            {/* ArticleCommentsList는 ssr로 팜 */}
            {article.comments ? (
                <ArticleCommentsList comments={article.comments} />
            ) : (
                <div>No comments available</div>
            )}
            {/* ArticleCommentsForm은 csr로 팜 */}
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
