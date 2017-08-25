/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:34:52 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:34:52 
 */
import { connect } from 'dva'
import { Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'

let UpdatePage = option => {
  const { form, dispatch, sysMemberStore } = option
  const { confirmLoading, visible: { update }, sysMember = {} } = sysMemberStore

  const onOk = () => {
    validate(form, fields)(values => {
      dispatch({
        type: 'sysMemberStore/update',
        ...values,
      })
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'sysMemberStore/updateState',
      visible: {
        update: false,
      },
    })
  }

  const updatePageModalProps = {
    maskClosable: false,
    visible: update,
    confirmLoading,
    onOk,
    onCancel,
    form,
  }

  const formProps = {
    fields: getFields(fields).values(),
    item: sysMember,
    form,
  }

  return (
    <div>
      <ZModal title="修改用户" {...updatePageModalProps} >
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

export default Form.create()(connect(mapStateToProps)(UpdatePage))
