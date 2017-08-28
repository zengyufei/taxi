/**
 * 依赖的摆放顺序是：
 * 1. 非按需加载在最上面
 * 2. 按需加载的在下面
 * 3. 按长度从短到长
 * 4. 从对象再获取对象点出来的在按需加载下面
 * 5. 本系统业务对象在最下面，且路径不应该为相对路径，应为别名路径，别名查看 webpack.config.js
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group

let Update = options => {
  const { dispatch, form, nonBusinessIncome } = options
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
          type: 'nonBusinessIncomeStore/update',
          ...values,
          payDate: form.getFieldValue('payDate') !== undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'nonBusinessIncomeStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改月缴定额">
                {getFieldDecorator('id', { initialValue: nonBusinessIncome.id })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('qualificationNo', {
                    rules: [{ required: true, whitespace: true, message: '请输入从业资格证号!' }],
                    initialValue: nonBusinessIncome.qualificationNo,
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
                    initialValue: nonBusinessIncome.userName,
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
                    initialValue: nonBusinessIncome.carNo,
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
                    initialValue: nonBusinessIncome.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        类型&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('inComeType', {
                    rules: [{ required: true, message: '请选择类型!' }],
                    initialValue: nonBusinessIncome.inComeType,
                  })(
                    <RadioGroup>
                      <Radio value={'BUSINESS_INCOME'}>运营收入</Radio>
                      <Radio value={'CLOTHING_INCOME'}>服装收入</Radio>
                      <Radio value={'LABEL_INCOME'}>标识贴收入</Radio>
                      <Radio value={'BILL_INCOME'}>票据收入</Radio>
                      <Radio value={'SEATCOVER_INCOME'}>座套收入</Radio>
                      <Radio value={'ORTHER_INCOME'}>其它收入</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        项目名称&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('itemName', {
                    rules: [{ required: true, whitespace: true, message: '请输入项目名称!' }],
                    initialValue: nonBusinessIncome.itemName,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        数量&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('count', {
                    initialValue: nonBusinessIncome.count,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        单价&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('unitPrice', {
                    initialValue: nonBusinessIncome.unitPrice,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('amount', {
                    rules: [{ required: true, message: '请输入金额!' }],
                    initialValue: nonBusinessIncome.amount,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        经办人&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('opratorUser', {
                    initialValue: nonBusinessIncome.opratorUser,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        缴款日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('payDate', {
                    rules: [{ required: true, message: '请选择缴款日期!' }],
                    initialValue: moment(nonBusinessIncome.payDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:nonBusinessIncome:update">
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

function mapStateToProps({ nonBusinessIncomeStore }) {
  return {
    nonBusinessIncome: nonBusinessIncomeStore.nonBusinessIncome,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
