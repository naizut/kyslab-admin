import './Layout.scss'
import { FC, useEffect } from 'react'
import { routes } from '../../router'
import { Link, Outlet, useLocation } from 'react-router-dom'
// import * as Icon from '@ant-design/icons'

const Layout: FC = (props) => {

  const logout = () => {
    console.log(props)
  }

  const { pathname } = useLocation();
  
  useEffect(()=>{
  },[pathname])

  return (
    <div className="layout__container">
      <nav className="nav nav-left">
        <div className="nav-logo">KysLab Admin</div>
        {routes.map((item, itemIndex) => {
          if (item.hidden) return false
          return (
            <Link
              key={item.path}
              to={item.path}
              className={[
                'nav-item',
                (pathname.indexOf(item.path.split('/')[1]) !== -1) && 'active',
              ].join(' ')}
            >
              <div className="btn-inner-wrap">
                <div>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          )
        })}

        <div className="nav-item" onClick={() => logout()}>
          <div className="btn-inner-wrap">
            退出
          </div>
        </div>
      </nav>

      <section className="main-wrapper">
        {/* <header className="main-wrapper-header">
          <div className="title">111</div>
          <div className="logout">
            <Icon.PoweroffOutlined />
          </div>
        </header> */}
        <main className="main-container">
          <article className="content-wrapper">
            <Outlet />
          </article>
        </main>
      </section>
    </div>
  )
}

export default Layout
