import { fetchingArticle } from './_api/ssr';
import ArticleDetail from './_component/ArticleDetailSsr';
import ArticleComments from './_component/ArticleCommentsMerged';

export default async function ArticleDetailPage({
    params,
}: {
    params: { group_id: string; article_id: string };
}) {
    const groupId = params.group_id;
    const articleId = params.article_id;

    const article = await fetchingArticle(articleId);
    console.log('article', article);
    if (!article) {
        throw new Error('Article not found');
    }

    return (
        <div className="w-full h-full bg-dr-indigo-100">
            <div className="flex flex-col justify-center items-center content-center p-[5rem]">
                <ArticleDetail article={article} />
                <ArticleComments article={article} />
            </div>
        </div>
    );
}
