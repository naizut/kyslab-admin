import { useState, FC, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Articles: FC = (props) => {
  const [articles, setArticles] = useState<Article[]>([])

  interface Article {
    title: string,
    content: string,
    type: string,
    tags: string,
    id: number,
    created_on: number,
    modified_on: number
  }

  useEffect(() => {
    axios.post('/api/articles/query', {
      type: "",
      keywords: "",
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      setArticles([...res.data.result])
    }).catch(error => {
        console.error(error)
    })
  }, [])

  let navigate = useNavigate()

  const handleClick = () => {
    navigate('/article/55')
  }

  return (
    <div className="admin-article">
    <div onClick={handleClick}>gggg</div>
    <div className="admin-article-list">
      {articles.map((article:any)=>{
        return (
          <div key={article.id}>{article.title}</div>
        )
      })}
    </div>
  </div>
  )
}

export default Articles;