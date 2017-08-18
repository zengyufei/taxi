import { connect } from 'dva'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

import Permission from './Permission'
import styles from './Update.less'

const Add = option => {
  const { form, sysRoleStore } = option
  const { confirmLoading, visible: { add } } = sysRoleStore
  const { onOk, onCancel } = option

  const addPageModalProps = {
    maskClosable: false,
    visible: add,
    confirmLoading,
    onOk,
    onCancel,
    form,
    className: styles.modalWidth,
  }

  const formProps = {
    fields: getFields(fields).values(),
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
    item: {
      provinceAndCity: null,
      available: true,
    },
    form,
  }

  return (
    <div>
      <ZModal title="新增角色" {...addPageModalProps} >
        <div style={{ margin: '25px' }}>
          <ZForm {...formProps} />
        </div>
        <Permission />
      </ZModal>
    </div>
  )
}

/**
 * 订阅 model
 */
function mapStateToProps({ sysRoleStore }) {
  return {
    sysRoleStore,
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
          type: 'sysRoleStore/add',
          ...values,
        })
      })
    },

    onCancel() {
      dispatch({
        type: 'sysRoleStore/updateState',
        visible: {
          add: false,
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
    type: 'textarea',
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(Add)

