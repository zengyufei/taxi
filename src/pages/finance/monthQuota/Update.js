import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { MonthPicker } = DatePicker

let Update = options => {
  const { dispatch, form, monthQuota } = options
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
          type: 'monthQuotaStore/update',
          ...values,
          yearMonth: form.getFieldValue('yearMonth') !== undefined ? form.getFieldValue('yearMonth').format('YYYYMM') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'monthQuotaStore/toPage',
    })
  }

  const ym = monthQuota.yearMonth.toString()

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改月缴定额">
                {getFieldDecorator('id', { initialValue: monthQuota.id })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: monthQuota.driverId })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('qualificationNo', {
                    initialValue: monthQuota.qualificationNo,
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
                    initialValue: monthQuota.userName,
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
                    initialValue: monthQuota.carNo,
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
                    initialValue: monthQuota.plateNumber,
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
                  })(
                    <MonthPicker format="YYYYMM" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        出勤天数&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('workDays', {
                    rules: [{ required: true, message: '请填写出勤天数!' }],
                    initialValue: monthQuota.workDays,
                  })(
                    <InputNumber min={0} max={10000} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        月末状态&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('endStatus', {
                    rules: [{ required: true, whitespace: true, message: '请选择月末状态!' }],
                    initialValue: monthQuota.endStatus,
                  })(
                    <RadioGroup>
                      <Radio value={'WORKING'}>在职</Radio>
                      <Radio value={'DIMISSION'}>离职</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        标准营收金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('standardAmount', {
                    rules: [{ required: true, message: '请填写标准营收金额!' }],
                    initialValue: monthQuota.standardAmount,
                  })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        计划营收金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('planAmount', { initialValue: monthQuota.planAmount })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        营运核减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('serviceSubAmount', { initialValue: monthQuota.serviceSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        维修核减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('repairSubAmount', { initialValue: monthQuota.repairSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故核减总金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('accidentSubAmount', { initialValue: monthQuota.accidentSubAmount })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        实际营收金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('realAmount', { initialValue: monthQuota.realAmount })(
                    <InputNumber min={0} max={9999999} />
                  )} 元
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:monthQuota:update">
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

function mapStateToProps({ monthQuotaStore }) {
  return {
    monthQuota: monthQuotaStore.monthQuota,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
