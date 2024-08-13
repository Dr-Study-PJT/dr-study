import { fetchingArticle } from './_api/ssr';
import ArticleDetail from './_component/ArticleDetailSsr';
import { ArticleComments } from './_component/ArticleCommentsMerged';

export default async function ArticleDetailPage({
    params,
}: {
    params: { group_id: number; article_id: number };
}) {
    const groupId = params.group_id;
    const articleId = params.article_id;
    console.log('article 가져오는 내용 확인해봐');

    const article = await fetchingArticle(articleId);
    console.log('article', article);
    if (!article) {
        throw new Error('Article not found');
    }

    const memberInfo = article.memberInfo; // memberInfo 가져오기

    return (
        <div className="w-full h-full bg-dr-indigo-100">
            <div className="flex flex-col justify-center items-center content-center p-[5rem]">
                <ArticleDetail article={article} groupId={groupId} /> {/* groupId를 전달 */}
                <ArticleComments article={article} memberInfo={memberInfo} />
            </div>
        </div>
    );
}
