import { connect } from 'dva'
import { Form } from 'antd'

import ZForm from 'ZForm'
import ZModal from 'ZModal'
import { getFields, validate } from 'FormUtils'

let UpdatePage = option => {
  const { form, dispatch, sysOrgStore } = option
  const { confirmLoading, visible: { update }, sysOrg = {} } = sysOrgStore

  const onOk = () => {
    validate(form, fields)(values => {
      const { provinceAndCity: [province, city] } = values
      values.province = province
      values.city = city
      dispatch({
        type: 'sysOrgStore/update',
        ...values,
      })
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'sysOrgStore/updateState',
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
    formType: 'update',
    fields: getFields(fields).values(),
    item: {
      ...sysOrg,
      provinceAndCity: sysOrg.province && sysOrg.city ? [sysOrg.province, sysOrg.city] : null,
    },
    form,
  }

  return (
    <div>
      <ZModal title="修改组织机构" {...updatePageModalProps} >
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

const fields = [
  {
    key: 'orgNo',
    name: '组织编号',
    form: {
      update: false,
    },
  },
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

export default Form.create()(connect(mapStateToProps)(UpdatePage))
