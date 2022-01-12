import { Component } from 'react'
import axios from 'axios'

class Articles extends Component<any, any, {}> {
  state = {
    articles: []
  }

  componentDidMount() {
    axios.post('/api/articles/query', {
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
    console.log("gg", this)
    this.props.history.push('/article/55')
  }

  render() {
    return <div className="admin-article">
      <div onClick={this.handleClick}>gggg</div>
      <div className="admin-article-list">
        {this.state.articles.map((article:any)=>{
          return (
            <div key={article.id}>{article.title}</div>
          )
        })}
      </div>
    </div>
  }
}

export default Articles;