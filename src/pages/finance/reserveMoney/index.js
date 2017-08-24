import { Form } from 'antd'
import List from './List'

const index = options => {
  const { form } = options

  return (
    <div>
      <List form={form} />
    </div>
  )
}

export default Form.create()(index)
