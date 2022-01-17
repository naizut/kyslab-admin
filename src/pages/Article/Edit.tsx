import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticleService } from '../../api/admin/article'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input, Button } from 'antd'
import './Edit.scss'

import Back from "../../components/Common/Button/Back"

const Articles: FC = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    created_on: 0,
    tags: '',
    type: ''
  })
  const [content, setContent] = useState(BraftEditor.createEditorState(null))
  const { id } = useParams()

  useEffect(() => {
    if (id && id.length > 0) {
      ArticleService.getArticle(id)
        .then((res: any) => {
          setContent(BraftEditor.createEditorState(res.result.content))
          setArticle(res.result)
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }, [id, article.content])

  let navigate = useNavigate()

  const handleChange = (editorState: any) => {
    setContent(editorState)
  }

  const bindChange = (e: any) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    setArticle({
      ...article,
      content: content.toHTML()
    })
    ArticleService.createArticle(article).then((res: any)=>{
      if(res.code === 200) {
        navigate('/article/list')
      }
    }).catch((err: any) => {
      console.error(err)
    })
  }

  return (
    <div className="article-edit">
      <Back></Back>
      <div className="article-edit-header">
        编辑文章
      </div>

      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
        <Form.Item label="标题：">
          <Input placeholder="title" name="title" onChange={bindChange} value={article.title} />
        </Form.Item>
        <Form.Item label="内容：" wrapperCol={{ span: 21 }}>
          <BraftEditor
            value={content}
            onChange={handleChange} // 监听富文本内容变化
            controls={[
              {
                key: 'bold',
                text: <b>B</b>
              },
              'italic',
              'underline',
              'strike-through',
              'superscript',
              'subscript',
              'remove-styles',
              'text-color',
              'separator',
              'text-indent',
              'link',
              'separator',
              'headings',
              'code',
              'blockquote',
              'hr',
              'media',
              'emoji',
              'undo',
              'redo'
            ]}
            contentStyle={{ height: 500 }} // 文本框高度
          />
        </Form.Item>
        <Form.Item label="标签：">
          <Input placeholder="Tags, i.e.:<a,b,c>" name="tags" onChange={bindChange}  value={article.tags} />
        </Form.Item>
        <Form.Item label="分类：">
          <Input placeholder="type" name="type" onChange={bindChange}  value={article.type} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 2 }
          }}
        >
          <Button onClick={handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Articles
