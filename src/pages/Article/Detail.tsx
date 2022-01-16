import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ArticleService } from "../../api/admin/article";

const Articles: FC = () => { 
  const [article, setArticle] = useState({
    title: '',
    content: '',
    created_on: 0,
    tags: "",
    type: ""
  })
  const { id } = useParams()

  useEffect(() => {
    ArticleService.etArticle(id).then((res:any) => {
      setArticle(res.result)
    }).catch((err: any) => {
        console.error(err)
    })
  }, [id])

  let navigate = useNavigate()
  
  const handleClick = () => {
    navigate(-1)
  }

  return <div className="article">
    <div onClick={handleClick}>Back</div>
    <div className="article-detail">
      <h1>{article.title}</h1>
      <time>创建时间：{article.created_on}</time>
      <div dangerouslySetInnerHTML={{__html: article.content}}></div>

      <div>标签：{
        article.tags.split(",").map((tag:any)=> {
          return <label key={tag}>{tag}</label>
        })
      }</div>
      <div>分类：{article.type}</div>
    </div>
  </div>
}

export default Articles;