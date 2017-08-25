/*
 * @Author: zengyufei 
 * @Date: 2017-08-25 14:57:03 
 * @Last Modified by: zengyufei
 * @Last Modified time: 2017-08-25 15:44:15
 */
import TweenOne from 'rc-tween-one'
import { connect } from 'dva'
import { Form, Input, Icon, Row, Col, Button, Card, Upload, Modal, DatePicker } from 'antd'
import moment from 'moment'

const TweenOneGroup = TweenOne.TweenOneGroup
const FormItem = Form.Item

const { tokenSessionKey } = constant

let Update = options => {
  const { dispatch, form, commonPraise, imgURLList, imgURLImage, previewVisible, previewImage } = options
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
      type: 'commonPraiseStore/imgChange',
      imgURLList: fileList,
    })
  }
  // 预览图片
  const lookPreview = file => {
    dispatch({
      type: 'commonPraiseStore/lookPreview',
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }
  // 关闭预览图片
  const unlookPreview = () => {
    dispatch({
      type: 'commonPraiseStore/unlookPreview',
    })
  }

  /**
   * 上传文件
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
          type: 'commonPraiseStore/update',
          ...values,
          callTime: form.getFieldValue('callTime') !== undefined ? form.getFieldValue('callTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          creditTime: form.getFieldValue('creditTime') !== undefined ? form.getFieldValue('creditTime').format('YYYY-MM-DD HH:mm:ss') : undefined,
          imgURL: imgURLImage,
          fileURL,
        })
      }
    })
  }

  /* 返回分页 */
  const toPage = () => {
    dispatch({
      type: 'commonPraiseStore/toPage',
    })
  }

  return (
    <div>
      <TweenOneGroup>
        <Row key="0">
          <Col span={14}>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginTop: '10px' }}>
              <Card title="修改普通表扬">
                {getFieldDecorator('id', { initialValue: commonPraise.id })(<Input type="hidden" />)}
                {getFieldDecorator('creditLogNo', { initialValue: commonPraise.creditLogNo })(<Input type="hidden" />)}
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
                    initialValue: commonPraise.qualificationNo,
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
                    initialValue: commonPraise.userName,
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
                    initialValue: commonPraise.carNo,
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
                    initialValue: commonPraise.plateNumber,
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
                    initialValue: commonPraise.callName,
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
                    rules: [{ required: true, whitespace: true, message: '请输入来电者联系方式!' }],
                    initialValue: commonPraise.callMobile,
                  })(
                    <Input />
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
                  {getFieldDecorator('callTime', {
                    rules: [{ required: true, message: '请输入来电时间!' }],
                    initialValue: moment(commonPraise.callTime),
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事情发生时间&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditTime', {
                    rules: [{ required: true, message: '请输入事情发生时间!' }],
                    initialValue: moment(commonPraise.creditTime),
                  })(
                    <DatePicker style={{ width: 200 }} format="YYYY-MM-DD HH:mm:ss" showTime />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                        事情发生经过&nbsp;
                    </span>
                  )}
                  hasFeedback
                >
                  {getFieldDecorator('creditDesc', {
                    rules: [{ required: true, whitespace: true, message: '请输入事情发生经过!' }],
                    initialValue: commonPraise.creditDesc,
                  })(
                    <Input type="textarea" rows={4} />
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
                  <ZButton permission="driver:common:update">
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

function mapStateToProps({ commonPraiseStore }) {
  return {
    commonPraise: commonPraiseStore.commonPraise,
    previewVisible: commonPraiseStore.previewVisible,
    imgURLList: commonPraiseStore.imgURLList,
    previewImage: commonPraiseStore.previewImage,
    imgURLImage: commonPraiseStore.imgURLImage,
  }
}

export default Form.create()(connect(mapStateToProps)(Update))
