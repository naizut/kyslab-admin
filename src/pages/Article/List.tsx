import { useState, FC, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import { ArticleService } from "../../api/admin/article";
import { DeleteOutlined, FormOutlined, PlusCircleOutlined } from "@ant-design/icons"

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
  }, [])

  let navigate = useNavigate()

  const handleItemClick = (id: number) => {
    navigate(`/article/${id}`)
  }

  const handleCreate = () => {
    navigate('/article/edit')
  }


  const handleEdit = (id: number) => {
    navigate(`/article/edit/${id}`)
  }

  const handleDelete = (id: number) => {
  }

  const handleChange = (pageIndex: number, pageSize: number) => {
    const newQueryInput = {...queryInput, pageIndex, pageSize}
    setQueryInput(newQueryInput)
    loadPageDatas()
  }

  return (
    <div className="admin-article">
      <div className="article-manage">
        <div className=""></div>
      </div>
      <div className="btn btn-create" onClick={handleCreate}>
        <PlusCircleOutlined />新建文章
      </div>
      <div className="article-list">
        {articles.map((article:any)=>{
          return (
            <div key={article.id}>
              <div onClick={() => handleItemClick(article.id)}>
                {article.title}
              </div>
              <div className="btn-group">
                <FormOutlined className="btn-edit" onClick={() => handleEdit(article.id)} />
                <DeleteOutlined className="btn-delete" onClick={() => handleDelete(article.id)} />
              </div>
            </div>
          )
        })}
      </div>
      <Pagination total={totalCount} onChange={handleChange}></Pagination>
    </div>
  )
}

export default Articles;