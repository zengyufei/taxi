import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Icon, Button, Row, Col, Card } from 'antd'
import banner from 'assets/banner.jpg'
import ZFormItem from 'ZFormItem'
import { validate, getFields } from 'FormUtils'

const TweenOneGroup = TweenOne.TweenOneGroup

const { title } = projectConfig
const isDev = process.env.NODE_ENV.indexOf('dev') > -1

const Login = option => {
  const { dispatch, form } = option

  const itemProps = { form,
    item: {
      account: isDev ? 'admin' : '',
      password: isDev ? 'admin' : '',
    },
  }
  const fieldMap = getFields(fields).toMapValues()

  /**
   * 提交表单
   */
  const handleSubmit = e => {
    e.preventDefault() // 破坏form 原有的提交功能
    validate(form, fields)(values => {
      dispatch({
        type: 'loginStore/login',
        ...values,
      })
    })
  }

  return (
    <div>
      <TweenOneGroup key="b">
        <Row key="1" >
          <div style={{ float: 'left' }}>
            <img src={banner} style={{ paddingTop: '200px' }} alt="登录" />
          </div>
          <Col span={12} offset={9}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '350px', marginTop: '-400px' }}>
              <Card title={title}>
                <ZFormItem {...itemProps} field={fieldMap.account} inputProps={{ prefix: <Icon type="user" style={{ fontSize: 13 }} /> }} placeholder="账户" />
                <ZFormItem {...itemProps} field={fieldMap.password} inputProps={{ prefix: <Icon type="lock" style={{ fontSize: 13 }} /> }} placeholder="密码" />
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>登录</Button>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

const fields = [
  {
    key: 'account',
    rules: [{
      required: true,
      message: '请输入账号!',
    }],
  }, {
    key: 'password',
    type: 'password',
    rules: [{
      required: true,
      message: '请输入密码!',
    }],
  },
]

export default Form.create()(connect()(Login))
