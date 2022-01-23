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

interface ArticleCreateInput {
  title: string,
  content: string,
  tags: string,
  type: string
}

ArticleService.createArticle = (data: ArticleCreateInput) => {
  return baseService({
    url: '/articles/create',
    data
  })
}

interface ArticleUpdateInput {
  title: string,
  content: string,
  tags: string,
  type: string
}

ArticleService.updateArticle = (data: ArticleUpdateInput) => {
  return baseService({
    url: '/articles/update',
    data
  })
}

ArticleService.queryTypes = () => {
  return baseService({
    url: '/articles/types',
    method: 'get'
  })
}