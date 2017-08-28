/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:13:54
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 14:13:54
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, Radio, InputNumber, DatePicker, AutoComplete, Modal } from 'antd'

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
          type: 'nonBusinessIncomeStore/insert',
          ...values,
          payDate: form.getFieldValue('payDate') !== undefined ? form.getFieldValue('payDate').format('YYYY-MM-DD') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'nonBusinessIncomeStore/toPage',
    })
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
              <Card title="新增营业外收入">
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
                        类型&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('inComeType', {
                    rules: [{ required: true, whitespace: true, message: '请选择类型!' }],
                    initialValue: 'BUSINESS_INCOME',
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
                    initialValue: 0
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
                  {getFieldDecorator('unitPrice', {})(
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
                  })(<DatePicker />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="finance:nonBusinessIncome:insert">
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

function mapStateToProps({ driverCommonStore }) {
  return {
    carNos: driverCommonStore.carNos,
    driver: driverCommonStore.driver,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
