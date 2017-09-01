import { connect } from 'dva'
import { Form } from 'antd'

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * 等同于 export default connect()(Form.create(formOptions)(connect(mapStateToProps, mapDispatchToProps)(List)))
 */
function extend(prefix, { mapStateToProps, mapDispatchToProps, formOptions = false }) {
  const storeName = `${prefix}Store`

  const newMapStateToProps = state => {
    return {
      loading: state.loading.models[storeName],
      ...mapStateToProps(state),
    }
  }
  if (typeof formOptions === 'boolean' && !!formOptions) {
    return page => {
      return connect()(Form.create({
        onValuesChange({ dispatch }, values) {
          dispatch({
            type: `${storeName}/updateState`,
            initValues: values,
          })
        },
      })(connect(newMapStateToProps, mapDispatchToProps)(page)))
    }
  } else if (!!formOptions && Object.keys(formOptions).length) {
    return page => {
      return connect()(Form.create(formOptions)(connect(newMapStateToProps, mapDispatchToProps)(page)))
    }
  }

  if (mapDispatchToProps) {
    return page => {
      return Form.create()(connect(newMapStateToProps, mapDispatchToProps)(page))
    }
  }
  return page => {
    return Form.create()(connect(newMapStateToProps)(page))
  }
}

export default {
  extend,
}
