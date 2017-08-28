import pathToRegexp from 'path-to-regexp'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import { hasPermission } from 'utils/auth'

const Menus = option => {
  const { location, isDarkTheme, openKeys, changeOpenKeys, menus } = option

  // 生成树状
  const menuTree = menus
  const levelMap = {}
  let menuItems = []

  // 递归生成菜单
  const getMenus = menuTreeN => {
    return menuTreeN.map(item => {
      if (item.children) {
        return (
          hasPermission(item.permission) && <Menu.SubMenu
            key={item.id}
            title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}
          >
            {getMenus(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        hasPermission(item.permission) && <Menu.Item key={item.id}>
          <Link to={item.url}>
            {item.icon && <Icon type={item.icon} />}
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  }
  menuItems = getMenus(menuTree)

  // 保持选中
  const getAncestorKeys = key => {
    let map = {}
    const getParent = index => {
      const result = [String(levelMap[index])]
      if (levelMap[result[0]]) {
        result.unshift(getParent(result[0])[0])
      }
      return result
    }
    for (let index in levelMap) {
      if ({}.hasOwnProperty.call(levelMap, index)) {
        map[index] = getParent(index)
      }
    }
    return map[key] || []
  }

  const onOpenChange = openChangeKeys => {
    const latestOpenKey = openChangeKeys.find(key => !openKeys.includes(key))
    const latestCloseKey = openKeys.find(key => !openChangeKeys.includes(key))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }

  // 寻找选中路由
  let currentMenu
  let defaultSelectedKeys
  for (let item of menus) {
    for (let menu of item.children) {
      if (menu.url && pathToRegexp(menu.url).exec(location.pathname)) {
        currentMenu = menu
        // openKeys.push(`${item.id}`)
        break
      }
    }
  }

  // 在树结构中查找
  const getPathArray = (array, current, id) => {
    let result = []
    const getPath = (arr, item) => {
      for (let menu of arr) {
        if (menu[id] === item[id]) {
          result.push(menu[id])
        } else if (menu.children) {
          getPath(menu.children, current, id)
        }
      }
    }
    getPath(array, current, id)
    return result
  }

  if (currentMenu) {
    defaultSelectedKeys = getPathArray(menus, currentMenu, 'id')
    // defaultSelectedKeys = [`${currentMenu.id}`]
  } else {
    defaultSelectedKeys = ['0']
  }

  let menuProps = {
    key: JSON.stringify(defaultSelectedKeys),
    onOpenChange,
    openKeys,
    defaultSelectedKeys,
  }

  const onClick = e => {
    const localKey = 'taxi_openkeys'
    localStorage.setItem(localKey, e.keyPath[1] || 0)
  }

  return (
    <Menu
      {...menuProps}
      mode="inline"
      theme={isDarkTheme ? 'dark' : 'light'}
      onClick={onClick}

    >
      <Menu.Item key="0">
        <Link to="/">
          <Icon type="home" />
          <span>主页</span>
        </Link>
      </Menu.Item>
      {menuItems}
    </Menu>
  )
}

export default Menus
