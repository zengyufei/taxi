/*
 * @Author: zengyufei 
 * @Date: 2017-08-22 17:50:34 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-22 17:54:00
 */
import { Form } from 'antd'

import List from './List'


let AnnualVerification = options => {

  const { form } = options

  return (
    <div>
      <List form={form} />
    </div>
  )
}


export default Form.create()(AnnualVerification)
