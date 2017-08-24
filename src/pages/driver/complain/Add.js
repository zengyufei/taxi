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
import { Form, Input, Icon, Row, Col, Button, Card, message, Upload, Modal, DatePicker, Radio, AutoComplete } from 'antd'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const { TOKEN_KEY } = constant

let Add = props => {
  const { dispatch, form, driver, drivers, carNos, visible, startValue, endValue, imgURLList, imgURLImage, previewVisible, previewImage } = props
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
      type: 'complainStore/imgChange',
      imgURLList: fileList,
    })
  }
  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'complainStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = e => {
    dispatch({
      type: 'complainStore/unlookPreview',
    })
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  const token = session.get(TOKEN_KEY)
  let fileURL
  const importCar = {
    name: 'file',
    action: `/fileupload/docs.htm?token=${token}`,
    headers: {
      authorization: 'authorization-text',
    },
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
          type: 'complainStore/insert',
          ...values,
          callTime: form.getFieldValue('callTime') != undefined ? form.getFieldValue('callTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          creditTime: form.getFieldValue('creditTime') != undefined ? form.getFieldValue('creditTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          replyTime: form.getFieldValue('replyTime') != undefined ? form.getFieldValue('replyTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          imgURL: imgURLImage,
          fileURL,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'complainStore/toPage',
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
  if (driver.features != undefined || driver.features != null) {
    carNo = JSON.parse(driver.features).carNo
  }

  // 自定义日期范围
  const disabledStartDate = startValue => {
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }
  const disabledEndDate = endValue => {
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  const onStartChange = value => {
    dispatch({
      type: 'driverCommonStore/onStartChange',
      startValue: value,
    })
  }
  const onEndChange = value => {
    dispatch({
      type: 'driverCommonStore/onEndChange',
      endValue: value,
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
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="新增服务投诉">
                {getFieldDecorator('carId', { initialValue: driver != undefined ? driver.carId : '' })(<Input type="hidden" />)}
                {getFieldDecorator('driverId', { initialValue: driver != undefined ? driver.id : '' })(<Input type="hidden" />)}
                {getFieldDecorator('creditType', { initialValue: 'SERVICE_COMPLAIN' })(<Input type="hidden" />)}
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
                    initialValue: form.getFieldValue('carNo') == carNo && driver.features != undefined ? JSON.parse(driver.features).plateNumber : '',
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
                      initialValue: form.getFieldValue('carNo') == carNo && driver != undefined ? driver.qualificationNo : '',
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
                    initialValue: form.getFieldValue('carNo') == carNo && driver != undefined ? driver.userName : '',
                  })(
                    <Input disabled />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者姓名&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('callName', {
                    rules: [{ required: true, whitespace: true, message: '请输入来电者姓名!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电者联系方式&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('callMobile', {
                    rules: [{ required: true, whitespace: true, message: '请输入来电者联系方式!' }, { pattern: /^1[34578]\d{9}$/, message: '手机格式错误!' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditTime', {
                    rules: [{ required: true, message: '请输入发生时间!' }],
                  })(
                    <DatePicker
                      showTime
                      style={{ width: 200 }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={onStartChange}
                      disabledDate={disabledStartDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        来电时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('callTime', {})(
                    <DatePicker
                      showTime
                      style={{ width: 200 }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={onEndChange}
                      disabledDate={disabledEndDate}
                    />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        发生经过&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入发生经过!' }],
                  })(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        回复乘客时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('replyTime')(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        是否有责&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('inFault')(
                    <RadioGroup>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处罚&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punish')(
                    <RadioGroup>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        处理结果&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('punishResult')(
                    <Input type="textarea" rows={4} />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        投诉类型&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('complainType', {
                    rules: [{ required: true, message: '请选择投诉类型!' }],
                  })(
                    <RadioGroup>
                      <Radio value={'complain_one'}>不打表营运</Radio>
                      <Radio value={'complain_two'}>不提供有效车票</Radio>
                      <Radio value={'complain_three'}>多收费</Radio>
                      <Radio value={'complain_four'}>服务态度差</Radio>
                      <Radio value={'complain_five'}>拒载</Radio>
                      <Radio value={'complain_six'}>咪表有问题</Radio>
                      <Radio value={'complain_seven'}>拼客</Radio>
                      <Radio value={'complain_eight'}>绕路</Radio>
                      <Radio value={'complain_nine'}>危险驾驶</Radio>
                      <Radio value={'complain_ten'}>误导乘客</Radio>
                      <Radio value={'complain_eleven'}>议价</Radio>
                      <Radio value={'complain_twelve'}>中途甩客</Radio>
                      <Radio value={'complain_thirteen'}>其它类</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        具体地址&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('detailAddress')(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        备注&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('bz')(<Input type="textarea" rows={4} />)}
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
                        action="/fileupload/image.htm"
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
                  <ZButton permission="driver:complain:insert">
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

function mapStateToProps({ driverCommonStore, complainStore }) {
  return {
    carNos: driverCommonStore.carNos,
    driver: driverCommonStore.driver,
    drivers: driverCommonStore.drivers,
    visible: driverCommonStore.visible,
    startValue: driverCommonStore.startValue,
    endValue: driverCommonStore.endValue,
    previewVisible: complainStore.previewVisible,
    imgURLList: complainStore.imgURLList,
    previewImage: complainStore.previewImage,
    imgURLImage: complainStore.imgURLImage,
  }
}

Add = Form.create()(Add)
export default connect(mapStateToProps)(Add)
