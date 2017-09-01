import { connect } from 'dva'
import { Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'

import { getFields, validate } from 'FormUtils'

const Add = options => {
  const { form, methods, sysOrgStore } = options
  const { confirmLoading, visible: { add } } = sysOrgStore
  const { onOk, onCancel } = methods

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
      <ZModal title="新增组织机构" {...addPageModalProps} >
        <ZForm {...formProps} />
      </ZModal>
    </div>
  )
}

/**
 * 订阅 model
 */
function mapStateToProps({ sysOrgStore }) {
  return {
    sysOrgStore,
  }
}

function mapDispatchToProps(dispatch, { form }) {
  return {
    methods: {
      onOk() {
        validate(form, fields)(values => {
          const { provinceAndCity: [province, city] } = values
          values.province = province
          values.city = city
          dispatch({
            type: 'sysOrgStore/add',
            ...values,
          })
        })
      },

      onCancel() {
        dispatch({
          type: 'sysOrgStore/updateState',
          visible: {
            add: false,
          },
        })
      },
    },
  }
}

const fields = [
  {
    key: 'parentOrgNo',
    name: '上级组织',
    type: 'parentOrgNo',
  },
  {
    key: 'orgName',
    name: '组织名称',
    required: true,
  },
  {
    key: 'priority',
    name: '排序',
    type: 'number',
    required: true,
  },
  {
    key: 'available',
    name: '是否有效',
    hasFeedback: false,
    type: 'switch',
  },

  {
    key: 'description',
    name: '描述',
    type: 'textarea',
  },
  {
    key: 'provinceAndCity',
    name: '省市',
    type: 'provinceAndCity',
    required: true,
  },
  {
    key: 'address',
    name: '地址',
  },

]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Add))

