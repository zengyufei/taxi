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
  let { label, help, hasFeedback = true, disabled, placeholder } = formItemProps
  const { showLabel = true, form, field, item, rules, initialValue, onChange } = options
  const { key, name } = field

  let isText = false
  let newField
  // 当用户设置改属性时
  if (formType !== undefined) {
    // 需要判断是否需要取 field.form 来表达行为
    if (typeof formType === 'boolean') {
      // 为 boolean 且属性为 false，则只做表达使用。（使用双绑，不提交则是安全的）
      if (!formType) {
        isText = true
        newField = _.cloneDeep(field)
        delete newField.form
      }
    // 如果为 string ，则需要用 formType 作为 key 去 field.form 查找
    } else if (typeof formType === 'string') {
      if (field.form !== undefined) {
        // 为 boolean 时，说明不想用双绑，后续只需要判断 field.form 的属性做判断
        if (typeof field.form === 'boolean') {
          if (!field.form) {
            isText = true
            newField = _.cloneDeep(field)
          }
        // 最正常的流程
        } else if (typeof field.form === 'object') {
          // formType 作为 key 有可能取不到值
          newField = field.form[formType]
          // 取到值之后移除其他属性
          if (newField !== undefined) {
            if (typeof newField === 'boolean' && !newField) {
              isText = true
              newField = { form: false }
            } else {
              Object.keys(field.form).forEach(e => e === formType || delete field.form[e])
            }
          // 当发生取不到值，就在 field.form 中查找这些属性
          } else if (/type|rules|enums|render|meta|required|disabled|placeholder/i.test(Object.keys(field.form).toString())) {
            newField = _.cloneDeep(field.form)
            Object.keys(newField).forEach(e => {
              /type|rules|enums|render|meta|required|disabled|placeholder/i.test(e) || delete newField[e]
            })
          } else {
            newField = _.cloneDeep(field)
            delete newField.form
          }
        // 为 string 的情况下， field.form 为空，则报错
        } else {
          throw new Error('field.form 只能是 boolean 或 object')
        }
      } else {
        newField = field
        delete newField.form
      }
    // 如果为 其他，则报错
    } else {
      throw new Error('formType 只能是 boolean 或 string')
    }
  } else {
    // formType === undefined 时，则使用平级属性，不去 field.form 查找
    newField = field
  }


  /* if (typeof formType === 'boolean' && !formType) {
    isText = true
    newField = field
  } else if (formType && field.form) {
    newField = field.form[formType]
    if (typeof newField === 'boolean' && !newField) {
      isText = true
    } else if (newField) {
      Object.keys(field.form).forEach(e => e === formType || delete field.form[e])
    } else if (/type|rules|enums|render|meta|required|disabled|placeholder/i.test(Object.keys(field.form).toString())) {
      newField = _.cloneDeep(field.form)
      Object.keys(newField).forEach(e => {
        /type|rules|enums|render|meta|required|disabled|placeholder/i.test(e) || delete newField[e]
      })
    } else {
      newField = _.cloneDeep(field)
      delete newField.form
    }
  } else if (field.form) {
    if (/type|rules|enums|render|meta|required|disabled|placeholder/i.test(Object.keys(field.form).toString())) {
      newField = _.cloneDeep(field.form)
      Object.keys(newField).forEach(e => {
        /type|rules|enums|render|meta|required|disabled|placeholder/i.test(e) || delete newField[e]
      })
    } else {
      newField = _.cloneDeep(field)
      delete newField.form
    }
  } else {
    newField = field
  } */

  if (showLabel) {
    label = label === undefined ? name : label
  }

  help = help === undefined ? (newField && newField.help) : help

  const dataItem = item || { [key]: initialValue }
  const fieldItem = extend(field, { rules, ...newField })

  if (isText || fieldItem.type === 'hidden') {
    hasFeedback = false
  }

  if (fieldItem.hasFeedback !== undefined) {
    hasFeedback = fieldItem.hasFeedback
  }

  if (fieldItem.disabled !== undefined) {
    disabled = fieldItem.disabled
  }

  if (fieldItem.placeholder !== undefined) {
    placeholder = fieldItem.placeholder
  }

  delete fieldItem.form

  formItemProps = extend(formItemProps, { label, help, hasFeedback, key })
  inputProps = extend(inputProps, { onChange, disabled })

  return (
    <FormItem {...formItemProps} key={fieldItem.key}>
      {FormUtil.createFieldDecorator(fieldItem, dataItem, (form && form.getFieldDecorator) || undefined, placeholder, inputProps, decoratorOpts, isText)}
    </FormItem>
  )
}
