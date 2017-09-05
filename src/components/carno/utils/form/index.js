import moment from 'moment'
import _ from 'lodash'
import { default as fieldTypes, formBindType, isBindFormType } from './fieldTypes'

/*
 * 获取date数据的时间戳
 */
const getDateValue = (value, defaultValue = undefined) => {
  return value ? value.valueOf() : defaultValue
}

/*
 * 获取表单field数组
 * 示例:
 * const formFields = getFields(fields,['name','author'],{ name: { rules: []}}).values();
 * const formFields = getFields(fields).excludes(['id','desc']).values();
 * const formFields = getFields(fields).pick(['name','author','openTime']).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
const getSearchFields = (originFields, fieldKeys) => {
  const chain = {}
  let fields = [...originFields]

  const pick = keys => {
    keys = [].concat(keys)
    fields = keys.map(key => {
      let field
      for (let i in fields) {
        const item = fields[i]
        if (key === item.key) {
          field = key
        }
      }

      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key,
          name: key,
        }
      }
      return field
    })
    return chain
  }

  const excludes = keys => {
    keys = [].concat(keys)
    fields = fields.filter(field => {
      for (let i in keys) {
        const item = keys[i]
        if (item !== field.key) {
          return true
        }
      }
      return false
    })
    return chain
  }

  const values = () => {
    return fields
  }

  const mixins = keys => {
    keys = [].concat(keys)
    fields = keys.map(key => {
      let field
      if (typeof key === 'string') {
        for (let i in fields) {
          const item = fields[i]
          if (item.key === key) {
            field = item
            continue
          }
        }
        if (!field) {
          field = { key }
        }
      } else {
        field = key
      }
      return field
    })
    return chain
  }

  if (fieldKeys) {
    mixins(fieldKeys)
  }

  return Object.assign(chain, {
    pick,
    excludes,
    values,
  })
}

/*
 * 获取表单field数组
 * 示例:
 * const formFields = getFields(fields,['name','author'],{ name: { rules: []}}).values();
 * const formFields = getFields(fields).excludes(['id','desc']).values();
 * const formFields = getFields(fields).pick(['name','author','openTime']).enhance({name:{ rules: [] }}).values();
 * @param originField 原始fields
 * @param fieldKeys 需要包含的字段keys
 * @param extraFields 扩展的fields
 * @result 链式写法，返回链式对象(包含pick,excludes,enhance,values方法), 需要调用values返回最终的数据
 */
const getFields = (originFields, fieldKeys, extraFields) => {
  const chain = {}
  let fields = [...originFields]

  const pick = keys => {
    keys = [].concat(keys)
    fields = keys.map(key => {
      let field
      for (let i in fields) {
        const item = fields[i]
        if (key === item.key) {
          field = key
        }
      }

      if (!field) {
        // 如果field不存在，则默认类型的field
        field = {
          key,
          name: key,
        }
      }
      return field
    })
    return chain
  }

  const excludes = keys => {
    keys = [].concat(keys)
    fields = fields.filter(field => {
      for (let i in keys) {
        const item = keys[i]
        if (item === field.key) {
          return false
        }
      }
      return true
    })
    return chain
  }

  const enhance = _extraFields => {
    if (!Array.isArray(_extraFields)) {
      _extraFields = Object.keys(_extraFields).map(key => {
        return Object.assign(_extraFields[key], {
          key,
        })
      })
    }

    _extraFields.forEach(extraField => {
      let field

      for (let i in fields) {
        const item = fields[i]
        if (item.key === extraField.key) {
          field = item
        }
      }

      if (field) {
        Object.assign(field, extraField)
      } else {
        fields.push(extraField)
      }
    })
    return chain
  }

  const values = () => {
    return fields
  }

  const toMapValues = () => {
    return fields.reduce((map, field) => {
      map[field.key] = field
      return map
    }, {})
  }

  const mixins = keys => {
    keys = [].concat(keys)
    fields = keys.map(key => {
      let field
      if (typeof key === 'string') {
        for (let i in fields) {
          const item = fields[i]
          if (item.key === key) {
            field = item
            continue
          }
        }
        if (!field) {
          field = { key }
        }
      } else {
        field = key
      }
      return field
    })
    return chain
  }

  if (fieldKeys) {
    mixins(fieldKeys)
  }

  if (extraFields) {
    enhance(extraFields)
  }

  return Object.assign(chain, {
    pick,
    excludes,
    enhance,
    values,
    toMapValues,
  })
}

/*
 * 创建antd fieldDecorator
 */
const createFieldDecorator = (field, item, getFieldDecorator, placeholder, inputProps = {}, decoratorOpts = {}, isText = false) => {
  const { key } = field
  let { type, rules, enums, render, meta, required, form } = field

  type = (Object.prototype.hasOwnProperty.call(fieldTypes, type) && type) || ((form && form.enums) && 'enum') || (enums && 'enum') || 'text'
  if (type === 'switch') {
    decoratorOpts = {
      valuePropName: 'checked',
    }
  }

  const typedItem = (fieldTypes[type] || render)({ initialValue: item[key] || null, meta, field, inputProps, placeholder, isText })
  let { input, initialValue } = typedItem

  if (React.isValidElement(typedItem)) {
    input = typedItem
    initialValue = item[key]
  }

  if (required && !rules) {
    rules = [{
      required: true,
      message: `请输入${field.name}`,
    }]
  }

  return getFieldDecorator(key, { initialValue, rules, inputProps, ...decoratorOpts })(input)
}

/*
 * 包装antd form validateFields
 * 主要用途自动转换date类型数据，validateFields提供的错误处理大部分情况下都用不到，故提供一个包装函数，简化使用
 * 示例:
 * validate(form, fields)((values) => {
 *     onSave({
 *       ...values,
 *     });
 *  });
 * @param form, antd form对象
 * @param 返回result函数，参数为: onSuccess, onError
 */
const validate = (form, fields, formType) => {
  const { validateFields } = form

  const transformValues = values => {
    const newValues = {}
    Object.keys(values).forEach(key => {
      const item = _.find(fields, e => e.key === key)
      const value = values[key]
      const isDateTimeType = value && value instanceof moment
      let newValue
      if (isDateTimeType) {
        if (item) {
          if (typeof item.format === 'boolean' && !item.format) {
            newValue = values[key]
          } else if (item.format) {
            newValue = values[key].format(item.format)
          } else if (/^date$/.test(item.type)) {
            newValue = values[key].format('YYYY-MM-DD')
          } else if (/^datetime$/.test(item.type)) {
            newValue = values[key].format('YYYY-MM-DD hh:mm:ss')
          } else {
            newValue = getDateValue(values[key])
          }
        } else {
          newValue = getDateValue(values[key])
        }
      } else {
        newValue = values[key]
      }

      // 如果value为undefined,则不赋值到values对象上
      if (newValue !== undefined) {
        if (item.submit !== undefined && !item.submit) {
          return
        } else if (formType !== undefined && item[formType].submit !== undefined && !item[formType].submit) {
          return
        }

        newValues[key] = newValue
      }
    })
    return newValues
  }

  return (onSuccess, onError) => {
    validateFields((errors, values) => {
      if (errors) {
        onError && onError(errors)
      } else {
        onSuccess(transformValues(values), values)
      }
    })
  }
}

export default { isBindFormType, fieldTypes, formBindType, getFields, getSearchFields, validate, getDateValue, createFieldDecorator }

