/*
 * column类型定义
 */
const fieldTypes = {
  normal: value => value,
  number: value => value,
  textarea: value => value,
  datetime: value => {
    return value
  },
  yearMonth: value => {
    return value
  },
  date: value => {
    return value
  },
  enum: (value, field) => {
    if (field.table && field.table.enums) {
      return field.table.enums[value]
    }
    return field.enums[value]
  },
  boolean: value => {
    return (value === 'true' || value === true) ? '是' : '否'
  },
  invalid: value => {
    return +value === 1 ? '有效' : '无效'
  },
  href: value => {
    return <a onClick={() => window.open(value)}>{value}</a>
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
  return Object.prototype.hasOwnProperty.call(fieldTypes, text)
}

export default fieldTypes

