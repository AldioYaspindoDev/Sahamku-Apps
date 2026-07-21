import { api } from "./api"

export const ArticleServie = {
    getArticle: async () => {
        return await api.get('/news/');
    },

    getArticleByid: async (id) => {
        return await api.get(`/news/${id}`, id)
    }
}