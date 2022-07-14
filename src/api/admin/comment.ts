import { baseService } from '../base'
export const CommentService: any = {}

CommentService.deleteComment = (id:number) => {
  return baseService({
    url: `/comments/delete`,
    data: {
      id
    }
  })
}

interface CommentsQueryInput {
  keywords: string,
  articleId: number,
  pageIndex: number,
  pageSize: number
}

CommentService.queryComments = (data:CommentsQueryInput) => {
  return baseService({
    url: '/comments/query',
    data
  })
}