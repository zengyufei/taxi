import React from 'react'
import { Form } from 'antd'

import ZFormItem from './FormItem'

const FormItem = Form.Item

export default option => {
  const { formType, formLayout, fields, item, form, btn, layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }, ...others } = option

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  }

  const formProps = {
    formType,
    item,
    form,
    ...layout,
  }

  return (
    <Form layout={formLayout || 'horizontal'} {...others} >
      {
        fields.map(field => !!field && !!field.key && <ZFormItem {...formProps} field={field} key={field.key} />)
      }
      <FormItem {...tailFormItemLayout}>
        {btn}
      </FormItem>
    </Form>
  )
}
