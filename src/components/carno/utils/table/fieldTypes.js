import moment from 'moment'

/*
 * column类型定义
 */
const fieldTypes = {
  normal: value => value,
  number: value => value,
  textarea: value => value,
  datetime: value => {
    return value ? moment(new Date(parseInt(value, 10))).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  date: value => {
    return value ? moment(new Date(value)).format('YYYY-MM-DD') : ''
  },
  enum: (value, field) => {
    return field.enums[value]
  },
  boolean: value => {
    return (value === 'true' || value === true) ? '是' : '否'
  },
  invalid: value => {
    return +value === 1 ? '有效' : '无效'
  },
}

/*
 * 扩展column类型定义
 */
export const tableBindType = types => {
  Object.assign(fieldTypes, types)
}

/*
 * 判断是否已经扩展column类型定义
 */
export const isBindTableType = text => {
  return fieldTypes.hasOwnProperty(text)
}

export default fieldTypes

