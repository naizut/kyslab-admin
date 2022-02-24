import { FC, useEffect } from 'react'
import { authRoutes } from '../../router/constants'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './Layout.less';
// import * as Icon from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

const Layout: FC = (props) => {
  let navigate = useNavigate()

  const logout = () => {
    window.localStorage.removeItem("ka-access-token")
    navigate("/login")
  }

  const { pathname } = useLocation();
  
  useEffect(()=>{
  },[pathname])

  return (
    <div className="layout__container">
      <nav className="nav nav-left">
        <div className="nav-logo">KysLab Admin</div>
        {authRoutes.map((authRoute, authRouteIndex) => {
          if (authRoute.hidden) return false
          return (
            <Link
              key={authRoute.path}
              to={authRoute.path}
              className={[
                'nav-item',
                (pathname.indexOf(authRoute.path.split('/')[1]) !== -1) && 'active',
              ].join(' ')}
            >
              <div className="btn-inner-wrap">
                <div>{authRoute.icon}</div>
                <div>{authRoute.name}</div>
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
