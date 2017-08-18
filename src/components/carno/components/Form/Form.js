import React from 'react'
import { Form } from 'antd'
import Utils from 'carno/utils'

const FormUtil = Utils.Form
const FormItem = Form.Item

export default option => {
  const { formLayout, fields, item, form, layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }, ...others } = option

  return (
    <Form layout={formLayout || 'horizontal'} {...others} >
      {fields.map(field =>
        (<FormItem label={`${field.name}:`} help={field.help} hasFeedback={field.hasFeedback === false ? field.hasFeedback : true} key={field.key} {...layout}>
          {FormUtil.createFieldDecorator(field, item, form.getFieldDecorator)}
        </FormItem>),
      )}
    </Form>
  )
}
