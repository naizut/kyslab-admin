import { Component } from 'react'
import axios from 'axios'

class Articles extends Component {
  componentDidMount() {

  }

  handleClick = () => {
    axios.get('/api/articles/get?id=16').then(res => {
      console.log(res)
    }).catch(error => {
        console.error(error)
    })
  }

  render() {
    return <div className="admin-article">
      <div onClick={this.handleClick}>gggg</div>
    </div>
  }
}

export default Articles;