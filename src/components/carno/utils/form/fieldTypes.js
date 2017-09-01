import React from 'react'
import moment from 'moment'
import { DatePicker, Select, Input, Checkbox, InputNumber, Switch } from 'antd'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const MonthPicker = DatePicker.MonthPicker

/*
 * 表单字段类型
 */
const fieldTypes = {
  yearMonth: ({ initialValue, inputProps }) => {
    return {
      input: <MonthPicker {...inputProps} />,
      initialValue: initialValue ? moment(initialValue) : null,
    }
  },
  date: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker {...inputProps} />,
      initialValue: initialValue ? moment(initialValue) : null,
    }
  },
  datetime: ({ initialValue, inputProps }) => {
    return {
      input: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" {...inputProps} />,
      initialValue: initialValue ? moment(initialValue) : null,
    }
  },
  dateRange: ({ inputProps }) => {
    return <RangePicker showTime format="YYYY-MM-DD" {...inputProps} />
  },
  datetimeRange: ({ inputProps }) => {
    return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" {...inputProps} />
  },
  enum: ({ field, placeholder, inputProps }) => {
    let enums
    if (field.form && field.form.enums) {
      enums = field.form.enums
    } else {
      enums = field.enums
    }
    const enumsArray = Object.keys(enums).reduce((occ, key) => {
      occ.push({
        key,
        value: enums[key],
      })
      return occ
    }, [])
    placeholder = placeholder === false ? '' : (placeholder || `请选择${field.name}`)
    return (
      <Select allowClear placeholder={placeholder} {...inputProps} >
        {enumsArray.map(item =>
          (<Option key={item.key}>
            {item.value}
          </Option>),
        )}
      </Select>
    )
  },
  boolean: ({ inputProps }) => {
    return <Checkbox {...inputProps} />
  },
  switch: ({ inputProps }) => {
    return <Switch {...inputProps} />
  },
  number: ({ meta = {}, inputProps }) => {
    return <InputNumber min={meta.min || -Infinity} max={meta.max || Infinity} step={meta.step || 1} {...inputProps} />
  },
  textarea: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`)
    return <Input type="textarea" rows={meta.rows || 3} placeholder={placeholder} autosize={meta.autosize} {...inputProps} />
  },
  hidden: () => {
    return <Input type="hidden" />
  },
  text: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`)
    const disabled = inputProps.disabled || meta.disabled || false
    return <Input type="text" placeholder={placeholder} {...inputProps} disabled={disabled} />
  },
  password: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`)
    const disabled = inputProps.disabled || meta.disabled || false
    return <Input type="password" placeholder={placeholder} {...inputProps} disabled={disabled} />
  },
  textNumber: ({ meta = {}, field, placeholder, inputProps }) => {
    placeholder = placeholder === false ? '' : (placeholder || meta.placeholder || `请输入${field.name}`)
    return <Input type="text" placeholder={placeholder} {...inputProps} />
  },
}

/*
 * 扩展表单字段类型
 */
export function formBindType(extras) {
  Object.assign(fieldTypes, extras)
}

/*
 * 判断是否已经扩展column类型定义
 */
export const isBindFormType = text => {
  return fieldTypes.hasOwnProperty(text)
}


export default fieldTypes
