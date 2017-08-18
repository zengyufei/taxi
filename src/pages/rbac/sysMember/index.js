import { connect } from 'dva'
import { Form } from 'antd'

import List from './List'
import Add from './Add'
import Update from './Update'

let SysMember = option => {
  const { form } = option

  return (
    <div>
      <Add form={form} />
      <Update form={form} />
      <List form={form} />
    </div>
  )
}

export default connect()(Form.create()(SysMember))
