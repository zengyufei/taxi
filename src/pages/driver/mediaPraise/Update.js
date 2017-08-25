/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 15:08:26 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 16:07:38
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Icon, Row, Col, Button, Card, Upload, Modal, DatePicker, Radio } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item
const RadioGroup = Radio.Group

const { tokenSessionKey } = constant

let Update = options => {
  const { dispatch, form, mediaPraise, imgURLList, imgURLImage, previewVisible, previewImage } = options
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
      type: 'mediaPraiseStore/imgChange',
      imgURLList: fileList,
    })
  }
  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'mediaPraiseStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = e => {
    dispatch({
      type: 'mediaPraiseStore/unlookPreview',
    })
  }
  /**
   * 上传文件
   * @type {{name: string, action: string, headers: {authorization: string}, onChange: ((info))}}
   */
  
  let fileURL
  const importCar = {
    name: 'file',
    action: `${BASE_URL}/fileupload/docs.htm?token=${session.get(tokenSessionKey)}`,
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
          type: 'mediaPraiseStore/update',
          ...values,
          creditDate: form.getFieldValue('creditDate') !== undefined ? form.getFieldValue('creditDate').format('YYYY-MM-DD') : undefined,
          imgURL: imgURLImage,
          fileURL,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = e => {
    dispatch({
      type: 'mediaPraiseStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改媒体报道">
                {getFieldDecorator('id', { initialValue: mediaPraise.id })(<Input type="hidden" />)}
                {getFieldDecorator('creditLogNo', { initialValue: mediaPraise.creditLogNo })(<Input type="hidden" />)}
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
                    initialValue: mediaPraise.qualificationNo,
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
                    initialValue: mediaPraise.userName,
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
                    initialValue: mediaPraise.carNo,
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
                    initialValue: mediaPraise.plateNumber,
                  })(
                    <Input disabled />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        表彰的报道名称&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('praiseFileName', {
                    rules: [{ required: true, whitespace: true, message: '请输入表彰的报道名称!' }],
                    initialValue: mediaPraise.praiseFileName,
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        媒体协会&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('mediaOrg', {
                    rules: [{ required: true, whitespace: true, message: '请输入媒体协会!' }],
                    initialValue: mediaPraise.mediaOrg,
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
                    initialValue: moment(mediaPraise.creditDate),
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
                    initialValue: mediaPraise.praiseGrade,
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
                  {getFieldDecorator('newsUrl', {
                    initialValue: mediaPraise.newsUrl,
                  })(
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
                  <ZButton permission="driver:media:update">
                    <Button key="registerButton" type="primary" htmlType="submit" size="large">保存</Button>
                  </ZButton>
                  <Button key="returnLoginButton" htmlType="button" size="large" style={{ marginLeft: '30px' }} onClick={toPage}>返回</Button>
                </FormItem>
              </Card>
            </Form>
          </Col>
          <Col span={10} />
        </Row>
      </TweenOneGroup>
    </div>
  )
}

function mapStateToProps({ mediaPraiseStore }) {
  return {
    mediaPraise: mediaPraiseStore.mediaPraise,
    previewVisible: mediaPraiseStore.previewVisible,
    imgURLList: mediaPraiseStore.imgURLList,
    previewImage: mediaPraiseStore.previewImage,
    imgURLImage: mediaPraiseStore.imgURLImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
