import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { routes } from './router'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

ReactDOM.render(
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
        ,
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
