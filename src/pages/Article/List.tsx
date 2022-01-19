import { useState, FC, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ArticleService } from "../../api/admin/article";
import { Button, Pagination, Popconfirm, Table } from 'antd';
import { DeleteOutlined, FormOutlined, PlusCircleOutlined } from "@ant-design/icons"

import './List.scss';

const Articles: FC = () => {
  interface Article {
    title: string,
    content: string,
    type: string,
    tags: string,
    id: number,
    created_on: number,
    modified_on: number
  }

  const columns:any[] = [
    {
      title: '标题',
      key: 'title',
      responsive: ['md'],
      render: (article: Article) => <div>
        <span className="title" onClick={() => navigate(`/article/edit/${article.id}`)}>{article.title}</span>
      </div>
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 180
    },
    {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'created_on',
      defaultSortOrder: 'descend',
      sorter: (a:Article, b:Article) => a.created_on - b.created_on,
      render: (created_on: Article['created_on']) => {return new Date(created_on).toLocaleString()},
      width: 175
    },    
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modified_on',
      defaultSortOrder: 'descend',
      align: 'center',
      sorter: (a:any, b:any) => a.modified_on - b.modified_on,
      render: (modified_on: Article['modified_on']) => {return (modified_on && new Date(modified_on).toLocaleString()) || '-'},
      width: 175
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (article: Article) => <div className="btn-group">
        <FormOutlined className="btn-edit" onClick={() => handleEdit(article.id)} />
        <Popconfirm
          title={`是否确认删除 <${article.title}> ？`}
          onConfirm={() => handleDeleteConfirm(article.id)}
          okText="删除"
          cancelText="取消"
        >
          <DeleteOutlined className="btn-delete" />
        </Popconfirm>
      </div>
    },
  ]

  let navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [queryInput, setQueryInput] = useState({
    type: "",
    keywords: "",
    pageIndex: 1,
    pageSize: 10
  })

  useEffect(() => {
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [queryInput])

  const loadPageDatas = () => {
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
    }).catch((err: any) => {
        console.error(err)
    })
  }

  const handleCreate = () => {
    navigate('/article/edit')
  }

  const handleEdit = (id: number) => {
    navigate(`/article/edit/${id}`)
  }

  const handleDeleteConfirm = (id: number) => {
    ArticleService.deleteArticle(id).then((res: any)=>{
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

  return (
    <div className="admin-article">
      <div className="admin-article-title">
        文章管理
      </div>

      <div className="article-create">
        <Button className="btn btn-create" onClick={handleCreate}>
          <PlusCircleOutlined />新建文章
        </Button>
      </div>

      <div className="article-list">
        <Table bordered rowKey="id" dataSource={articles} columns={columns} pagination={false}></Table>
      </div>

      <Pagination current={queryInput.pageIndex} total={totalCount} onChange={handleChange}></Pagination>
    </div>
  )
}

export default Articles;