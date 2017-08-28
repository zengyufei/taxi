import { connect } from 'dva'
import { Menu, Icon, Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'

import styles from './Header.less'

const SubMenu = Menu.SubMenu

const Header = option => {
  const { form, dispatch, logout, appStore } = option
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
        console.log(values)
      })
      dispatch({
        type: 'appStore/updateState',
        visible: false,
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

  return (
    <div className={styles.header}>
      <ZModal title="修改密码" {...modifyPasswordPageModalProps} >
        <ZForm {...formProps} />
      </ZModal>
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
            {/*  <Menu.Item key="modifyPassword">
              修改密码
            </Menu.Item> */}
            <Menu.Item key="logout">
              注销
            </Menu.Item>
          </SubMenu>
        </Menu>
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
    required: true,
    rules: [
      {
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
    rules: [
      {
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
    rules: [
      {
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
