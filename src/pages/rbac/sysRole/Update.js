import { connect } from 'dva'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'
import Permission from './Permission'
import styles from './Update.less'

let UpdatePage = option => {
  const { form, sysRoleStore } = option
  const { confirmLoading, visible: { update }, sysRole = {} } = sysRoleStore
  const { onOk, onCancel } = option

  const updatePageModalProps = {
    maskClosable: false,
    visible: update,
    confirmLoading,
    onOk,
    onCancel,
    form,
    className: styles.modalWidth,
  }

  const formProps = {
    formLayout: 'inline',
    layout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    },
    fields: getFields(fields).values(),
    item: {
      ...sysRole,
      provinceAndCity: sysRole.province && sysRole.city ? [sysRole.province, sysRole.city] : null,
    },
    form,
  }

  return (
    <div>
      <ZModal title="修改角色" {...updatePageModalProps} >
        <div style={{ margin: '25px' }}>
          <ZForm {...formProps} />
        </div>
        <Permission resourceList={sysRole && typeof sysRole.resourceList === 'string' ? sysRole.resourceList.split(',') : (sysRole.resourceList || [])} />
      </ZModal>
    </div>
  )
}

/**
 * 订阅 model
 */
function mapStateToProps({ loading, sysRoleStore, rbacStore }) {
  return {
    loading: loading.models.rbacStore,
    sysRoleStore,
    rbacStore,
  }
}

/**
 * @param dispatch 从 connect 获得
 * @param form 从上层建筑获得
 */
function mapDispatchToProps(dispatch, { form }) {
  return {

    onOk() {
      validate(form, fields)(values => {
        dispatch({
          type: 'sysRoleStore/update',
          ...values,
        })
      })
    },

    onCancel() {
      dispatch({
        type: 'sysRoleStore/updateState',
        visible: {
          update: false,
        },
      })
    },

  }
}

const fields = [
  {
    key: 'orgNo',
    name: '组织机构',
    type: 'parentOrgNo',
    placeholder: '请选择组织机构',
    rules: [
      {
        required: true,
        message: '请选择组织机构',
      },
    ],
  }, {
    key: 'roleName',
    name: '角色名称',
    required: true,
  }, {
    key: 'description',
    name: '描述',
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage)
