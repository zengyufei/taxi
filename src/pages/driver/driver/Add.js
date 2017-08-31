/*
 * @Author: zengyufei
 * @Date: 2017-08-25 14:59:12
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-29 10:28:22
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import ZFormItem from 'ZFormItem'
import { getFields } from 'FormUtils'
import { Form, Input, Row, Col,
  Button, Card, Radio, InputNumber, DatePicker, Switch, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker


const fields = [
  {
    key: 'education',
    name: '学历',
    enums: {
      PRIMARY_SCHOOL: '小学',
      MIDDLE_SCHOOL: '初中',
      HIGH_SCHOOL: '高中',
      JUNIOR_COLLEGE: '大专',
      UNDERGRADUATE: '本科',
    },
  }, {
    key: 'sex',
    name: '性别',
    required: true,
    enums: {
      male: '男',
      female: '女',
    },
  }, {
    key: 'bloodType',
    name: '血型',
    required: true,
    enums: {
      A: 'A 型',
      B: 'B 型',
      O: 'O 型',
      AB: 'AB 型',
    },
  }, {
    key: 'censusAreaCode',
    name: '户籍',
    type: 'area',
    rules: [
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
  }, {
    key: 'nativeAreaCode',
    name: '籍贯',
    type: 'area',
    rules: [
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
  const { dispatch, form, car, insuranceState, carNos } = options
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
      bloodType: 'A',
      sex: 'male',
    },
    ...formItemLayout }
  const fieldMap = getFields(fields).toMapValues()

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'driverStore/insert',
          ...values,
          accidentInsuranceBeginDate: form.getFieldValue('insuranceRange') ? form.getFieldValue('insuranceRange')[0].format('YYYY-MM-DD') : undefined,
          accidentInsuranceEndDate: form.getFieldValue('insuranceRange') ? form.getFieldValue('insuranceRange')[1].format('YYYY-MM-DD') : undefined,
          licenseDate: form.getFieldValue('licenseDate') ? form.getFieldValue('licenseDate').format('YYYY-MM-DD') : undefined,
          licenseStartDate: form.getFieldValue('licenseRange') ? form.getFieldValue('licenseRange')[0].format('YYYY-MM-DD') : undefined,
          licenseEndDate: form.getFieldValue('licenseRange') ? form.getFieldValue('licenseRange')[1].format('YYYY-MM-DD') : undefined,
          entryDate: form.getFieldValue('entryDate') ? form.getFieldValue('entryDate').format('YYYY-MM-DD') : undefined,
          leaveDate: form.getFieldValue('leaveDate') ? form.getFieldValue('leaveDate').format('YYYY-MM-DD') : undefined,
          labourContractBeginDate: form.getFieldValue('labourRange') ? form.getFieldValue('labourRange')[0].format('YYYY-MM-DD') : undefined,
          labourContractEndDate: form.getFieldValue('labourRange') ? form.getFieldValue('labourRange')[1].format('YYYY-MM-DD') : undefined,
          manageContractBeginDate: form.getFieldValue('manageRange') ? form.getFieldValue('manageRange')[0].format('YYYY-MM-DD') : undefined,
          manageContractEndDate: form.getFieldValue('manageRange') ? form.getFieldValue('manageRange')[1].format('YYYY-MM-DD') : undefined,
          censusAreaCode: form.getFieldValue('censusAreaCode') ? form.getFieldValue('censusAreaCode')[2] : undefined,
          nativeAreaCode: form.getFieldValue('nativeAreaCode') ? form.getFieldValue('nativeAreaCode')[2] : undefined,
          insuranceRange: '',
          labourRange: '',
          manageRange: '',
          licenseRange: '',
          identity: form.getFieldValue('qualificationNo'),
          maxBloodPressure: form.getFieldValue('pressure').split('/')[0],
          minBloodPressure: form.getFieldValue('pressure').split('/')[1],
          mobile: (form.getFieldValue('mobile2') !== undefined && form.getFieldValue('mobile2') !== '') ? `${form.getFieldValue('mobile')},${form.getFieldValue('mobile2')}` : form.getFieldValue('mobile'),
        })
      }
    })
  }

  /** 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'driverStore/toPage',
    })
  }
  let carno = form.getFieldValue('carNo');
  /** 自编号查询车信息 */
  const queryByCarNo = () => {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: form.getFieldValue('carNo'),
    })
  }
  /** 模糊查询 车辆自编号 */
  const handleSearch = value => {
    carno = value;
    dispatch({
      type: 'driverCommonStore/queryLikeCarNo',
      str: value,
    })
  }
  /** 是否购买意外保险 */
  const insurance = e => {
    dispatch({
      type: 'driverStore/insurance',
      insuranceState: !form.getFieldValue('insurance'),
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增驾驶员">
                {getFieldDecorator('carId', { initialValue: car !== undefined ? car.id : '' })(<Input type="hidden" />)}
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
                    <Button style={{ marginLeft: '30px' }}  onClick={queryByCarNo}>查询</Button>
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
                    initialValue: car && car.carNo === carno ? car.plateNumber : '',
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
                    rules: [{ required: true, whitespace: true, message: '请输入驾驶员姓名!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <ZFormItem {...itemProps} field={fieldMap.sex} />
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        状态&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('driverStatus', {
                    rules: [{ required: true, message: '请选择状态!' }],
                    initialValue: 'WORKING',
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
                        岗位&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('job', {
                    rules: [{ required: true, message: '请选择岗位!' }],
                    initialValue: 'MASTER_CLASS',
                  })(
                    <RadioGroup>
                      <Radio value={'MASTER_CLASS'}>主班</Radio>
                      <Radio value={'DEPUTY_CLASS'}>副班</Radio>
                      <Radio value={'FLEXIBLE_CLASS'}>机动</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                      <span>
                          从业资格证号&nbsp;
                      </span>
                    )}
                  help="从业资格证号 为 身份证号码"
                  hasFeedback
                >
                  {getFieldDecorator('qualificationNo', {
                    rules: [{ required: true, whitespace: true, message: '请输入从业资格证号!' },],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        联系电话&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('mobile', {
                    rules: [{ required: true, whitespace: true, message: '请输入联系电话!' }, { pattern: /^1[34578]\d{9}$/, message: '手机格式错误!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        备用联系电话&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('mobile2', {
                    rules: [{ pattern: /^1[34578]\d{9}$/, message: '手机格式错误!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        身高&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('height', {
                    rules: [{ required: true, message: '请输入身高!' }],
                  })(
                    <InputNumber min={0} max={10000} />
                  )}cm
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        体重&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('weight', {
                    rules: [{ required: true, message: '请输入体重!' }],
                  })(
                    <InputNumber min={0} max={10000} />
                  )}kg
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        血压&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('pressure', {
                    rules: [
                      { required: true, whitespace: true, message: '请输入血压!' },
                      { pattern: /^\d*\/\d/, message: '血压格式请以 最高血压/最低血压 填写!' },
                    ],
                  })(
                    <Input />
                  )}
                </FormItem>
                <ZFormItem {...itemProps} field={fieldMap.bloodType} />
                <ZFormItem {...itemProps} field={fieldMap.censusAreaCode} />
                <ZFormItem {...itemProps} field={fieldMap.nativeAreaCode} />
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        身份证地址&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('identityAddress', {
                    rules: [{ required: true, whitespace: true, message: '请输入身份证地址!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        现居住地址&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('presentAddress', {
                    rules: [{ required: true, whitespace: true, message: '请输入现居住地址!' }],
                  })(<Input />)}
                </FormItem>
                <ZFormItem {...itemProps} field={fieldMap.education} />
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        婚姻状况&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('marriage', {})(
                    <RadioGroup>
                      <Radio value={'UNMARRIED'}>未婚</Radio>
                      <Radio value={'MARRIED'}>已婚</Radio>
                      <Radio value={'DIVORCE'}>离婚</Radio>
                      <Radio value={'WIDOWED'}>丧偶</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        政治面貌&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('politics', {})(
                    <RadioGroup>
                      <Radio value={'MASSES'}>群众</Radio>
                      <Radio value={'LEAGUE'}>团员</Radio>
                      <Radio value={'PARTY'}>党员</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        购买意外险&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('insurance', { initialValue: true, valuePropName: 'checked' })(
                    (<Switch checkedChildren="是" onChange={insurance} unCheckedChildren="否" />)
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险公司&nbsp;
                    </span>
                  )}
                >
                  {
                    insuranceState ? <div>
                      {
                        getFieldDecorator('insuranceCompany', {
                          rules: [{ required: true, message: '请输入保险公司!' }],
                        })(<Input />)
                      }
                    </div> : <div>
                      {
                        getFieldDecorator('insuranceCompany', {
                        })(<Input disabled />)
                      }
                    </div>
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        意外险单号&nbsp;
                    </span>
                  )}
                >
                  {
                    insuranceState ? <div>
                      {
                        getFieldDecorator('policyNo', {
                          rules: [{ required: true, message: '请输入意外险单号!' }],
                        })(<Input />)
                      }
                    </div> : <div>
                      {
                        getFieldDecorator('policyNo', {
                        })(<Input disabled />)
                      }
                    </div>
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        意外险有效时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('insuranceRange', {
                    rules: [{ required: !!insuranceState, message: '请选择意外险有效时间!' }],
                  })(insuranceState ? <RangePicker /> : <RangePicker disabled />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶证号码&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('licenseNumber', {
                    rules: [{ required: true, message: '请输入驾驶证号码!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶证档案编号&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('licenseDocNumber', {
                    rules: [{ required: true, message: '请输入驾驶证档案编号!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        准驾车型&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('carModel', {
                    rules: [{ required: true, message: '请输入准驾车型!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        初次领证日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('licenseDate', {
                    rules: [{ required: true, message: '请选择初次领证日期!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        驾驶证起止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('licenseRange', {
                    rules: [{ required: true, message: '请选择驾驶证起止时间!' }],
                  })(<RangePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        入职日期&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('entryDate', {
                    rules: [{ required: true, message: '请选择入职时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        离职时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('leaveDate', {})(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        劳动合同起止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('labourRange', {})(<RangePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        经营合同起止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('manageRange', {
                    rules: [{ required: true, message: '请选择经营合同起止时间!' }],
                  })(<RangePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        紧急联系人姓名&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('emergencyContact',{
                    rules: [{ required: true, message: '请输入紧急联系人!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        紧急联系人手机号码&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('emergencyMobile', {
                    rules: [{ required: true, message: '请输入紧急联系人号码!' }, { pattern: /^1[34578]\d{9}$/, message: '手机格式错误!' }],
                  })(<Input />)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:driver:insert">
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

function mapStateToProps({ carStore, driverStore, driverCommonStore }) {
  return {
    car: carStore.car,
    insuranceState: driverStore.insuranceState,
    carNos: driverCommonStore.carNos,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
