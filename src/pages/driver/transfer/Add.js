/*
 * @Author: zengyufei
 * @Date: 2017-08-25 15:43:07
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-09-05 12:47:59
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Row, Col, Button, Card, DatePicker, AutoComplete, Radio, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

let Add = options => {
  const { dispatch, form, driver, drivers, carNos, visible, qualificationNos, newDriver } = options
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
          type: 'transferStore/insert',
          ...values,
          transferDate: form.getFieldValue('transferDate') !== undefined ? form.getFieldValue('transferDate').format('YYYY-MM-DD') : undefined,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'transferStore/toPage',
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
  if (driver.features !== undefined || driver.features != null) {
    carNo = JSON.parse(driver.features).carNo
  }

  /** 模糊查询 新车主从业资格证编号 */
  const newHandleSearch = value => {
    dispatch({
      type: 'driverCommonStore/queryLikeQualificationNo',
      str: value,
    })
  }
  /** 格证号 查询 新车主信息 */
  const queryNewByQualificationNo = value => {
    dispatch({
      type: 'driverStore/queryNewByQualificationNo',
      qualificationNo: value,
    })
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
              <Card title="新增驾驶员过户">
                {getFieldDecorator('carId', { initialValue: driver !== undefined ? driver.carId : '' })(<Input type="hidden" />)}
                {getFieldDecorator('oldDriverId', { initialValue: driver !== undefined ? driver.id : '' })(<Input type="hidden" />)}
                {getFieldDecorator('newDriverId', { initialValue: newDriver !== undefined ? newDriver.id : '' })(<Input type="hidden" />)}
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
                        旧车主从业资格证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  <Col span={18}>
                    {getFieldDecorator('oldQualificationNo', {
                      initialValue: form.getFieldValue('carNo') === carNo && driver !== undefined ? driver.qualificationNo : '',
                    })(
                      <Input />
                    )}
                  </Col>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        旧车主姓名&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('oldUserName', {
                    initialValue: form.getFieldValue('carNo') === carNo && driver !== undefined ? driver.userName : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        新车主从业资格证号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('newQualificationNo', {
                    rules: [{ required: true, whitespace: true, message: '请输入新车主从业资格证号!' }],
                  })(
                    <AutoComplete
                      dataSource={qualificationNos}
                      onSearch={newHandleSearch}
                      onSelect={queryNewByQualificationNo}
                      onChange={queryNewByQualificationNo}
                      placeholder="新车主从业资格证号"
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        新车主姓名&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('newUserName', {
                    initialValue: newDriver !== undefined ? newDriver.userName : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        过户时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('transferDate', {
                    rules: [{ required: true, message: '请选择过户时间!' }],
                  })(<DatePicker />)}
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
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:transfer:insert">
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

function mapStateToProps({ driverStore, driverCommonStore }) {
  return {
    carNos: driverCommonStore.carNos,
    driver: driverCommonStore.driver,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
    qualificationNos: driverCommonStore.qualificationNos,
    newDriver: driverStore.newDriver,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
