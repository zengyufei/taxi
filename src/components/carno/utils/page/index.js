import { connect } from 'dva'
import { Form } from 'antd'

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * 等同于 export default connect()(Form.create(formOptions)(connect(mapStateToProps, mapDispatchToProps)(List)))
 */
function extend({ prefix, mapStateToProps = true, mapDispatchToProps, formOptions = false }) {
  const storeName = `${prefix}Store`

  let newMapStateToProps = {}
  if (prefix !== undefined && typeof mapStateToProps === 'boolean' && mapStateToProps) {
    newMapStateToProps = state => {
      return {
        loading: state.loading.models[storeName],
        [storeName]: state[storeName],
      }
    }
  } else if (typeof mapStateToProps === 'function') {
    newMapStateToProps = state => {
      return {
        loading: state.loading.models[storeName],
        ...mapStateToProps(state),
      }
    }
  }

  const newFormOptions = {
    onValuesChange({ dispatch }, values) {
      dispatch({
        type: `${storeName}/updateInitValues`,
        initValues: values,
      })
    },
  }
  if (mapDispatchToProps) {
    const newMapDispatchToProps = (dispatch, ownProps) => ({
      methods: mapDispatchToProps(dispatch, ownProps),
    })

    if (typeof formOptions === 'boolean' && !!formOptions) {
      return page => {
        return connect()(Form.create(newFormOptions)(connect(newMapStateToProps, newMapDispatchToProps)(page)))
      }
    } else if (!!formOptions && Object.keys(formOptions).length) {
      return page => {
        return connect()(Form.create(formOptions)(connect(newMapStateToProps, newMapDispatchToProps)(page)))
      }
    }
    return page => {
      return Form.create()(connect(newMapStateToProps, newMapDispatchToProps)(page))
    }
  }


  if (typeof formOptions === 'boolean' && !!formOptions) {
    return page => {
      return connect(newMapStateToProps)(Form.create(newFormOptions)(page))
    }
  } else if (!!formOptions && Object.keys(formOptions).length) {
    return page => {
      return connect(newMapStateToProps)(Form.create(formOptions)(page))
    }
  }
  return page => {
    return Form.create()(connect(newMapStateToProps)(page))
  }
}

export default {
  extend,
}
