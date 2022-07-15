import { useState, FC, useEffect } from 'react'
import { CommentService } from "../../api/admin/comment";
import { Input, Pagination, Popconfirm, Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"

import './List.less';

const Comments: FC = () => {
  interface Comment {
    id: number,
    content: string,
    type: string,
    tags: string,
    article_id: number,
    created_on: number,
    like_count: number
  }

  const columns:any[] = [
    {
      title: '内容',
      key: 'content',
      responsive: ['md'],
      render: (comment: Comment) => <div>
        <span className="title" onClick={() => window.open(`https://www.zhouwenkai.com/blog/detail?id=${comment.article_id}`)}>{comment.content}</span>
      </div>
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 180
    },
    {
      title: '回复人',
      dataIndex: 'author',
      key: 'author',
      width: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'created_on',
      key: 'created_on',
      defaultSortOrder: 'descend',
      sorter: (a:Comment, b:Comment) => a.created_on - b.created_on,
      width: 175
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (comment: Comment) => <div className="btn-group">
        <Popconfirm
          title={`是否确认删除该评论 ？`}
          onConfirm={() => handleDeleteConfirm(comment.id)}
          okText="删除"
          cancelText="取消"
        >
          <DeleteOutlined className="btn-delete" />
        </Popconfirm>
      </div>
    },
  ]
  const { Search } = Input;

  const [comments, setComments] = useState<Comment[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [queryInput, setQueryInput] = useState({
    articleId: 0,
    keywords: "",
    pageIndex: 1,
    pageSize: 10
  })

  useEffect(() => {
    CommentService.queryComments(queryInput).then((res: any) => {
      setComments([...res.result.items])
      setTotalCount(res.result.totalCount)
      setTableLoading(false)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [queryInput])

  const loadPageDatas = () => {
    setTableLoading(true)
    CommentService.queryComments(queryInput).then((res: any) => {
      setComments([...res.result.items])
      setTotalCount(res.result.totalCount)
      setTableLoading(false)
    }).catch((err: any) => {
        console.error(err)
    })
  }

  const handleDeleteConfirm = (id: number) => {
    CommentService.deleteComment(id).then((res: any)=>{
      if(res.code === 200) {
        setQueryInput({
          ...queryInput,
          pageIndex: 1
        })
        
        loadPageDatas()
      }
    }).catch((err: any) => {
      console.error(err)
    })
  }

  const handleChange = (pageIndex: number, pageSize: number) => {
    setQueryInput({...queryInput, pageIndex, pageSize})
  }

  const handleSearch = (v:string) => {
    setQueryInput({...queryInput, keywords: v})
  }

  return (
    <div className="admin-comment admin-comment">
      <div className="admin-comment-title">
        评论管理
      </div>

      <div className="admin-comment-header">
        <div className="admin-comment-filter">          
          <Search placeholder="请输入评论" className="filter" onSearch={handleSearch}></Search>
        </div>
      </div>

      <div className="article-list">
        <Table bordered rowKey="id" dataSource={comments} columns={columns} pagination={false} loading={tableLoading}></Table>
      </div>

      <Pagination current={queryInput.pageIndex} total={totalCount} onChange={handleChange} showSizeChanger pageSizeOptions={['10', '20', '30']}></Pagination>
    </div>
  )
}

export default Comments;