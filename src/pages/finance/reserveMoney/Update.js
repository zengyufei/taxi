/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:52:52
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:52:52
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker, message } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let Update = options => {
  const { dispatch, form, reserveMoney } = options
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
          type: 'reserveMoneyStore/update',
          ...values,
          payDate: form.getFieldValue('payDate') !== undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
          submitDate: form.getFieldValue('submitDate') !== undefined ? form.getFieldValue('submitDate').format('YYYY-MM-DD') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'reserveMoneyStore/toPage',
    })
  }

  //结算
  const settle = () => {
    const totalAmount = form.getFieldValue('totalAmount');
    const accidentSubAmount = form.getFieldValue('accidentSubAmount');
    const violationSubAmount = form.getFieldValue('violationSubAmount');
    const chargingSubAmount = form.getFieldValue('chargingSubAmount');
    const otherSubAmount = form.getFieldValue('otherSubAmount');
    if(totalAmount > 0){
      form.setFieldsValue({
        refundAmount : (totalAmount * 100 - accidentSubAmount * 100 - violationSubAmount * 100 - chargingSubAmount * 100 - otherSubAmount * 100)/100
      });
    } else {
      message.info('请填写预留金金额');
    }
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改预留金">
                {getFieldDecorator('id', { initialValue: reserveMoney.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: reserveMoney.qualificationNo,
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
                >
                  {getFieldDecorator('userName', {
                    initialValue: reserveMoney.userName,
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
                >
                  {getFieldDecorator('carNo', {
                    initialValue: reserveMoney.carNo,
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
                >
                  {getFieldDecorator('plateNumber', {
                    initialValue: reserveMoney.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        预留金金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('totalAmount', {
                    rules: [{ required: true, message: '请输入预留金金额!' }],
                    initialValue: reserveMoney.totalAmount,
                  })(
                    <InputNumber min={0} max={9999999} precision={2}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        缴纳日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('submitDate', {initialValue: moment(reserveMoney.submitDate)})(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        交通事故扣减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('accidentSubAmount', { initialValue: reserveMoney.accidentSubAmount })(
                    <InputNumber min={0} max={9999999} precision={2}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        交通违法扣减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('violationSubAmount', { initialValue: reserveMoney.violationSubAmount })(
                    <InputNumber min={0} max={9999999} precision={2}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        充电费用扣减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('chargingSubAmount', { initialValue: reserveMoney.chargingSubAmount })(
                    <InputNumber min={0} max={9999999} precision={2}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        其它项扣减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('otherSubAmount', { initialValue: reserveMoney.otherSubAmount })(
                    <InputNumber min={0} max={9999999} precision={2}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        退款金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('refundAmount', { initialValue: reserveMoney.refundAmount })(
                    <InputNumber precision={2} disabled/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        退款日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('payDate', { initialValue: moment(reserveMoney.payDate) })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:reserveMoney:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <ZButton permission="finance:reserveMoney:update">
                    <Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={settle}>结算</Button>
                  </ZButton>
                  <Button
                    key="returnLoginButton"
                    htmlType="button"
                    size="large"
                    style={{ marginLeft: '30px' }}
                    onClick={toPage}
                  >返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ reserveMoneyStore }) {
  return {
    reserveMoney: reserveMoneyStore.reserveMoney,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
