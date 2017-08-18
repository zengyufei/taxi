import { connect } from 'dva'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'

let UpdatePage = option => {
  const { form, sysResourceStore } = option
  const { confirmLoading, visible: { update }, sysResource = {} } = sysResourceStore
  const { onOk, onCancel } = option

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
    item: {
      ...sysResource,
      provinceAndCity: sysResource.province && sysResource.city ? [sysResource.province, sysResource.city] : null,
    },
    form,
  }

  return (
    <div>
      <ZModal title="修改资源" {...updatePageModalProps} >
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
          type: 'sysResourceStore/update',
          ...values,
        })
      })
    },

    onCancel() {
      dispatch({
        type: 'sysResourceStore/updateState',
        visible: {
          update: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage)
