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
import { Form, Input, Icon, Select, Row, Col,
  Button, Card, DatePicker, Upload, Modal } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const Option = Select.Option

let CarAdd = options => {
  const { dispatch, form } = options
  const { getFieldDecorator } = form
  const { previewVisible, previewImage, plateList, ownershipList, roadTransportList, certificateList, plateImage, ownershipImage, roadTransportImage, certificateImage } = options
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
  const addCar = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (plateImage === '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '没有上传车辆照片（45度角）'
            ),
          })
          return
        }
        if (ownershipImage === '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '没有上传产权证'
            ),
          })
          return
        }
        if (roadTransportImage === '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '没有上传道路运输证 '
            ),
          })
          return
        }
        if (certificateImage === '') {
          Modal.info({
            title: '温馨提示',
            content: (
              '没有上传机动车登记证书'
            ),
          })
          return
        }
        const ownershipBeginDate = form.getFieldValue('ownershipBeginDate') ? form.getFieldValue('ownershipBeginDate').format('YYYY-MM-DD') : null
        const ownershipEndDate = form.getFieldValue('ownershipEndDate') ? form.getFieldValue('ownershipEndDate').format('YYYY-MM-DD') : null
        const drivingLicenseDate = form.getFieldValue('drivingLicenseDate') ? form.getFieldValue('drivingLicenseDate').format('YYYY-MM-DD') : null
        const roadTransportBeginDate = form.getFieldValue('roadTransportBeginDate') ? form.getFieldValue('roadTransportBeginDate').format('YYYY-MM-DD') : null
        const roadTransportEndDate = form.getFieldValue('roadTransportEndDate') ? form.getFieldValue('roadTransportEndDate').format('YYYY-MM-DD') : null

        dispatch({
          type: 'carStore/insert',
          ...values,
          ownershipBeginDate,
          ownershipEndDate,
          drivingLicenseDate,
          roadTransportBeginDate,
          roadTransportEndDate,
          plateImage,
          ownershipImage,
          roadTransportImage,
          certificateImage,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'carStore/queryPage',
    })
  }

  // 上传车辆车牌图片
  const plateChange = ({ fileList }) => {
    console.log(fileList)
    dispatch({
      type: 'carStore/plateChange',
      plateList: fileList,
    })
  }
  // 上传车辆产权证图片
  const ownershipChange = ({ fileList }) => {
    dispatch({
      type: 'carStore/ownershipChange',
      ownershipList: fileList,
    })
  }
  // 上传车辆道路运输证 图片
  const roadTransportChange = ({ fileList }) => {
    dispatch({
      type: 'carStore/roadTransportChange',
      roadTransportList: fileList,
    })
  }
  // 上传车辆机动车登记证书图片
  const certificateChange = ({ fileList }) => {
    dispatch({
      type: 'carStore/certificateChange',
      certificateList: fileList,
    })
  }


  // 预览图片
  const handlePreview = file => {
    console.log(file)
    dispatch({
      type: 'carStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 删除图片
  const handleCancel = () => {
    dispatch({
      type: 'carStore/unlookPreview',
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
            <Form onSubmit={addCar} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增车辆">
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
                    rules: [{ required: true, message: '请输入自编号!', whitespace: true }, { max: 16, message: '自编号最多长度16', whitespace: true }],
                  })(
                    <Input />
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
                    rules: [{ required: true, message: '请输入车牌号!' }, { max: 16, message: '车牌号最多长度16', whitespace: true }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆照片（45度角）&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('plateImage')(
                    <div >
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={plateList}
                        onPreview={handlePreview}
                        onChange={plateChange}
                      >
                        { plateList.length >= 1 ? null : uploadButton}
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
                        车架号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('carFrame', {
                    rules: [{ required: true, message: '请输入车架号!' }, { pattern: /^\w+$/, message: '只能是数字字母下划线!' }, { max: 32, message: '车架号最多长度32', whitespace: true }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('ownershipImage')(
                    <div >
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={ownershipList}
                        onPreview={handlePreview}
                        onChange={ownershipChange}
                      >
                        { ownershipList.length >= 1 ? null : uploadButton}
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
                        产权证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('ownershipNo', {
                    rules: [{ required: true, message: '请输入产权证号!' }, { pattern: /^\w+$/, message: '只能是数字字母下划线!' }, { max: 32, message: '产权证号最多长度32', whitespace: true }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证起始时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('ownershipBeginDate', {
                    rules: [{ required: true, message: '请选择产权证起始时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        产权证截止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('ownershipEndDate', {
                    rules: [{ required: true, message: '请选择产权证截止时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发动机号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('engineNumber', {
                    rules: [{ required: true, message: '请输入发动机号!' }, { pattern: /^\w+$/, message: '只能是数字字母下划线!' }, { max: 16, message: '发动机号最多长度16', whitespace: true }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        行驶证登记日期&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('drivingLicenseDate', {
                    rules: [{ required: true, message: '请选择行驶证登记日期!' }],
                  })(<DatePicker />)}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆类型&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('carType', {
                    rules: [{ required: true, message: '请选择车辆类型!' }],
                  })(<Select style={{ width: 160 }}>
                    <Option value="BYD_E5">比亚迪E6</Option>
                    <Option value="BYD_E6">比亚迪E5</Option>
                    <Option value="BM_EU220">北汽EU220</Option>
                  </Select>)}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('roadTransportImage')(
                    <div >
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={roadTransportList}
                        onPreview={handlePreview}
                        onChange={roadTransportChange}
                      >
                        { roadTransportList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>,
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证起始时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('roadTransportBeginDate', {
                    rules: [{ required: true, message: '请选择道路运输证起始时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        道路运输证截止时间&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('roadTransportEndDate', {
                    rules: [{ required: true, message: '请选择道路运截止起始时间!' }],
                  })(<DatePicker />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆颜色&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('carColor', {
                    rules: [{ required: true, message: '请选择车辆颜色!' }],
                  })(<Select style={{ width: 160 }}>
                    <Option value="BLUE">蓝色</Option>
                    <Option value="RED">红色</Option>
                    <Option value="GREEN">绿色</Option>
                    <Option value="YELLOW">黄色</Option>
                    <Option value="BLUEWHITE">蓝白色</Option>
                    <Option value="LAKEBLUE">湖青色</Option>
                  </Select>)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        机动车登记证书&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('certificateImage')(
                    <div >
                      <Upload
                        action="/fileupload/image.htm"
                        listType="picture-card"
                        fileList={certificateList}
                        onPreview={handlePreview}
                        onChange={certificateChange}
                      >
                        { certificateList.length >= 1 ? null : uploadButton}
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
                        机动车登记证号&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('certificateNo', {
                    rules: [{ required: true, message: '请输入机动车登记证号!' }, { max: 32, message: '机动车登记证号最多长度32', whitespace: true }],
                  })(<Input />)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        车辆营运状态&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('carStatus', {
                    rules: [{ required: true, message: '请选择车辆营运状态!' }],
                  })(<Select style={{ width: 160 }}>
                    <Option value="OPERATE_WAIT">待营运</Option>
                    <Option value="OPERATE_USED">营运中</Option>
                    <Option value="ACCIDENT_REPAIR">事故维修</Option>
                    <Option value="ACCIDENT_SCRAP">事故报废</Option>
                    <Option value="ROUTINE_SCRAP">正常报废</Option>
                    <Option value="BUSINESS_CAR">公务用车</Option>
                    <Option value="LONG_DISTANCE_LEASE">长途租赁</Option>
                  </Select>)}
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

function mapStateToProps({ carStore }) {
  return {
    plateList: carStore.plateList,
    ownershipList: carStore.ownershipList,
    roadTransportList: carStore.roadTransportList,
    certificateList: carStore.certificateList,
    previewVisible: carStore.previewVisible,
    previewImage: carStore.previewImage,
    plateImage: carStore.plateImage,
    ownershipImage: carStore.ownershipImage,
    roadTransportImage: carStore.roadTransportImage,
    certificateImage: carStore.certificateImage,

  }
}


CarAdd = Form.create()(CarAdd)
export default connect(mapStateToProps)(CarAdd)
