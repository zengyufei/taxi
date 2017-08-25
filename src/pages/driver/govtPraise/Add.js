/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:00:12 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 15:47:38
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Icon, Row, Col, Button, Card, Upload, Modal, DatePicker, Radio, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const { tokenSessionKey } = constant

let Add = options => {
  const { dispatch, form, driver, drivers, carNos, visible, imgURLList, imgURLImage, previewVisible, previewImage } = options
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

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">添加</div>
    </div>
  )
  /* 上传图片 */
  const imgChange = ({ fileList }) => {
    dispatch({
      type: 'govtPraiseStore/imgChange',
      imgURLList: fileList,
    })
  }
  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'govtPraiseStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = () => {
    dispatch({
      type: 'govtPraiseStore/unlookPreview',
    })
  }
  /**
   * 上传文件
   */
  let fileURL
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/fileupload/docs.htm?token=${session.get(tokenSessionKey)}`,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        fileURL = info.file.response
      } else if (info.file.status === 'error') {
        console.log('error')
      }
    },
  }

  /* 提交事件 */
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'govtPraiseStore/insert',
          ...values,
          creditDate: form.getFieldValue('creditDate') !== undefined ? form.getFieldValue('creditDate').format('YYYY-MM-DD') : undefined,
          imgURL: imgURLImage,
          fileURL,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'govtPraiseStore/toPage',
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
          <Col span={16}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增政府表扬">
                {getFieldDecorator('carId', { initialValue: driver ? driver.carId : '' })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: driver ? driver.id : '' })(<Input type="hidden" />)}
                {getFieldDecorator('creditType', { initialValue: 'GOVT_PRAISE' })(<Input type="hidden" />)}
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
                        表彰的文件名称&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('praiseFileName', {
                    rules: [{ required: true, whitespace: true, message: '请输入表彰的文件名称!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        政府部门&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('govtOrg', {
                    rules: [{ required: true, whitespace: true, message: '请输入政府部门!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        表彰时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditDate', {
                    rules: [{ required: true, message: '请输入表彰时间!' }],
                  })(
                    <DatePicker />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        等级&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('praiseGrade', {
                    rules: [{ required: true, whitespace: true, message: '请选择表彰等级!' }],
                    initialValue: 'COUNTRY',
                  })(
                    <RadioGroup>
                      <Radio value={'COUNTRY'}>国家级</Radio>
                      <Radio value={'PROVINCE'}>省级</Radio>
                      <Radio value={'CITY'}>市级</Radio>
                      <Radio value={'DISTRICT'}>区级</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        网址链接&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('newsUrl')(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        图片&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('imgURL', {})(
                    <div>
                      <Upload
                        action={`${BASE_URL}/fileupload/image.htm`}
                        listType="picture-card"
                        fileList={imgURLList}
                        onPreview={lookPreview}
                        onChange={imgChange}
                      >
                        {imgURLList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <Modal visible={previewVisible} footer={null} onCancel={unlookPreview}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                      </Modal>
                    </div>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        文件上传&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('fileURL', {})(
                    <div>
                      <Upload {...importCar}>
                        <Button>
                          <Icon type="upload" />上传
                        </Button>
                      </Upload>
                    </div>
                  )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <ZButton permission="driver:govt:insert">
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

function mapStateToProps({ driverCommonStore, govtPraiseStore }) {
  return {
    driver: driverCommonStore.driver,
    carNos: driverCommonStore.carNos,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
    qualificationNos: driverCommonStore.qualificationNos,
    previewVisible: govtPraiseStore.previewVisible,
    imgURLList: govtPraiseStore.imgURLList,
    previewImage: govtPraiseStore.previewImage,
    imgURLImage: govtPraiseStore.imgURLImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Add))
