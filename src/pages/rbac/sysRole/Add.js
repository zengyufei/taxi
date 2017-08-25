import { connect } from 'dva'
import { Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

import Permission from './Permission'
import styles from './Update.less'

const Add = option => {
  const { form, dispatch, sysRoleStore } = option
  const { confirmLoading, visible: { add } } = sysRoleStore

  const onOk = () => {
    validate(form, fields)(values => {
      dispatch({
        type: 'sysRoleStore/add',
        ...values,
      })
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'sysRoleStore/updateState',
      visible: {
        add: false,
      },
    })
  }

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

export default Form.create()(connect(mapStateToProps)(Add))

