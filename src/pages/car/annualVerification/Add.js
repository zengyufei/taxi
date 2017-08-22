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
import { Form, Input, Icon, Row, Col,
  Button, Card, DatePicker, Upload, Modal, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

let AnnualVerificationAdd = options => {
  const { dispatch, form, car, carNos } = options
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

  /* 提交事件 */
  const addAnnualVerification = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (form.getFieldValue('plateNumber') == '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '自编号不存在'
            ),
          })
          return
        }
        /*
        if(synthesizeFile == ''){
          Modal.info({
            title: '温馨提示',
            content: (
              "没有上传营运证年审有效扫描件"
            )
          })
          return ;
        }
        if(drivingLicenseFile == ''){
          Modal.info({
            title: '温馨提示',
            content: (
              "没有上传行驶证有效扫描件"
            )
          })
          return ;
        }
        if(taximeterFile == ''){
          Modal.info({
            title: '温馨提示',
            content: (
              "没有上传计价器年审有效期截止时间扫描件"
            )
          })
          return ;
        } */
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
  }
  /** 模糊查询 车辆自编号 */
  const handleSearch = value => {
    dispatch({
      type: 'commonStore/queryLikeCarNo',
      str: value,
    })
  }
  function queryByCarNo(value) {
    dispatch({
      type: 'carStore/queryByCarNo',
      carNo: value,
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'annualVerificationStore/queryPage',
    })
  }

  // 上传营运证年审有效扫描件
  const synthesizeFileChange = ({ fileList }) => {
    dispatch({
      type: 'annualVerificationStore/synthesizeFileChange',
      synthesizeFileList: fileList,
    })
  }
  // 上传行驶证有效扫描件
  const drivingLicenseFileChange = ({ fileList }) => {
    dispatch({
      type: 'annualVerificationStore/drivingLicenseFileChange',
      drivingLicenseFileList: fileList,
    })
  }
  // 上传计价器年审有效期截止时间扫描件
  const taximeterFileChange = ({ fileList }) => {
    dispatch({
      type: 'annualVerificationStore/taximeterFileChange',
      taximeterFileList: fileList,
    })
  }
  // 预览图片
  const handlePreview = file => {
    console.log('handlePreview')
    console.log(file)
    dispatch({
      type: 'annualVerificationStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = e => {
    console.log('handleCancel')
    dispatch({
      type: 'annualVerificationStore/unlookPreview',
    })
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
            <Form onSubmit={addAnnualVerification} style={{ maxWidth: '100%', marginTop: '10px' }}>
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
                        onSelect={queryByCarNo}
                        onChange={queryByCarNo}
                        placeholder="车辆自编号"
                      />
                    )}
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
                        action="/fileupload/image.htm"
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
                        action="/fileupload/image.htm"
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
                        action="/fileupload/image.htm"
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

function mapStateToProps({ carStore, annualVerificationStore, commonStore }) {
  return {
    car: carStore.car,
    plateList: carStore.plateList,
    carNos: commonStore.carNos,
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
AnnualVerificationAdd = Form.create()(AnnualVerificationAdd)
export default connect(mapStateToProps)(AnnualVerificationAdd)
