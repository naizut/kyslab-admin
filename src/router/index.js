import ArticleList from '../pages/Article/List';
import ArticleDetail from '../pages/Article/Detail';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/404/NotFound';
import * as Icon from '@ant-design/icons'

export const routes = [
  {
    path: '/',
    name: '首页',
    hidden: true,
    element: <Home />
  },
  {
    path: 'article',
    name: '文章管理',
    children: [
      {
        path: ':id',
        element: <ArticleDetail />
      },
      {
        path: 'list',
        element: <ArticleList />
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