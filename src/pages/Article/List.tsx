import { useState, FC, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Button } from 'antd';
import { ArticleService } from "../../api/admin/article";
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
      dataIndex: 'title',
      key: 'title',
      responsive: ['md'],
      onCell: (record: Article, index: number) => {
        return {
          onClick: () => {
            navigate(`/article/${record.id}`)
          }
        }
      }
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
      dataIndex: 'created_on',
      key: 'created_on',
      defaultSortOrder: 'descend',
      sorter: (a:Article, b:Article) => a.created_on - b.created_on,
      render: (created_on: Article['created_on']) => {return new Date(created_on).toLocaleString()},
      width: 175
    },    
    {
      title: '修改时间',
      dataIndex: 'modified_on',
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
        <DeleteOutlined className="btn-delete" onClick={() => handleDelete(article.id)} />
      </div>
    },
  ]

  const [articles, setArticles] = useState<Article[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [queryInput, setQueryInput] = useState({
    type: "",
    keywords: "",
    pageIndex: 1,
    pageSize: 10
  })

  const loadPageDatas = () => {
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
    }).catch((err: any) => {
        console.error(err)
    })
  }

  useEffect(() => {
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [queryInput])

  let navigate = useNavigate()

  const handleCreate = () => {
    navigate('/article/edit')
  }


  const handleEdit = (id: number) => {
    navigate(`/article/edit/${id}`)
  }

  const handleDelete = (id: number) => {
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
    const newQueryInput = {...queryInput, pageIndex, pageSize}
    setQueryInput(newQueryInput)
    loadPageDatas()
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