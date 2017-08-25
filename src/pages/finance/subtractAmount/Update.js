/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:46:44 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:46:44 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { MonthPicker } = DatePicker

let Update = options => {
  const { dispatch, form, subtractAmount } = options
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

  let subtractTypeDesc
  switch (subtractAmount.subtractType) {
    case 'SERVICE_SUB':
      subtractTypeDesc = '营运核减'
      break
    case 'REPAIR_SUB':
      subtractTypeDesc = '维修核减'
      break
    case 'ACCIDENT_SUB':
      subtractTypeDesc = '维修核减'
      break
  }

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'subtractAmountStore/update',
          ...values,
          subDate: form.getFieldValue('subDate') !== undefined ? form.getFieldValue('subDate').format('YYYY-MM-DD') : undefined,
          yearMonth: form.getFieldValue('yearMonth') !== undefined ? form.getFieldValue('yearMonth').format('YYYYMM') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'subtractAmountStore/toPage',
    })
  }

  const ym = subtractAmount.yearMonth.toString()

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改核减金额明细">
                {getFieldDecorator('id', { initialValue: subtractAmount.id })(<Input type="hidden" />)}
                {getFieldDecorator('carId', { initialValue: subtractAmount.carId })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: subtractAmount.driverId })(<Input type="hidden" />)}
                {getFieldDecorator('orgNo', { initialValue: subtractAmount.orgNo })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: subtractAmount.qualificationNo,
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
                    initialValue: subtractAmount.userName,
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
                    initialValue: subtractAmount.carNo,
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
                    initialValue: subtractAmount.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        年月&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('yearMonth', {
                    rules: [{ required: true, message: '请选择年月!' }],
                    initialValue: moment(`${ym.substr(0, 4)}-${ym.substr(4, 6)}`),
                  })(<MonthPicker format="YYYYMM" />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减类型&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('subtractType', {
                    rules: [{ required: true, message: '请选择核减类型!' }],
                    initialValue: subtractAmount.subtractType,
                  })(
                    <RadioGroup>
                      <Radio value={'SERVICE_SUB'}>营运核减</Radio>
                      <Radio value={'REPAIR_SUB'}>维修核减</Radio>
                      <Radio value={'ACCIDENT_SUB'}>事故核减</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('subAmount', {
                    rules: [{ required: true, message: '请输入核减金额!' }],
                    initialValue: subtractAmount.subAmount,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        核减日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('subDate', {
                    rules: [{ required: true, message: '请选择核减日期!' }],
                    initialValue: moment(subtractAmount.subDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:subtractAmount:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
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

function mapStateToProps({ subtractAmountStore }) {
  return {
    subtractAmount: subtractAmountStore.subtractAmount,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
