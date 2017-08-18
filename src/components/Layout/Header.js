import { Menu, Icon } from 'antd'
import styles from './Header.less'

const SubMenu = Menu.SubMenu

const Header = option => {
  const { logout } = option

  let handleClickMenu = e => e.key === 'logout' && logout()

  return (
    <div className={styles.header}>
      <div style={{ float: 'left' }} />
      <div className={styles.rightWarpper} style={{ float: 'right' }}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              asdasd
            </span>}
          >
            <Menu.Item key="modifyPassword">
              修改密码
            </Menu.Item>
            <Menu.Item key="logout">
              注销
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Header
