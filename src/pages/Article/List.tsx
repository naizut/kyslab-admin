import { useState, FC, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ArticleService } from "../../api/admin/article";
import { Button, Input, Pagination, Popconfirm, Select, Table } from 'antd';
import { DeleteOutlined, FormOutlined, PlusCircleOutlined } from "@ant-design/icons"

import './List.less';

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
      dataIndex: 'created_on',
      key: 'created_on',
      defaultSortOrder: 'descend',
      sorter: (a:Article, b:Article) => a.created_on - b.created_on,
      width: 175
    },    
    {
      title: '修改时间',
      dataIndex: 'modified_on',
      key: 'modified_on',
      defaultSortOrder: 'descend',
      align: 'center',
      sorter: (a:any, b:any) => a.modified_on - b.modified_on,
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

  const { Option } = Select;
  const { Search } = Input;

  const [articles, setArticles] = useState<Article[]>([])
  const [filterOptions, setFilterOptions] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [queryInput, setQueryInput] = useState({
    type: "",
    keywords: "",
    pageIndex: 1,
    pageSize: 10
  })

  useEffect(() => {
    setTableLoading(true)
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
      setTableLoading(false)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [queryInput])

  useEffect(() => {
    ArticleService.queryTypes().then((res: any) => {
      setFilterOptions(res.result)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [])

  const loadPageDatas = () => {
    setTableLoading(true)
    ArticleService.queryArticles(queryInput).then((res: any) => {
      setArticles([...res.result.items])
      setTotalCount(res.result.totalCount)
      setTableLoading(false)
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

  const handleSelectChange = (v: string) => {
    setQueryInput({...queryInput, type: v})
  }

  const handleSearch = (v:string) => {
    setQueryInput({...queryInput, keywords: v})
  }

  return (
    <div className="admin-article">
      <div className="admin-article-title">
        文章管理
      </div>

      <div className="admin-article-header">
        <div className="admin-article-filter">
          <Select defaultValue={'请选择分类'} className="filter filter-type" onChange={handleSelectChange}>
            <Option value=''>请选择分类</Option>
            {filterOptions.map(filterOption => {
              return <Option key={filterOption} value={filterOption}>
                {filterOption}
              </Option>
            })}
          </Select>
          
          <Search placeholder="请输入标题或标签" className="filter filter-search" onSearch={handleSearch}></Search>
        </div>

        <div className="article-create">
          <Button className="btn btn-create" onClick={handleCreate}>
            <PlusCircleOutlined />新建文章
          </Button>
        </div>
      </div>

      <div className="article-list">
        <Table bordered rowKey="id" dataSource={articles} columns={columns} pagination={false} loading={tableLoading}></Table>
      </div>

      <Pagination current={queryInput.pageIndex} total={totalCount} onChange={handleChange} showSizeChanger pageSizeOptions={['10', '20', '30']}></Pagination>
    </div>
  )
}

export default Articles;