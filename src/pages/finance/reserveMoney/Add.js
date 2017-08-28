/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:51:24
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 15:31:07
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker, AutoComplete, Modal, message } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

let Add = options => {
  const { dispatch, form, driver, drivers, carNos, visible } = options
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
          type: 'reserveMoneyStore/insert',
          ...values,
          payDate: form.getFieldValue('payDate') !== undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
          submitDate: form.getFieldValue('submitDate') !== undefined ? form.getFieldValue('submitDate').format('YYYY-MM-DD') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
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

  /** 模糊查询 车辆自编号 */
  const handleSearch = value => {
    dispatch({
      type: 'driverCommonStore/queryLikeCarNo',
      str: value,
    })
  }
  /** 自编号查询车信息 */
  const queryByCarNo = () => {
    dispatch({
      type: 'driverCommonStore/queryDriverListByOption',
      carNo: form.getFieldValue('carNo'),
    })
  }
  let carNo
  let rbs = []
  const onCancel = () => {
    dispatch({
      type: 'driverCommonStore/onCancel',
      visible: false,
      drivers: [],
    })
  }

  if (drivers.length === 1) {
    dispatch({
      type: 'driverCommonStore/queryDriver',
      drivers,
      driver,
      index: 0,
    })
    onCancel()
  } else if (drivers.length > 1) {
    drivers.forEach((value, index) => {
      rbs.push(<RadioButton key={index} value={index}>{value.userName} {value.qualificationNo}</RadioButton>)
    })
    // 弹出选择框
    dispatch({
      type: 'driverCommonStore/onCancel',
      visible: true,
      drivers,
    })
  }
  const onOk = e => {
    dispatch({
      type: 'driverCommonStore/queryDriver',
      drivers,
      driver,
      index: e.target.value,
    })
    onCancel()
  }
  if (driver.features) {
    carNo = JSON.parse(driver.features).carNo
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="驾驶员人员"
        onCancel={onCancel}
        footer={null}
      >
        <RadioGroup onChange={onOk} size="large">
          {rbs}
        </RadioGroup>
      </Modal>
      <TweenOneGroup>
        <Row key="0">
          <Col span={12}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="预留金收入">
                {getFieldDecorator('carId', { initialValue: driver !== undefined ? driver.carId : '' })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: driver !== undefined ? driver.id : '' })(<Input type="hidden" />)}
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        自编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  <Col span={18}>
                    {getFieldDecorator('carNo', {
                      rules: [{ required: true, message: '请输入自编号!', whitespace: true }],
                    })(
                      <AutoComplete
                        dataSource={carNos}
                        onSearch={handleSearch}
                        placeholder="车辆自编号"
                      />
                    )}
                  </Col>
                  <Col span={4}>
                    <Button style={{ marginLeft: '30px' }} onClick={queryByCarNo}>查询</Button>
                  </Col>
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
                    initialValue: form.getFieldValue('carNo') === carNo && driver.features !== undefined ? JSON.parse(driver.features).plateNumber : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        从业资格证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  <Col span={18}>
                    {getFieldDecorator('qualificationNo', {
                      initialValue: form.getFieldValue('carNo') === carNo && driver !== undefined ? driver.qualificationNo : '',
                    })(
                      <Input disabled />
                    )}
                  </Col>
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
                    initialValue: form.getFieldValue('carNo') === carNo && driver !== undefined ? driver.userName : '',
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
                    initialValue: 0,
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
                  {getFieldDecorator('submitDate', {})(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        交通事故扣减金额&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('accidentSubAmount', {initialValue: 0})(
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
                  {getFieldDecorator('violationSubAmount', {initialValue: 0})(
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
                  {getFieldDecorator('chargingSubAmount', {initialValue: 0})(
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
                  {getFieldDecorator('otherSubAmount', {initialValue: 0})(
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
                  {getFieldDecorator('refundAmount')(
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
                  {getFieldDecorator('payDate', {})(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:reserveMoney:insert">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <ZButton permission="finance:reserveMoney:insert">
                    <Button type="primary" size="large" style={{ marginLeft: '30px' }} onClick={settle}>结算</Button>
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

function mapStateToProps({ driverCommonStore }) {
  return {
    carNos: driverCommonStore.carNos,
    driver: driverCommonStore.driver,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
