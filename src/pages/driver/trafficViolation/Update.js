/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:15:45 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 15:15:45 
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, DatePicker } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Update = options => {
  const { dispatch, form, trafficViolation } = options
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
          type: 'trafficViolationStore/update',
          ...values,
          violationTime: form.getFieldValue('violationTime') !== undefined ? form.getFieldValue('violationTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'trafficViolationStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改交通违法">
                {getFieldDecorator('id', { initialValue: trafficViolation.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: trafficViolation.qualificationNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶员姓名&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('userName', {
                    initialValue: trafficViolation.userName,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('carNo', {
                    initialValue: trafficViolation.carNo,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车牌号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('plateNumber', {
                    initialValue: trafficViolation.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('violationTime', {
                    rules: [{ required: true, message: '请输入发生时间!' }],
                    initialValue: moment(trafficViolation.violationTime),
                  })(
                    <DatePicker style={{ width: 200 }} showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        详细地址&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('violationAddress', {
                    rules: [{ required: true, whitespace: true, message: '请输入详细地址!' }],
                    initialValue: trafficViolation.violationAddress,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        违章代码&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('violationNo', {
                    rules: [{ required: true, whitespace: true, message: '请输入违章代码!' }],
                    initialValue: trafficViolation.violationNo,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishResult', {
                    initialValue: trafficViolation.punishResult,
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:violation:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={10} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ trafficViolationStore }) {
  return {
    trafficViolation: trafficViolationStore.trafficViolation,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
