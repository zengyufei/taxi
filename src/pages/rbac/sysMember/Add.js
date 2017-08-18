import { connect } from 'dva'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

const Add = option => {
  const { form, sysMemberStore } = option
  const { confirmLoading, visible: { add } } = sysMemberStore
  const { onOk, onCancel } = option

  const addPageModalProps = {
    maskClosable: false,
    visible: add,
    confirmLoading,
    onOk,
    onCancel,
    form,
  }

  const formProps = {
    fields: getFields(fields).values(),
    item: {
      available: true,
    },
    form,
  }

  return (
    <div>
      <ZModal title="新增用户" {...addPageModalProps} >
        <ZForm {...formProps} />
      </ZModal>
    </div>
  )
}

/**
 * 订阅 model
 */
function mapStateToProps({ sysMemberStore }) {
  return {
    sysMemberStore,
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
          type: 'sysMemberStore/add',
          ...values,
        })
      })
    },

    onCancel() {
      dispatch({
        type: 'sysMemberStore/updateState',
        visible: {
          add: false,
        },
      })
    },

  }
}

const fields = [
  {
    key: 'account',
    name: '账号',
    meta: {
      suffix: true,
    },
    rules: [
      {
        min: 4,
        message: '账号长度至少 4 位字符',
      }, {
        max: 14,
        message: '账号长度最多 14 位字符',
      }, {
        required: true,
        message: '请输入账号',
      }, {
        pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
        message: '用户名只能为字母、汉字和数字',
      },
    ],
  },
  {
    key: 'mobile',
    name: '手机',
    type: 'textNumber',
    rules: [
      {
        required: true,
        message: '请输入手机号码',
      }, {
        pattern: /^(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
        message: '请输入正确的手机号码',
      },
    ],
  },
  {
    key: 'roleId',
    name: '角色',
    type: 'roleId',
    rules: [
      {
        required: true,
        message: '请选择角色',
      },
    ],
  },
  {
    key: 'locked',
    name: '是否锁定',
    hasFeedback: false,
    type: 'switch',
  },
  {
    key: 'available',
    name: '是否有效',
    hasFeedback: false,
    type: 'switch',
  },
  {
    key: 'realName',
    name: '真实姓名',
  },
  {
    key: 'orgNo',
    name: '机构',
    type: 'parentOrgNo',
    rules: [
      {
        required: true,
        message: '请选择机构',
      },
    ],
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(Add)

