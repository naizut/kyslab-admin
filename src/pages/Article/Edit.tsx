import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticleService } from '../../api/admin/article'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input } from 'antd'
import './Edit.css'

const Articles: FC = () => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    created_on: 0,
    tags: '',
    type: ''
  })
  const { id } = useParams()

  useEffect(() => {
    if (id && id.length > 0) {
      ArticleService.getArticle(id)
        .then((res: any) => {
          setArticle(res.result)
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }, [id])

  let navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  const handleChange = (editorState: any) => {
    setArticle({
      ...article,
      content: editorState.toHTML()
    })
    console.log('gg')
  }

  const handleSubmit = () => {
    
  }

  const myUploadFn = (v: any) => {
    console.log(v)
  }

  const myInsert = () => {}

  return (
    <div className="article">
      <div onClick={handleClick}>Back</div>
      <div className="article-edit">
        编辑文章
      </div>

      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
        <Form.Item label="标题：">
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item label="内容：" wrapperCol={{ span: 22 }}>
          <BraftEditor
            value={article.content}
            onChange={handleChange} // 监听富文本内容变化
            controls={[
              {
                key: 'bold',
                text: <b>加粗</b>
              },
              'italic',
              'underline',
              'separator',
              'link',
              'separator',
              'media',
              'emoji'
            ]}
            contentStyle={{ height: 500 }} // 文本框高度
            media={{ uploadFn: myUploadFn, onInsert: myInsert }} //媒体库回调事件
          />
        </Form.Item>
        <Form.Item label="标签：">
          <Input placeholder="Tags, i.e.:<a,b,c>" />
        </Form.Item>
        <Form.Item label="分类：">
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 2 }
          }}
        >
          <div onClick={handleSubmit}>提交</div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Articles
