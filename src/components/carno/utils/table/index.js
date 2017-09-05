import { default as fieldTypes, tableBindType, isBindTableType } from './fieldTypes'

/*
 * 获取column中显示的filedValue
 */
function getFieldValue(value, field = {}) {
  let type = field.type || (field.enums && 'enum') || ((field.table && field.table.enums) && 'enum')
  type = Object.prototype.hasOwnProperty.call(fieldTypes, type) ? type : 'normal'
  return fieldTypes[type](value, field)
}

/*
 * 获取表格column数组
 * 示例:
 * const columns = getColumns(fields,['name','author'],{ name: { render: ()=>{} }}).values();
 * const columns = getColumns(fields).excludes(['id','desc']).values();
 * const columns = getColumns(fields).pick(['name','author','openTime']).enhance({name:{ render: ()=>{} }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
function getColumns(fields, fieldKeys, extraFields) {
  const chain = {}
  let columns = []

  const transform = _fields => {
    return _fields.map(field => {
      let { dataIndex, title, key, name, render, ...others } = field

      if (!render) {
        render = value => {
          return getFieldValue(value, field)
        }
      }

      return {
        dataIndex: key || dataIndex,
        title: name || title,
        render,
        ...others,
      }
    })
  }

  const pick = _fieldKeys => {
    _fieldKeys = [].concat(_fieldKeys)
    columns = _fieldKeys.map(fieldKey => {
      let column
      for (let i in columns) {
        const item = fields[i]
        if (fieldKey === (item.key || item.dataIndex)) {
          // 如果fieldKey不存在，则创建text类型的column
          column = {
            dataIndex: fieldKey,
            title: item.name || fieldKey,
            render: value => {
              return getFieldValue(value, item)
            },
          }
        }
      }
      return column
    })
    return chain
  }

  const excludes = _fieldKeys => {
    _fieldKeys = [].concat(_fieldKeys)
    columns = columns.filter(column => {
      for (let i in _fieldKeys) {
        const item = _fieldKeys[i]
        if (item === column.dataIndex) {
          return false
        }
      }
      return true
    })
    return chain
  }

  const enhance = _extraColumns => {
    if (!Array.isArray(_extraColumns)) {
      _extraColumns = Object.keys(_extraColumns).map(key => {
        return Object.assign(_extraColumns[key], {
          key,
        })
      })
    }
    _extraColumns.forEach(extraColumn => {
      const { dataIndex, title, key, name, ...others } = extraColumn
      extraColumn = {
        dataIndex: key || dataIndex,
        title: name || title,
        ...others,
      }

      let column
      for (let i in columns) {
        const item = columns[i]
        if (item.dataIndex === extraColumn.dataIndex) {
          column = item.dataIndex
        }
      }

      if (column) {
        Object.assign(column, extraColumn)
      } else {
        columns.push(extraColumn)
      }
    })

    return chain
  }

  const values = () => {
    return columns
  }

  columns = transform(fields)

  if (fieldKeys) {
    pick(fieldKeys)
  }

  if (extraFields) {
    enhance(extraFields)
  }

  return Object.assign(chain, {
    pick,
    excludes,
    enhance,
    values,
  })
}

export default {
  isBindTableType,
  fieldTypes,
  tableBindType,
  getFieldValue,
  getColumns,
}
