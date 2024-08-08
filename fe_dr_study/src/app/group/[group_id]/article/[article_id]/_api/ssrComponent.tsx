import { fetchingArticle } from './ssr';
import ArticleDetailClient from './ArticleDetailClient';

export default async function ArticleDetailPage({
    params,
}: {
    params: { article_id: string };
}) {
    const articleId = Number(params.article_id);
    const article = await fetchingArticle(articleId);

    return <ArticleDetailClient article={article} />;
}
