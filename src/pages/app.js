/*
 * @Author: zengyufei
 * @Date: 2017-08-04 14:16:53
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-24 10:46:13
 */
import { connect } from 'dva'
import { Sider, Header, Footer, Bread, styles } from 'components/layout'
import { menus } from 'src/menus'
import { Helmet } from 'react-helmet'
import classnames from 'classnames'
import '../themes/index.less'
import './app.less'

const App = option => {
  const { location, children, methods } = option
  const { changeOpenKeys, logout } = methods

  const headerProps = {
    logout,
  }


  const siderProps = {
    menus,
    location,
    changeOpenKeys,
  }

  const breadProps = {
    menus,
    location,
  }

  return (
    <div>
      <Helmet>
        <title>{projectConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={projectConfig.logo} type="image/x-icon" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: false }, { [styles.withnavbar]: false })}>
        <aside className={classnames(styles.sider, { [styles.light]: true })}>
          <Sider {...siderProps} />
        </aside>
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ app }) => ({
  app,
})

const mapDispatchToProps = dispatch => {
  return {
    methods: {

      changeOpenKeys(openKeys) {
        localStorage.setItem(`navOpenKeys`, JSON.stringify(openKeys))
        dispatch({
          type: 'app/handleNavOpenKeys',
          payload: {
            navOpenKeys: openKeys,
          },
        })
      },

      logout () {
        dispatch({ type: 'appStore/logout' })
      },

    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
