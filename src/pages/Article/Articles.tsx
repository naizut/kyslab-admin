import { Component } from 'react'
import axios from 'axios'

class Articles extends Component {
  componentDidMount() {
    axios.get('/api/articles/get?id=19', {}).then(res => {
      console.log(res)
    }).catch(error => {
        console.error(error)
    })
  }

  render() {
    return <div className="admin-article">
      <div></div>
    </div>
  }
}

export default Articles;