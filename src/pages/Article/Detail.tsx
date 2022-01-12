import { Component } from 'react'
import axios from 'axios'

class Articles extends Component<any, any, {}> {
  state = {
    article: {
      title: ''
    }
  }

  componentDidMount() {
    axios.post('/api/articles/get/', {
      type: "",
      keywords: "",
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      this.setState({
        articles: [...res.data.result]
      })
    }).catch(error => {
        console.error(error)
    })
  }

  handleClick = () => {
    axios.get('/api/articles/get/33').then(res => {
      console.log(res)
    }).catch(error => {
        console.error(error)
    })
  }

  render() {
    return <div className="admin-article">
      <div onClick={this.handleClick}>gggg</div>
      <div className="admin-article-list">
        {this.state.article.title}
      </div>
    </div>
  }
}

export default Articles;