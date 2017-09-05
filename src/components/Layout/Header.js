import { connect } from 'dva'
import { Popover, Menu, Icon, Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'
import { menus } from 'src/menus'

import Menus from './Menu'
import styles from './Header.less'

const SubMenu = Menu.SubMenu

const Header = option => {
  const { form, dispatch, logout, appStore } = option
  const { siderFold, openKeys, isNavbar, menuPopoverVisible, switchMenuPopover, switchSider, changeOpenKeys } = option
  const currentRole = session.get(constant.roleSessionKey)

  let handleClickMenu = e => {
    if (e.key === 'logout') { logout() } else if (e.key === 'modifyPassword') {
      dispatch({
        type: 'appStore/updateState',
        visible: true,
      })
    }
  }

  const modifyPasswordPageModalProps = {
    maskClosable: false,
    visible: appStore.visible,
    confirmLoading: appStore.confirmLoading,
    onOk() {
      validate(form, fields)(values => {
        if (values.newPassword !== values.newReplacePassword) {
          ZMsg.error('两次输入的新密码不相同')
          return
        }
        dispatch({
          type: 'appStore/resetPassword',
          ...values,
        })
      })
    },
    onCancel() {
      dispatch({
        type: 'appStore/updateState',
        visible: false,
      })
    },
    form,
  }

  const formProps = {
    fields: getFields(fields).values(),
    item: {},
    form,
  }

  const menusProps = {
    menus,
    openKeys,
    siderFold: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    changeOpenKeys,
  }

  return (
    <div>
      <div>
        <ZModal title="修改密码" {...modifyPasswordPageModalProps} >
          <ZForm {...formProps} />
        </ZModal>
      </div>
      <div className={styles.header}>
        {isNavbar
          ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
            <div className={styles.button}>
              <Icon type="bars" />
            </div>
          </Popover>
          : ''}
        <div style={{ float: 'left' }} />
        <div className={styles.rightWarpper} style={{ float: 'right' }}>
          <Menu mode="horizontal" onClick={handleClickMenu}>
            <SubMenu
              style={{
                float: 'right',
              }}
              title={<span>
                <Icon type="user" />
                {currentRole ? currentRole.roleName : ''}
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
    </div>
  )
}
/**
 * 订阅 model
 */
function mapStateToProps({ appStore }) {
  return {
    appStore,
  }
}

const fields = [
  {
    key: 'oldPassword',
    name: '原密码',
    type: 'password',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入原密码',
      }, {
        min: 6,
        message: '密码长度至少 6 位字符',
      }, {
        max: 18,
        message: '密码长度最多 18 位字符',
      }, {
        required: true,
        message: '请输入原密码',
      },
    ],
  },
  {
    key: 'newPassword',
    name: '新密码',
    type: 'password',
    rules: [
      {
        required: true,
        message: '请输入原密码',
      }, {
        min: 6,
        message: '密码长度至少 6 位字符',
      }, {
        max: 18,
        message: '密码长度最多 18 位字符',
      }, {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    key: 'newReplacePassword',
    name: '重输入新密码',
    type: 'password',
    rules: [
      {
        required: true,
        message: '请输入原密码',
      }, {
        min: 6,
        message: '密码长度至少 6 位字符',
      }, {
        max: 18,
        message: '密码长度最多 18 位字符',
      }, {
        required: true,
        message: '请重输入新密码',
      },
    ],
  },
]

export default Form.create()(connect(mapStateToProps)(Header))
