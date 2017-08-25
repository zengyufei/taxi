import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import ZFormItem from 'ZFormItem'
import { getFields } from 'FormUtils'
import { Form, Input, Row, Col, Button, Card,
  DatePicker, Radio, InputNumber } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
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

let Update = options => {
  const { dispatch, form, trafficAccident } = options
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
      areaCode: [trafficAccident.provinceCode, trafficAccident.cityCode, trafficAccident.areaCode],
    },
    ...formItemLayout }
  const fieldMap = getFields(fields).toMapValues()

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'trafficAccidentStore/update',
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

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改交通事故">
                {getFieldDecorator('id', { initialValue: trafficAccident.id })(<Input type="hidden" />)}
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
                    initialValue: trafficAccident.qualificationNo,
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
                    initialValue: trafficAccident.userName,
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
                    initialValue: trafficAccident.carNo,
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
                    initialValue: trafficAccident.plateNumber,
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
                    initialValue: moment(trafficAccident.accidentTime),
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
                    initialValue: trafficAccident.weather,
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
                    initialValue: trafficAccident.canDriverCar,
                  })(
                    <Input />
                  )}
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
                    initialValue: trafficAccident.accidentPlace,
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
                    initialValue: trafficAccident.accidentAddress,
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
                    initialValue: trafficAccident.accidentCause,
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
                    rules: [{ required: true, whitespace: true, message: '请输入事故形态!' }],
                    initialValue: trafficAccident.accidentModel,
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
                        事故摘要以及伤亡情况&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('accidentDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入事故摘要以及伤亡情况!' }],
                    initialValue: trafficAccident.accidentDesc,
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
                    rules: [{ required: true, message: '请填写手上人数!' }],
                    initialValue: trafficAccident.injuredNumber,
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
                    initialValue: trafficAccident.deathNumber,
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
                    rules: [{ required: true, whitespace: true, message: '请输入对方资料!' }],
                    initialValue: trafficAccident.otherInfoDesc,
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
                    initialValue: trafficAccident.accidentNature,
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
                    initialValue: trafficAccident.dutyType,
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
                  {getFieldDecorator('documentNo', { initialValue: trafficAccident.documentNo })(<Input />)}
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
                  {getFieldDecorator('totalLoss', {
                    initialValue: trafficAccident.totalLoss,
                  })(
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
                  {getFieldDecorator('closeDate', {
                    initialValue: moment(trafficAccident.closeDate),
                  })(
                    <DatePicker />
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:accident:update">
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

function mapStateToProps({ trafficAccidentStore }) {
  return {
    trafficAccident: trafficAccidentStore.trafficAccident,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
