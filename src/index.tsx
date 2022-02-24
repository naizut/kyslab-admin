import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { authRoutes, whiteRoutes } from './router/constants'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import NotFound from './pages/404/NotFound'
import 'antd/dist/antd.less'
import './index.less'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

const App = () => {
  const [isLogin, setIsLogin] = useState(!!window.localStorage.getItem('ka-access-token'))

  useEffect(() => {
    setIsLogin(!!window.localStorage.getItem('ka-access-token'))// 只执行了一次 明天继续优化
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>,
        <Route path="/" element={<Layout />}>
          {authRoutes.map((authRoute) => {
            return (
              <Route
                key={authRoute.path}
                path={authRoute.path}
                element={
                  isLogin ? (
                    authRoute.element
                  ) : (
                    <Navigate to={`/login?redirect=${authRoute.path}`} />
                  )
                }
              ></Route>
            )
          })}
        </Route>
        <Route path="/">
          {whiteRoutes.map((whiteRoute) => {
            return (
              <Route
                key={whiteRoute.path}
                path={whiteRoute.path}
                element={whiteRoute.element}
              ></Route>
            )
          })}
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

reportWebVitals()
