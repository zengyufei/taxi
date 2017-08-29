import { connect } from 'dva'
import { Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

const Add = options => {
  const { form, sysResourceStore } = options
  const { confirmLoading, visible: { add } } = sysResourceStore
  const { onOk, onCancel } = options

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
      provinceAndCity: null,
      available: true,
    },
    form,
  }

  return (
    <div>
      <ZModal title="新增资源" {...addPageModalProps} >
        <ZForm {...formProps} />
      </ZModal>
    </div>
  )
}

function mapStateToProps({ sysResourceStore }) {
  return {
    sysResourceStore,
  }
}

function mapDispatchToProps(dispatch, { form }) {
  return {
    form,
    onOk() {
      validate(form, fields)(values => {
        if (values) {
          if (values.parentResNo) {
            values.hierarchy = values.parentResNo.split('-').length === 1 ? 'two' : 'three'
          } else {
            values.hierarchy = 'one'
          }
        }
        dispatch({
          type: 'sysResourceStore/add',
          ...values,
        })
      })
    },

    onCancel() {
      dispatch({
        type: 'sysResourceStore/updateState',
        visible: {
          add: false,
        },
      })
    },

  }
}

const fields = [
  {
    key: 'resName',
    name: '资源名称',
    rules: [{
      required: true,
      message: '请输入资源名称!',
    }],
  }, {
    key: 'parentResNo',
    name: '父资源',
    hasFeedback: false,
    type: 'parentResNo',
  }, {
    key: 'permission',
    name: '权限标识',
    rules: [{
      required: true,
      message: '请填写权限标识!',
    }],
  },
]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Add))

