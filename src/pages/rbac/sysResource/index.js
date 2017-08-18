import { Form } from 'antd'

import List from './List'
import Add from './Add'
import Update from './Update'

const SysResource = option => {
  const { form } = option

  return (
    <div>
      <Add form={form} />
      <Update form={form} />
      <List form={form} />
    </div>
  )
}

export default Form.create()(SysResource)
