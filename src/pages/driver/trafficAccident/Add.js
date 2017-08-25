import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import ZFormItem from 'ZFormItem'
import { getFields } from 'FormUtils'
import { Form, Input, Row, Col, Button, Card, Modal,
  DatePicker, Radio, InputNumber, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const fields = [
  {
    key: 'areaCode',
    name: '事发区域',
    type: 'area',
    rules: [
      { required: true, message: '请选择事发区域!' },
      {
        validator(rule, value, callback) {
          if (value === undefined) {
            callback()
          } else {
            value.length === 0 ?
              callback() :
              value.length === 1 ? callback('请选择选择城市') :
                value.length === 2 ? callback('请选择选择区县') : callback()
          }
        },
      }],
  },
]

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

  const itemProps = { form,
    item: {
    },
    ...formItemLayout }
  const fieldMap = getFields(fields).toMapValues()


  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'trafficAccidentStore/insert',
          ...values,
          accidentTime: form.getFieldValue('accidentTime') !== undefined ? form.getFieldValue('accidentTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          closeDate: form.getFieldValue('closeDate') !== undefined ? form.getFieldValue('closeDate').format('YYYY-MM-DD') : undefined,
          areaCode: form.getFieldValue('areaCode')[2],
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'trafficAccidentStore/toPage',
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
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增交通事故">
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
                        肇事时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentTime', {
                    rules: [{ required: true, message: '请输入肇事时间!' }],
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        天气&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('weather', {
                    rules: [{ required: true, whitespace: true, message: '请输入天气情况!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        接触对象&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('canDriverCar', {
                    rules: [{ required: true, whitespace: true, message: '请输入接触对象!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        出事地点类型&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentPlace', {
                    rules: [{ required: true, message: '请输入出事地点类型!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <ZFormItem {...itemProps} field={fieldMap.areaCode} />
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体路段&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentAddress', {
                    rules: [{ required: true, whitespace: true, message: '请输入具体路段!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故原因&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentCause', {
                    rules: [{ required: true, whitespace: true, message: '请输入事故原因!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故形态&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentModel', {
                    rules: [{ required: true, whitespace: true, message: '请选择事故形态!' }],
                    initialValue: 'model_one',
                  })(
                    <RadioGroup>
                      <Radio value={'model_one'}>同向侧面碰刮</Radio>
                      <Radio value={'model_two'}>追尾相撞</Radio>
                      <Radio value={'model_three'}>倒车相撞</Radio>
                      <Radio value={'model_four'}>左转弯相撞</Radio>
                      <Radio value={'model_five'}>右转弯相撞</Radio>
                      <Radio value={'model_six'}>正面相撞</Radio>
                      <Radio value={'model_seven'}>运行伤害人体</Radio>
                      <Radio value={'model_eight'}>与其他物体相撞</Radio>
                      <Radio value={'model_nine'}>其他</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        摘要伤亡情况&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentDesc', {
                    rules: [{ required: true, whitespace: true, message: '事故摘要以及伤亡情况!' }],
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        受伤人数&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('injuredNumber', {
                    rules: [{ required: true, message: '请填写受伤人数!' }],
                  })(
                    <InputNumber min={0} max={10000} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        死亡人数&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('deathNumber', {
                    rules: [{ required: true, message: '请填写死亡人数!' }],
                  })(
                    <InputNumber min={0} max={10000} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        对方资料&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('otherInfoDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入对方资料摘要!' }],
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故性质&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentNature', {
                    rules: [{ required: true, whitespace: true, message: '请输入事故性质!' }],
                    initialValue: 'PROPERTY_LOSS',
                  })(
                    <RadioGroup>
                      <Radio value={'PROPERTY_LOSS'}>财产损失事故</Radio>
                      <Radio value={'INJURED'}>伤人事故</Radio>
                      <Radio value={'DEATH'}>死亡事故</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        责任&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('dutyType', {
                    rules: [{ required: true, whitespace: true, message: '请选择责任!' }],
                  })(
                    <RadioGroup>
                      <Radio value={'FULL_DUTY'}>全责</Radio>
                      <Radio value={'MAIN_DUTY'}>主责</Radio>
                      <Radio value={'SAME_DUTY'}>同责</Radio>
                      <Radio value={'LESS_DUTY'}>次责</Radio>
                      <Radio value={'NO_DUTY'}>无责</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事故档案编号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('documentNo', {})(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        总经损&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('totalLoss', { initialValue: 0 })(
                    <InputNumber min={0} max={9999999999} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        结案日期&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('closeDate', {})(
                    <DatePicker />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:accident:insert">
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

function mapStateToProps({ driverCommonStore }) {
  return {
    carNos: driverCommonStore.carNos,
    driver: driverCommonStore.driver,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
