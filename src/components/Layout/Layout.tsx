import './Layout.css'
import { useState, FC } from 'react'
import { routes } from '../../router'
import { Link, Outlet } from 'react-router-dom'
// import * as Icon from '@ant-design/icons'

const Layout: FC = (props) => {
  const [activeIndex, setActiveIndex] = useState(1)

  const logout = () => {
    console.log('gg')
  }
  const handleMenuItemClick = (i: number) => {
    setActiveIndex(i)
  }

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
                itemIndex === activeIndex && 'active',
              ].join(' ')}
              onClick={() => handleMenuItemClick(itemIndex)}
            >
              <div className="btn-inner-wrap">
                <div>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </Link>
          )
        })}

        <a href="/logout" className="nav-item" onClick={() => logout()}>
          <div className="btn-inner-wrap">
            退出
          </div>
        </a>
      </nav>

      <section className="main-wrapper">
        {/* <header className="header">
          <div className="header-title">111</div>
          <div className="header-logout">
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
