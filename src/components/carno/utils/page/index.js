import { connect } from 'dva'
import { Form } from 'antd'

/**
 * 模型继承方法
 *
 * 如果参数只有一个，则继承默认model
 * 等同于 export default connect()(Form.create(formOptions)(connect(mapStateToProps, mapDispatchToProps)(List)))
 */
function extend(page, { mapStateToProps, mapDispatchToProps, formOptions }) {
  if (Object.keys(formOptions).length) {
    return connect()(Form.create(formOptions)(connect(mapStateToProps, mapDispatchToProps)(page)))
  }
  return Form.create()(connect(mapStateToProps, mapDispatchToProps)(page))
}

export default {
  extend,
}
