/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:12:14 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:12:14 
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Add = options => {
  const { dispatch, form } = options
  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  }

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'punishInfoStore/insert',
          ...values,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'punishInfoStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增违章详情">
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishCode', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章编号!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章描述&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章描述!' }],
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:punishInfo:insert">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

export default Form.create()(connect()(Add))
