import React from 'react'
import { Form } from 'antd'
import Utils from 'carno/utils'

const FormUtil = Utils.Form
const FormItem = Form.Item

const FORM_ITEM_KEYS = ['label', 'labelCol', 'wrapperCol', 'help', 'extra', 'required', 'validateStatus', 'hasFeedback', 'colon']
const DECORATOR_KEYS = ['trigger', 'valuePropName', 'getValueFromEvent', 'validateTriggger', 'exclusive']

function pick(obj, keys) {
  return keys.map(k => (k in obj ? { [k]: obj[k] } : {}))
    .reduce((res, o) => Object.assign(res, o), {})
}

function extend(dest = {}, source = {}) {
  const result = Object.assign({}, dest)
  for (const key in source) {
    if (source.hasOwnProperty(key) && source[key] !== undefined) {
      result[key] = source[key]
    }
  }
  return result
}

/**
 * HFormItem
 * 对FormItem组件封装,统一FormItem与getFieldDecorator的属性，方便使用
 * @options form 表单对象
 * @options field 字段定义对象
 * @options item 默认值数据对象
 * @options rules 校验规则
 * @options onChange 控件改变事件
 * @options initialValue 控件初始值，会覆盖item中对应key的value
 * @options placeholder 如果为false则不显示placeholder
 * @options {...ForItemProps Form.Item 属性集} 包含所有Form.Item属性,参考Form.Item文档
 * @options {...DecoratorOptions 属性集} 包含所有DecoratorOptions属性,参考DecoratorOptions文档
 *
 */
export default function (options) {
  let formItemProps = pick(options, FORM_ITEM_KEYS)
  const decoratorOpts = pick(options, DECORATOR_KEYS)

  let { formType, inputProps } = options
  let { label, help, hasFeedback, disabled } = formItemProps
  const { form, field, item, rules, initialValue, placeholder, onChange } = options
  const { key, name } = field

  let newField
  if (formType && field.form) {
    newField = field.form[formType]
    if (newField) {
      Object.keys(field.form).forEach(e => e === formType || delete field.form[e])
    } else if (/type|rules|enums|render|meta|required|disabled/i.test(Object.keys(field.form).toString())) {
      newField = _.cloneDeep(field.form)
      Object.keys(newField).forEach(e => {
        /type|rules|enums|render|meta|required|disabled/i.test(e) || delete newField[e]
      })
    } else {
      newField = _.cloneDeep(field)
      delete newField.form
    }
  } else if (field.form) {
    if (/type|rules|enums|render|meta|required|disabled/i.test(Object.keys(field.form).toString())) {
      newField = _.cloneDeep(field.form)
      Object.keys(newField).forEach(e => {
        /type|rules|enums|render|meta|required|disabled/i.test(e) || delete newField[e]
      })
    } else {
      newField = _.cloneDeep(field)
      delete newField.form
    }
  } else {
    newField = field
  }

  label = label === undefined ? name : label
  help = help === undefined ? newField.help : help

  if (newField.hasFeedback === false || hasFeedback === false) {
    hasFeedback = false
  } else {
    hasFeedback = true
  }
  if (newField.type === 'hidden') {
    hasFeedback = false
  }

  if (newField.disabled) {
    disabled = newField.disabled
  }

  const dataItem = item || { [key]: initialValue }
  const fieldItem = extend(field, { rules, ...newField })
  delete fieldItem.form

  formItemProps = extend(formItemProps, { label, help, hasFeedback, key })
  inputProps = extend(inputProps, { onChange, disabled })

  return (
    <FormItem {...formItemProps} key={fieldItem.key}>
      {FormUtil.createFieldDecorator(fieldItem, dataItem, (form && form.getFieldDecorator) || undefined, placeholder, inputProps, decoratorOpts)}
    </FormItem>
  )
}
