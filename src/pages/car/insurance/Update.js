/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:05:50 
 * @Last Modified by: zengyufei 
 * @Last Modified time: 2017-08-25 14:05:50 
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Icon, Select, Row, Col,
  Button, Card, InputNumber, DatePicker, Upload, Modal, Checkbox } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const Option = Select.Option

let Update = options => {
  const { dispatch, form, insurance } = options
  const { getFieldDecorator } = form
  const { plateList, previewVisible, previewImage, insuranceFile, insuranceList } = options
  const { oneInsurance, twoInsurance, threeInsurance, fourInsurance, fiveInsurance } = options

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
  const updateInsurance = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const insuranceBuyDate = form.getFieldValue('insuranceBuyDate') ? form.getFieldValue('insuranceBuyDate').format('YYYY-MM-DD') : null
        const insuranceExpireDate = form.getFieldValue('insuranceExpireDate') ? form.getFieldValue('insuranceExpireDate').format('YYYY-MM-DD') : null
        let bizInsuranceStr = ''
        if (insurance.insuranceType === 'BUSINESS') {
          if (form.getFieldValue('insurance').includes('车损险赔偿金额')) {
            bizInsuranceStr += `车损险赔偿金额_${form.getFieldValue('oneNumber')},`;
          }
          if (form.getFieldValue('insurance').includes('第三者责任险最高赔偿金额')) {
            bizInsuranceStr += `第三者责任险最高赔偿金额_${form.getFieldValue('twoNumber')},`;
          }
          if (form.getFieldValue('insurance').includes('不计免赔险最高赔偿金额')) {
            bizInsuranceStr += `不计免赔险最高赔偿金额_${form.getFieldValue('threeNumber')},`;
          }
          if (form.getFieldValue('insurance').includes('自燃险赔偿金额')) {
            bizInsuranceStr += `自燃险赔偿金额_${form.getFieldValue('fourNumber')},`;
          }
          if (form.getFieldValue('insurance').includes('承运人责任险最高赔偿金额（每座）')) {
            bizInsuranceStr += `承运人责任险最高赔偿金额（每座）_${form.getFieldValue('fiveNumber')},`;
          }
          if (bizInsuranceStr.length > 0) {
            bizInsuranceStr = bizInsuranceStr.substring(0, bizInsuranceStr.length - 1)
          }
        }
        dispatch({
          type: 'insuranceStore/updateNotNull',
          ...values,
          insuranceBuyDate,
          insuranceExpireDate,
          insuranceFile,
          bizInsuranceStr,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'insuranceStore/toPage',
    })
  }

  // 上传图片
  const insuranceChange = ({ fileList }) => {
    dispatch({
      type: 'insuranceStore/insuranceChange',
      insuranceList: fileList,
    })
  }
  // 预览图片
  const handlePreview = file => {
    dispatch({
      type: 'insuranceStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = e => {
    dispatch({
      type: 'insuranceStore/unlookPreview',
    })
  }
  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  )

  // 根据选择保险种类  可填写数字更改
  const inInsurance = e => {
    dispatch({
      type: 'insuranceStore/inInsurance',
      oneInsurance: e.includes('车损险赔偿金额'),
      twoInsurance: e.includes('第三者责任险最高赔偿金额'),
      threeInsurance: e.includes('不计免赔险最高赔偿金额'),
      fourInsurance: e.includes('自燃险赔偿金额'),
      fiveInsurance: e.includes('承运人责任险最高赔偿金额（每座）'),
    })
  }

  let oneNumber, 
twoNumber, 
threeNumber, 
fourNumber, 
fiveNumber
  let insuranceInitialValue = []
  if (insurance.bizInsuranceStr !== undefined && insurance.bizInsuranceStr !== null) {
    insurance.bizInsuranceStr.split(',').forEach(value => {
      if (value.split('_').includes('车损险赔偿金额')) {
        insuranceInitialValue.push('车损险赔偿金额')
        if (value.split('_').length > 1) {
          oneNumber = value.split('_')[1]
        }
      }
      if (value.split('_').includes('第三者责任险最高赔偿金额')) {
        insuranceInitialValue.push('第三者责任险最高赔偿金额')
        if (value.split('_').length > 1) {
          twoNumber = value.split('_')[1]
        }
      }
      if (value.split('_').includes('不计免赔险最高赔偿金额')) {
        insuranceInitialValue.push('不计免赔险最高赔偿金额')
        if (value.split('_').length > 1) {
          threeNumber = value.split('_')[1]
        }
      }
      if (value.split('_').includes('自燃险赔偿金额')) {
        insuranceInitialValue.push('自燃险赔偿金额')
        if (value.split('_').length > 1) {
          fourNumber = value.split('_')[1]
        }
      }
      if (value.split('_').includes('承运人责任险最高赔偿金额（每座）')) {
        insuranceInitialValue.push('承运人责任险最高赔偿金额（每座）')
        if (value.split('_').length > 1) {
          fiveNumber = value.split('_')[1]
        }
      }
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={updateInsurance} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改车辆保险">
                <FormItem>
                  {getFieldDecorator('id', { initialValue: insurance.id,
                  })(
                    <Input type="hidden" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('carId', { initialValue: insurance.carId,
                  })(
                    <Input type="hidden" />
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
                    rules: [{ required: true, message: '请输入自编号!', whitespace: true }], initialValue: insurance.carNo,
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
                    rules: [{ required: true, message: '请输入车牌号!' }], initialValue: insurance.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('plateImage')(
                    <div >
                      <Upload
                        action=""
                        listType="picture-card"
                        fileList={plateList}
                        onPreview={handlePreview}
                      />
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险类型 &nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('insuranceType', {
                    rules: [{ required: true, message: '请选择保险类型!' }], initialValue: insurance.insuranceType,
                  })(<Select disabled style={{ width: 160 }}>
                    <Option value="TRAFFIC">交通强制险</Option>
                    <Option value="BUSINESS">商业保险</Option>
                  </Select>)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险公司 &nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('insuranceCompany', {
                    rules: [{ required: true, message: '请输入保险公司!', whitespace: true }, { max: 64, message: '保险公司最多长度64', whitespace: true }], initialValue: insurance.insuranceCompany,
                  })(
                    <Input />
                  )}
                </FormItem>
                {
                  insurance.insuranceType === 'BUSINESS' ?
                    <FormItem
                      {...formItemLayout}
                      label={(
                        <span>
                          保险种类&nbsp;
                        </span>
                      )}
                    >
                      {
                        <div>
                          {getFieldDecorator('insurance', { initialValue: insuranceInitialValue })(
                            <Checkbox.Group onChange={inInsurance}>
                              <Row>
                                <Col span={20}><Checkbox value="车损险赔偿金额">车损险赔偿金额</Checkbox></Col>
                                {
                                  oneInsurance ? <Col span={2}>
                                    {getFieldDecorator('oneNumber', { initialValue: oneNumber })(
                                      <InputNumber min={0} />
                                    )}
                                  </Col> : <Col span={2}><InputNumber min={0} defaultValue={oneNumber} disabled /></Col>
                                }
                                <Col span={20}><Checkbox value="第三者责任险最高赔偿金额">第三者责任险最高赔偿金额</Checkbox></Col>
                                {
                                  twoInsurance ? <Col span={2}>
                                    {getFieldDecorator('twoNumber', { initialValue: twoNumber })(
                                      <InputNumber min={0} />
                                    )}
                                  </Col> : <Col span={2}><InputNumber min={0} defaultValue={twoNumber} disabled /></Col>
                                }
                                <Col span={20}><Checkbox value="不计免赔险最高赔偿金额">不计免赔险最高赔偿金额</Checkbox></Col>
                                {
                                  threeInsurance ? <Col span={2}>
                                    {getFieldDecorator('threeNumber', { initialValue: threeNumber })(
                                      <InputNumber min={0} />
                                    )}
                                  </Col> : <Col span={2}><InputNumber min={0} defaultValue={threeNumber} disabled /></Col>
                                }
                                <Col span={20}><Checkbox value="自燃险赔偿金额">自燃险赔偿金额</Checkbox></Col>
                                {
                                  fourInsurance ? <Col span={2}>
                                    {getFieldDecorator('fourNumber', { initialValue: fourNumber })(
                                      <InputNumber min={0} />
                                    )}
                                  </Col> : <Col span={2}><InputNumber min={0} defaultValue={fourNumber} disabled /></Col>
                                }
                                <Col span={20}><Checkbox value="承运人责任险最高赔偿金额（每座）">承运人责任险最高赔偿金额（每座）</Checkbox></Col>
                                {
                                  fiveInsurance ? <Col span={2}>
                                    {getFieldDecorator('fiveNumber', { initialValue: fiveNumber })(
                                      <InputNumber min={0} />
                                    )}
                                  </Col> : <Col span={2}><InputNumber min={0} defaultValue={fiveNumber} disabled /></Col>
                                }
                              </Row>
                            </Checkbox.Group>
                          )}
                        </div>
                      }
                    </FormItem>
                    : ''
                }
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险金额 &nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('insuranceMoney', {
                    initialValue: insurance.insuranceMoney,
                  })(
                    <InputNumber min={0} max={1000000} />
                  )}
                  (元)
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险单号 &nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('policyNo', {
                    rules: [{ required: true, message: '请输入保险单号!', whitespace: true }, { max: 64, message: '保险单号最多长度64', whitespace: true }], initialValue: insurance.policyNo,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险有效扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('insuranceFile')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={insuranceList}
                        onPreview={handlePreview}
                        onChange={insuranceChange}
                      >
                        { insuranceList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        保险生效时间 &nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('insuranceBuyDate', {
                    rules: [{ required: true, message: '请选择保险生效时间!' }], initialValue: moment(insurance.insuranceBuyDate),
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                         保险到期时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('insuranceExpireDate', {
                    rules: [{ required: true, message: '请选择保险到期时间!' }], initialValue: moment(insurance.insuranceExpireDate),
                  })(<DatePicker />)}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button key="registerButton" type="primary" htmlType="submit" size="large">保存编辑</Button>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={12} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ insuranceStore }) {
  return {
    insurance: insuranceStore.insurance,

    previewVisible: insuranceStore.previewVisible,
    previewImage: insuranceStore.previewImage,
    plateList: insuranceStore.plateList,
    insuranceFile: insuranceStore.insuranceFile,
    insuranceList: insuranceStore.insuranceList,

    oneInsurance: insuranceStore.oneInsurance,
    twoInsurance: insuranceStore.twoInsurance,
    threeInsurance: insuranceStore.threeInsurance,
    fourInsurance: insuranceStore.fourInsurance,
    fiveInsurance: insuranceStore.fiveInsurance,
  }
}
export default Form.create()(connect(mapStateToProps)(Update))
