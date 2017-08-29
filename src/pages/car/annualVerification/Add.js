/*
 * @Author: zengyufei 
 * @Date: 2017-08-28 17:56:24 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-28 18:02:46
 */
import TweenOne from 'rc-tween-one'

import { connect } from 'dva'
import { Form, Input, Icon, Row, Col, Button, Card, DatePicker, Upload, Modal, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

const Add = options => {
  const { methods, form, car, carNos } = options
  const { addAnnualVerification, handleSearch, queryByCarNo, toPage, synthesizeFileChange, drivingLicenseFileChange, taximeterFileChange, handlePreview, handleCancel } = methods
  const { getFieldDecorator } = form
  const { previewVisible, previewImage, plateList, synthesizeFileList, synthesizeFile, taximeterFileList, taximeterFile, drivingLicenseFileList, drivingLicenseFile } = options

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

  // 添加图片样式
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">点击上传文件</div>
    </div>
  )

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={16}>
            <Form onSubmit={e => addAnnualVerification(e, synthesizeFile, drivingLicenseFile, taximeterFile)} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增车辆年审">
                <FormItem>
                  {getFieldDecorator('carId', { initialValue: car ? car.id : 0,
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
                  <Col span={18}>
                    {getFieldDecorator('carNo', {
                      rules: [{ required: true, message: '请输入自编号!' }],
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
                >
                  {getFieldDecorator('plateNumber', { initialValue: car ? car.plateNumber : '',
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
                        营运证年审有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('synthesizeDate', {
                    rules: [{ required: true, message: '请选择营运证年审有效期截止时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        营运证年审有效扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('synthesizeFile')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={synthesizeFileList}
                        onPreview={handlePreview}
                        onChange={synthesizeFileChange}
                      >
                        { synthesizeFileList.length >= 1 ? null : uploadButton}
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
                        行驶证有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('drivingLicenseDate', {
                    rules: [{ required: true, message: '请选择行驶证有效期截止时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        行驶证有效扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('drivingLicenseFile')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={drivingLicenseFileList}
                        onPreview={handlePreview}
                        onChange={drivingLicenseFileChange}
                      >
                        { drivingLicenseFileList.length >= 1 ? null : uploadButton}
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
                        计价器年审有效期截止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('taximeterDate', {
                    rules: [{ required: true, message: '请选择计价器年审有效期截止时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        计价器年审有效期截止时间扫描件&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('taximeterFile')(
                    <div >
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={taximeterFileList}
                        onPreview={handlePreview}
                        onChange={taximeterFileChange}
                      >
                        { taximeterFileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
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

function mapStateToProps({ carStore, annualVerificationStore, driverCommonStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    carNos: driverCommonStore.carNos,
    previewVisible: annualVerificationStore.previewVisible,
    previewImage: annualVerificationStore.previewImage,
    synthesizeFileList: annualVerificationStore.synthesizeFileList,
    synthesizeFile: annualVerificationStore.synthesizeFile,
    drivingLicenseFileList: annualVerificationStore.drivingLicenseFileList,
    drivingLicenseFile: annualVerificationStore.drivingLicenseFile,
    taximeterFileList: annualVerificationStore.taximeterFileList,
    taximeterFile: annualVerificationStore.taximeterFile,

  }
}

const mapDispatchToProps = (dispatch, { form }) => {
  return {
    methods: {

      /* 提交事件 */
      addAnnualVerification(e, synthesizeFile, drivingLicenseFile, taximeterFile) {
        e.preventDefault()
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if (form.getFieldValue('plateNumber') === '') {
              Modal.info({
                title: '温馨提示',
                content: (
                  '自编号不存在'
                ),
              })
              return
            }
            const synthesizeDate = form.getFieldValue('synthesizeDate') ? form.getFieldValue('synthesizeDate').format('YYYY-MM-DD') : null
            const drivingLicenseDate = form.getFieldValue('drivingLicenseDate') ? form.getFieldValue('drivingLicenseDate').format('YYYY-MM-DD') : null
            const taximeterDate = form.getFieldValue('taximeterDate') ? form.getFieldValue('taximeterDate').format('YYYY-MM-DD') : null

            dispatch({
              type: 'annualVerificationStore/insert',
              ...values,
              synthesizeDate,
              drivingLicenseDate,
              taximeterDate,
              synthesizeFile,
              drivingLicenseFile,
              taximeterFile,
            })
          }
        })
      },
      /** 模糊查询 车辆自编号 */
      handleSearch(value) {
        dispatch({
          type: 'driverCommonStore/queryLikeCarNo',
          str: value,
        })
      },
      queryByCarNo() {
        dispatch({
          type: 'carStore/queryByCarNo',
          carNo: form.getFieldValue('carNo'),
        })
      },

      /* 返回分页 */
      toPage() {
        dispatch({
          type: 'annualVerificationStore/queryPage',
        })
      },

      // 上传营运证年审有效扫描件
      synthesizeFileChange({ fileList }) {
        dispatch({
          type: 'annualVerificationStore/synthesizeFileChange',
          synthesizeFileList: fileList,
        })
      },
      // 上传行驶证有效扫描件
      drivingLicenseFileChange({ fileList }) {
        dispatch({
          type: 'annualVerificationStore/drivingLicenseFileChange',
          drivingLicenseFileList: fileList,
        })
      },
      // 上传计价器年审有效期截止时间扫描件
      taximeterFileChange({ fileList }) {
        dispatch({
          type: 'annualVerificationStore/taximeterFileChange',
          taximeterFileList: fileList,
        })
      },
      // 预览图片
      handlePreview(file) {
        dispatch({
          type: 'annualVerificationStore/lookPreview',
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        })
      },
      // 删除图片
      handleCancel() {
        dispatch({
          type: 'annualVerificationStore/unlookPreview',
        })
      },
    },

  }
}

const fields = [
  {
    key: 'carNo',
    name: '自编号',
  }, {
    key: 'plateNumber',
    name: '车牌号',
  }, {
    key: 'plateImage',
    name: '车辆照片',
  }, {
    key: 'synthesizeDate',
    name: '营运证年审有效期截止时间',
  }, {
    key: 'synthesizeFile',
    name: '营运证年审有效扫描件',
  }, {
    key: 'drivingLicenseDate',
    name: '行驶证有效期截止时间',
  }, {
    key: 'drivingLicenseFile',
    name: '行驶证有效扫描件',
  }, {
    key: 'taximeterDate',
    name: '计价器年审有效期截止时间',
  }, {
    key: 'taximeterFile',
    name: '计价器年审有效期截止时间扫描件',
  },
]

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Add))
