import { baseService } from '../base'
export const ArticleService: any = {}

ArticleService.getArticle = (id: number) => {
  return baseService({
    url: `/articles/get/${id}`,
    method: 'get'
  })
}

ArticleService.deleteArticle = (id:number) => {
  return baseService({
    url: `/articles/delete`,
    data: {
      id
    }
  })
}

interface ArticlesQueryInput {
  keywords: string,
  type: string,
  pageIndex: number,
  pageSize: number
}

ArticleService.queryArticles = (data:ArticlesQueryInput) => {
  return baseService({
    url: '/articles/query',
    data
  })
}