import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { routes } from './router'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import NotFound from './pages/404/NotFound'
import 'antd/dist/antd.less';
import './index.less'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />}></Route>,
      <Route path="/" element={<Layout />}>
        {routes.map((item) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={item.element}
            ></Route>
          )
        })}
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))

reportWebVitals()
