import { fetchingArticle } from './ssr';
import ArticleDetailClient from './ArticleDetailClient';

export default async function ArticleDetailPage({
    params,
}: {
    params: { articleId: string };
}) {
    const articleId = Number(params.articleId);
    const article = await fetchingArticle(articleId);

    return <ArticleDetailClient articleId={article} />;
}
