import { menus } from 'src/menus'
import Menus from './Menu'

const Sider = options => {
  const { openKeys, isDarkTheme = true, siderFold, location, changeOpenKeys } = options

  const menusProps = {
    siderFold,
    menus,
    isDarkTheme,
    location,
    openKeys,
    changeOpenKeys,
  }

  return (
    <div>
      <div>
        <img alt={'logo'} src={projectConfig.logo} />
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

export default Sider
