import Articles from '../components/Article/Articles';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import NotFound from '../components/404/NotFound';
import * as Icon from '@ant-design/icons'

export const routes = [
  {
    path: '/',
    name: '首页',
    hidden: true,
    element: <Home />
  },
  {
    path: '/article',
    element: <Articles />,
    name: '文章管理',
    children: [
      {
        path: '/article/id',
        element: <Articles />
      }
    ],
    icon: <Icon.PoweroffOutlined />
  },
  {
    path: '/login',
    element: <Login />,
    hidden: true,
    removeLayout: true
  },
  {
    path: '/statistics',
    name: '数据统计',
    children: [
      {
        path: '/statistics/articles'
      }
    ]
  },
  {
    path: '/404',
    hidden: true,
    element: <NotFound />
  },
]