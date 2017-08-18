import { connect } from 'dva'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

const Add = option => {
  const { form, sysResourceStore } = option
  const { confirmLoading, visible: { add } } = sysResourceStore
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

/**
 * 订阅 model
 */
function mapStateToProps({ sysResourceStore }) {
  return {
    sysResourceStore,
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
  },
  {
    key: 'parentResNo',
    name: '父资源',
    hasFeedback: false,
    type: 'parentResNo',
  },
  {
    key: 'permission',
    name: '权限标识',
    rules: [{
      required: true, 
      message: '请填写权限标识!',
    }],
  },
]

export default connect(mapStateToProps, mapDispatchToProps)(Add)

