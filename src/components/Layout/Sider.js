import Menus from './Menu'

const localKey = 'taxi_openkeys'

class Sider extends React.Component {
  constructor(props) {
    super(props)
    const initOpenKeys = [localStorage.getItem(localKey)]
    this.state = {
      isDarkTheme: true,
      openKeys: initOpenKeys || [],
    }
    // ES6 类中函数必须手动绑定
    this.changeOpenKeys = this.changeOpenKeys.bind(this)
  }

  changeOpenKeys(e) {
    localStorage.setItem(localKey, e)
    this.setState({
      openKeys: e,
    })
  }

  render() {
    const { changeOpenKeys } = this
    const { openKeys, isDarkTheme } = this.state
    const { location, menus } = this.props

    const menusProps = {
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
}

Sider.propTypes = {
  location: PropTypes.object,
  menus: PropTypes.array.isRequired,
}

export default Sider
