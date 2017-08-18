import pathToRegexp from 'path-to-regexp'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Bread.less'

const Bread = option => {
  const { menus, location } = option

  // 匹配当前路由
  let pathArray = []
  let current
  for (let item of menus) {
    for (let menu of item.children) {
      if (menu.url && pathToRegexp(menu.url).exec(location.pathname)) {
        current = menu
        break
      }
    }
  }


  if (!current) {
    pathArray.push({
      id: 'home',
      icon: 'laptop',
      name: projectConfig.breadName,
    })
  } else {
    /* const getPathArray = item => {
      pathArray.unshift(item)
      if (item.bpid) {
        getPathArray(queryArray(menus, item.bpid, 'id'))
      }
    }
    getPathArray(current) */
    // 在树结构中查找
    const getPathArray = (array, currentObj, id) => {
      let stop = false
      let finalMenu = []
      let beforeMenu = []
      const getPath = (arr, item) => {
        for (let menu of arr) {
          if (menu[id] === item[id]) {
            finalMenu.push(menu)
            stop = true
          } else if (menu.children) {
            stop || beforeMenu.push(menu)
            getPath(menu.children, currentObj, id)
          }
        }
      }
      getPath(array, currentObj)
      return [...beforeMenu, ...finalMenu]
    }
    pathArray = getPathArray(menus, current, 'id')
  }

  // 递归查找父级
  const breads = pathArray.map((item, key) => {
    const content = (
      <span>{item.icon ? <Icon type={item.icon} style={{ marginRight: 4 }} /> : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
        {((pathArray.length - 1) !== key)
          ? <Link to={item.route}> {content}</Link>
          : content}
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item key="home">
          <Link to="/">{projectConfig.name}</Link>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

export default Bread
